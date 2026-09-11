import {
  AmbientLight, BufferGeometry, DirectionalLight, Float32BufferAttribute,
  Group, Mesh, MeshBasicMaterial, MeshStandardMaterial, PerspectiveCamera,
  Points, PointsMaterial, Scene, SphereGeometry, TorusGeometry, TorusKnotGeometry,
  WebGLRenderer,
} from "three";

/** No textures, postprocessing, shadows, or React updates in the render loop. */
export function createOrbitScene(host: HTMLDivElement): () => void {
  const renderer = new WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.className = "orbit-canvas";
  const scene = new Scene();
  const camera = new PerspectiveCamera(36, 1, .1, 30);
  camera.position.z = 6.8;
  const sculpture = new Group();
  scene.add(sculpture);
  const knotGeometry = new TorusKnotGeometry(1.02, .29, 160, 20, 2, 3);
  const knotMaterial = new MeshStandardMaterial({ color: 0xc7f79a, metalness: .58, roughness: .28 });
  const knot = new Mesh(knotGeometry, knotMaterial);
  sculpture.add(knot);
  const wireMaterial = new MeshBasicMaterial({ color: 0xe1ffc2, wireframe: true, transparent: true, opacity: .12 });
  const wire = new Mesh(knotGeometry, wireMaterial);
  wire.scale.setScalar(1.004);
  sculpture.add(wire);
  const orbitGeometry = new TorusGeometry(1.87, .011, 6, 100);
  const orbitMaterial = new MeshBasicMaterial({ color: 0xb49aff, transparent: true, opacity: .7 });
  const orbit = new Mesh(orbitGeometry, orbitMaterial);
  orbit.rotation.set(1.14, -.25, -.4);
  sculpture.add(orbit);
  const satelliteGeometry = new SphereGeometry(.085, 12, 8);
  const satelliteMaterial = new MeshStandardMaterial({ color: 0xbc9bff, metalness: .3, roughness: .35 });
  const satellite = new Mesh(satelliteGeometry, satelliteMaterial);
  orbit.add(satellite);
  const starsGeometry = new BufferGeometry();
  const positions = Array.from({ length: 66 }, (_, i) => {
    const angle = i * 2.39996;
    return [Math.cos(angle) * (2.15 + (i % 5) * .11), Math.sin(angle) * (2 + (i % 3) * .17), Math.sin(i) * .7];
  }).flat();
  starsGeometry.setAttribute("position", new Float32BufferAttribute(positions, 3));
  const starsMaterial = new PointsMaterial({ color: 0xbeb8d3, size: .018, transparent: true, opacity: .65 });
  scene.add(new Points(starsGeometry, starsMaterial));
  scene.add(new AmbientLight(0xd8e5cf, 2.4));
  const keyLight = new DirectionalLight(0xebffd6, 5);
  keyLight.position.set(2, 3, 4);
  scene.add(keyLight);
  const rimLight = new DirectionalLight(0xa580ff, 4);
  rimLight.position.set(-3, -1, 1);
  scene.add(rimLight);

  let frame = 0;
  let last = 0;
  let elapsed = 0;
  let visible = false;
  let lost = false;
  let disposed = false;
  let pointerX = 0;
  let pointerY = 0;
  let width = 1;
  let height = 1;
  let bounds = host.getBoundingClientRect();

  function draw(time: number) {
    frame = 0;
    if (disposed || lost || !visible || document.hidden) return;
    // Cap actual draws at 30 fps; resume without advancing the hidden interval.
    if (time - last >= 1000 / 30) {
      const delta = Math.min((time - last) / 1000, .06);
      last = time;
      elapsed += delta;
      sculpture.rotation.y += (pointerX * .28 - sculpture.rotation.y) * .07;
      sculpture.rotation.x += (pointerY * .2 - sculpture.rotation.x) * .07;
      sculpture.position.y = Math.sin(elapsed * .8) * .09;
      knot.rotation.set(elapsed * .12, elapsed * .21, -.25 + elapsed * .07);
      wire.rotation.copy(knot.rotation);
      satellite.position.set(Math.cos(elapsed * .6) * 1.87, Math.sin(elapsed * .6) * 1.87, 0);
      renderer.render(scene, camera);
      if (host.dataset.scene !== "ready") host.dataset.scene = "ready";
    }
    frame = requestAnimationFrame(draw);
  }
  function sync() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    host.dataset.rendering = String(visible && !document.hidden && !lost);
    if (visible && !document.hidden && !lost && !disposed) { last = performance.now() - 34; frame = requestAnimationFrame(draw); }
  }
  function resize() {
    bounds = host.getBoundingClientRect();
    width = Math.max(1, bounds.width);
    height = Math.max(1, bounds.height);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }
  function move(event: PointerEvent) {
    pointerX = (event.clientX - bounds.left) / width * 2 - 1;
    pointerY = (event.clientY - bounds.top) / height * 2 - 1;
  }
  function enter() { bounds = host.getBoundingClientRect(); }
  function leave() { pointerX = 0; pointerY = 0; }
  function contextLost(event: Event) {
    event.preventDefault();
    lost = true;
    delete host.dataset.scene;
    sync();
  }
  function contextRestored() { lost = false; resize(); sync(); }
  const observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; sync(); });
  const resizeObserver = new ResizeObserver(resize);
  host.appendChild(canvas);
  resize();
  observer.observe(host);
  resizeObserver.observe(host);
  host.addEventListener("pointerenter", enter);
  host.addEventListener("pointermove", move, { passive: true });
  host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", sync);
  canvas.addEventListener("webglcontextlost", contextLost);
  canvas.addEventListener("webglcontextrestored", contextRestored);

  return () => {
    disposed = true;
    if (frame) cancelAnimationFrame(frame);
    observer.disconnect();
    resizeObserver.disconnect();
    host.removeEventListener("pointerenter", enter);
    host.removeEventListener("pointermove", move);
    host.removeEventListener("pointerleave", leave);
    document.removeEventListener("visibilitychange", sync);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("webglcontextrestored", contextRestored);
    [knotGeometry, orbitGeometry, satelliteGeometry, starsGeometry].forEach(geometry => geometry.dispose());
    [knotMaterial, wireMaterial, orbitMaterial, satelliteMaterial, starsMaterial].forEach(material => material.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
    canvas.remove();
    delete host.dataset.scene;
    delete host.dataset.rendering;
  };
}

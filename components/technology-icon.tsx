import { technologyBrandPaths } from "@/data/technology-icons";

const utilityGlyphs = {
  react: <use href="#i-react" />,
  next: <use href="#i-next" />,
  aws: <use href="#i-aws" />,
  auth: <use href="#i-shield" />,
  ai: <use href="#i-sparkle" />,
  globe: <use href="#i-globe" />,
  flow: <><rect x="3" y="3" width="6" height="6" rx="1.5" /><rect x="15" y="15" width="6" height="6" rx="1.5" /><path d="M6 9v9h9M9 6h9v9" /></>,
  api: <><path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 4l-4 16" /></>,
  database: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
  server: <><rect x="3" y="3" width="18" height="7" rx="2" /><rect x="3" y="14" width="18" height="7" rx="2" /><path d="M7 6.5h.01M7 17.5h.01M12 6.5h5M12 17.5h5" /></>,
  bucket: <><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="m4 5 2 14c0 4 12 4 12 0l2-14M9 12h6" /></>,
  package: <><path d="m12 2 9 5v10l-9 5-9-5V7l9-5Zm0 10 9-5M12 12 3 7m9 5v10M7.5 4.5l9 5v5" /></>,
  key: <><circle cx="8" cy="8" r="5" /><path d="m12 12 9 9m-5-5 3-3m0 6 3-3" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3" /></>,
  chain: <><path d="m9 8 3-3a5 5 0 0 1 7 7l-3 3M8 9l-3 3a5 5 0 0 0 7 7l3-3m-6-1 6-6" /></>,
  fox: <><path d="m3 3 7 5h4l7-5-2 12-7 6-7-6L3 3Zm2 12 4-3 3 6 3-6 4 3M7 8l2 4m8-4-2 4m-5 3h4" /></>,
  branch: <><circle cx="6" cy="5" r="2" /><circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" /><path d="M6 7v10m12-10v2c0 5-12 3-12 8" /></>,
};

export type TechnologyIconName = keyof typeof technologyBrandPaths | keyof typeof utilityGlyphs;

function isBrandIcon(name: TechnologyIconName): name is keyof typeof technologyBrandPaths {
  return Object.hasOwn(technologyBrandPaths, name);
}

export function TechnologyIcon({ name }: { name: TechnologyIconName }) {
  return (
    <svg className="skill-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {isBrandIcon(name)
        ? <path d={technologyBrandPaths[name]} fill="currentColor" stroke="none" />
        : utilityGlyphs[name]}
    </svg>
  );
}

const skillGroups = [
  {
    title: "Frontend & interfaces",
    primary: ["React", "Next.js", "TypeScript", "JavaScript"],
    supporting: ["HTML5", "Tailwind CSS", "Material UI", "React Flow", "React Query", "Redux Toolkit"],
  },
  {
    title: "Backend, data & deployment",
    primary: ["Node.js", "NestJS", "Express.js", "AWS", "Docker"],
    supporting: ["REST APIs", "GraphQL", "SQL", "MongoDB", "EC2", "S3", "CloudFront", "ECR", "IAM"],
  },
  {
    title: "Mobile & integrations",
    primary: ["React Native", "NextAuth", "OpenAI"],
    supporting: ["Secure Storage", "Ethers", "Viem", "Web3Modal", "MetaMask", "Git", "GitFlow", "Jira"],
  },
];

export function TechStack() {
  return (
    <section className="stack-section" aria-labelledby="stack-title">
      <div className="wrap">
        <div className="stack-intro"><h2 id="stack-title">Tools behind the work.</h2><p>Across websites, full-stack applications, and mobile experiences.</p></div>
        <div className="stack-groups">
          {skillGroups.map(group => (
            <div className="stack-group" key={group.title}>
              <h3 className="mono">{group.title}</h3>
              <div className="skill-chips">
                {group.primary.map(skill => <span className="skill-chip primary" key={skill}>{skill}</span>)}
                {group.supporting.map(skill => <span className="skill-chip" key={skill}>{skill}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

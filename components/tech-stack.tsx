import { TechnologyIcon, type TechnologyIconName } from "./technology-icon";

type Skill = { label: string; icon: TechnologyIconName };
type SkillGroup = { title: string; primary: Skill[]; supporting: Skill[] };

const skillGroups: SkillGroup[] = [
  {
    title: "Frontend & interfaces",
    primary: [
      { label: "React", icon: "react" }, { label: "Next.js", icon: "next" },
      { label: "TypeScript", icon: "typescript" }, { label: "JavaScript", icon: "javascript" },
    ],
    supporting: [
      { label: "HTML5", icon: "html5" }, { label: "Tailwind CSS", icon: "tailwindcss" },
      { label: "Material UI", icon: "mui" }, { label: "React Flow", icon: "flow" },
      { label: "React Query", icon: "reactquery" }, { label: "Redux Toolkit", icon: "redux" },
    ],
  },
  {
    title: "Backend, data & deployment",
    primary: [
      { label: "Node.js", icon: "nodedotjs" }, { label: "NestJS", icon: "nestjs" },
      { label: "Express.js", icon: "express" }, { label: "AWS", icon: "aws" },
      { label: "Docker", icon: "docker" },
    ],
    supporting: [
      { label: "REST APIs", icon: "api" }, { label: "GraphQL", icon: "graphql" },
      { label: "SQL", icon: "database" }, { label: "MongoDB", icon: "mongodb" },
      { label: "EC2", icon: "server" }, { label: "S3", icon: "bucket" },
      { label: "CloudFront", icon: "globe" }, { label: "ECR", icon: "package" },
      { label: "IAM", icon: "key" },
    ],
  },
  {
    title: "Mobile & integrations",
    primary: [
      { label: "React Native", icon: "react" }, { label: "NextAuth", icon: "auth" },
      { label: "OpenAI", icon: "ai" },
    ],
    supporting: [
      { label: "Secure Storage", icon: "lock" }, { label: "Ethers", icon: "ethers" },
      { label: "Viem", icon: "chain" }, { label: "Web3Modal", icon: "walletconnect" },
      { label: "MetaMask", icon: "fox" }, { label: "Git", icon: "git" },
      { label: "GitFlow", icon: "branch" }, { label: "Jira", icon: "jira" },
    ],
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
                {group.primary.map(skill => <span className="skill-chip primary" key={skill.label}><TechnologyIcon name={skill.icon} />{skill.label}</span>)}
                {group.supporting.map(skill => <span className="skill-chip" key={skill.label}><TechnologyIcon name={skill.icon} />{skill.label}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

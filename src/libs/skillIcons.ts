import type { IconType } from 'react-icons';
import {
  DiAngularSimple,
  DiBootstrap,
  DiFirebase,
  DiGit,
  DiJavascript1,
  DiMongodb,
  DiMysql,
  DiNodejsSmall,
  DiReact,
} from 'react-icons/di';
import {
  SiJest,
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiRedux,
  SiStyledcomponents,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiWebpack,
} from 'react-icons/si';
import { TbBrandAzure } from 'react-icons/tb';
import { VscAzureDevops } from 'react-icons/vsc';

/**
 * Maps skill name strings to react-icons IconType components.
 * Skills absent from this map render without an icon (fallback dot in Pill).
 * Keys must match the exact strings in the mainSkills array in Skills/index.tsx.
 */
export const skillIcons: Record<string, IconType> = {
  JavaScript: DiJavascript1,
  TypeScript: SiTypescript,
  React: DiReact,
  'Next.js': SiNextdotjs,
  AngularJS: DiAngularSimple,
  'Redux (Saga/Thunk/Toolkit)': SiRedux,
  'Styled-components': SiStyledcomponents,
  'Tailwind CSS': SiTailwindcss,
  // Material-UI has no icon in react-icons — falls back to dot in Pill
  Bootstrap: DiBootstrap,
  'Node.js': DiNodejsSmall,
  NestJS: SiNestjs,
  Prisma: SiPrisma,
  MongoDB: DiMongodb,
  Firebase: DiFirebase,
  MySQL: DiMysql,
  Jest: SiJest,
  Vite: SiVite,
  Webpack: SiWebpack,
  Git: DiGit,
  Azure: TbBrandAzure,
  'Azure DevOps': VscAzureDevops,
};

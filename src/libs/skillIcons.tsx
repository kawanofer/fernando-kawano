import {
  DiAngularSimple,
  DiBootstrap,
  DiCss3,
  DiFirebase,
  DiGit,
  DiHtml5,
  DiJavascript1,
  DiMongodb,
  DiMysql,
  DiNodejsSmall,
  DiReact,
  DiSass,
} from 'react-icons/di';
import {
  SiFigma,
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

import type { IconType } from 'react-icons';

export const skillIcons: Record<string, IconType> = {
  JavaScript: DiJavascript1,
  TypeScript: SiTypescript,
  React: DiReact,
  'Next.js': SiNextdotjs,
  AngularJS: DiAngularSimple,
  Redux: SiRedux,
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
  HTML5: DiHtml5,
  CSS3: DiCss3,
  Figma: SiFigma,
  SASS: DiSass,
};

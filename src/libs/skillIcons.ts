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
  SiAmazonwebservices,
  SiCircleci,
  SiJenkins,
  SiJest,
  SiNestjs,
  SiNextdotjs,
  SiPrisma,
  SiRedux,
  SiStyledcomponents,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
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
  Jenkins: SiJenkins,
  CircleCI: SiCircleci,
  AWS: SiAmazonwebservices,
  Vercel: SiVercel,
  Supabase: SiSupabase,
};

/** Brand colors for skill icons. Keys must match skillIcons keys. */
export const skillColors: Record<string, string> = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  React: '#61DAFB',
  'Next.js': '#ffffff',
  AngularJS: '#DD0031',
  'Redux (Saga/Thunk/Toolkit)': '#764ABC',
  'Styled-components': '#DB7093',
  'Tailwind CSS': '#06B6D4',
  Bootstrap: '#7952B3',
  'Node.js': '#339933',
  NestJS: '#E0234E',
  Prisma: '#5A67D8',
  MongoDB: '#47A248',
  Firebase: '#FFCA28',
  MySQL: '#00758F',
  Jest: '#C21325',
  Vite: '#646CFF',
  Webpack: '#8DD6F9',
  Git: '#F05032',
  Azure: '#0078D4',
  'Azure DevOps': '#0078D4',
  Jenkins: '#D24939',
  CircleCI: '#00CC65',
  AWS: '#FF9900',
  Vercel: '#ffffff',
  Supabase: '#3ECF8E',
};

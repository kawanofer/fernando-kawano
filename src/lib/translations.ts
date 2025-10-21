'use client';

import { useEffect, useState } from 'react';

export type Language = 'en' | 'pt';

export const translations = {
  en: {
    // Navigation
    'nav.about': 'About me',
    'nav.education': 'Education',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',

    // Hero Section
    'hero.greeting': 'Hi! I am',
    'hero.title': 'Frontend engineer',
    'hero.location': 'Curitiba - Brazil',
    'hero.downloadCV': 'Download CV',

    // About Me Section
    'about.title': 'About me',
    'about.paragraph1':
      "I'm a Front-end Software Engineer with extensive experience crafting immersive digital experiences. I have a proven track record of impactful projects across a variety of industries. My expertise lies in using cutting-edge technology to create complex and user-friendly solutions.",
    'about.paragraph2':
      'My journey started as a Frontend Developer at Positivo Informática, where I developed my skills in HTML5, jQuery and Bootstrap. Throughout my path at VEXPRO Business IT, I demonstrated my strengths by seamlessly transitioning between SharePoint and React environments, creating solutions tailored to a variety of customer needs.',
    'about.paragraph3':
      'At Kenect, I played a key role in transforming backend team integration through flexible frontend solutions. Using technologies like React, Redux-Saga, and styled-components, I created a unified platform that simplified operations and increased productivity.',
    'about.paragraph4':
      'With a strong skill set including AngularJS, React.js, TypeScript, and more, I am poised to drive innovation and improve user experience in any front-end application.',
    'about.languages.english': 'English',
    'about.languages.portuguese': 'Portuguese (Brazil)',
    'about.languages.level.native': 'Native',
    'about.languages.level.advanced': 'B2/C1',

    // Education Section
    'education.title': 'Education',

    'education.degree1': 'Graduated, Mobile Applications and Cloud Computing',
    'education.institution1': 'Positivo University',
    'education.period1': '2013 - 2015',

    'education.degree2': "Bachelor's degrees, Information System4",
    'education.institution2': 'Positivo University',
    'education.period2': '2008 - 2011',

    'education.certification': 'Certifications',

    // Skills Section
    'skills.title': 'Skills',

    // Contact Section
    'contact.title': 'Contact',
    'contact.getInTouch': 'Get in Touch',
    'contact.description':
      'I&apos;m always interested in new opportunities, collaborations, and conversations about technology, web development, and innovative projects.',
    'contact.findMe': 'Find Me Elsewhere',
    'contact.connectWithMe': 'Connect with me on these platforms',
    'contact.gitHubDescription': 'View my code repositories and projects',
    'contact.linkedInDescription': 'Professional network and career updates.',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre mim',
    'nav.education': 'Educação',
    'nav.experiences': 'Experiências',
    'nav.skills': 'Habilidades',
    'nav.contact': 'Contato',

    // Hero Section
    'hero.greeting': 'Olá! Eu sou o',
    'hero.title': 'Frontend engineer',
    'hero.location': 'Curitiba - Brasil',
    'hero.downloadCV': 'Baixar CV',

    // About Me Section
    'about.title': 'Sobre mim',
    'about.paragraph1':
      'Sou um Engenheiro de Software Front-end com ampla experiência na criação de experiências digitais imersivas. Tenho um histórico comprovado de projetos impactantes em uma variedade de indústrias. Minha expertise está em usar tecnologia de ponta para criar soluções complexas e fáceis de usar.',
    'about.paragraph2':
      'Minha jornada começou como Desenvolvedor Frontend na Positivo Informática, onde desenvolvi minhas habilidades em HTML5, jQuery e Bootstrap. Ao longo do meu caminho na VEXPRO Business IT, demonstrei minhas forças fazendo a transição perfeita entre ambientes SharePoint e React, criando soluções adaptadas a uma variedade de necessidades do cliente.',
    'about.paragraph3':
      'Na Kenect, desempenhei um papel fundamental na transformação da integração de equipes de backend através de soluções frontend flexíveis. Usando tecnologias como React, Redux-Saga e styled-components, criei uma plataforma unificada que simplificou operações e aumentou a produtividade.',
    'about.paragraph4':
      'Com um conjunto sólido de habilidades incluindo AngularJS, React.js, TypeScript e mais, estou preparado para impulsionar a inovação e melhorar a experiência do usuário em qualquer aplicação front-end.',
    'about.languages.english': 'Inglês',
    'about.languages.portuguese': 'Português (Brasil)',
    'about.languages.level.native': 'Nativo',
    'about.languages.level.advanced': 'B2/C1',

    // Education Section
    'education.title': 'Educação',

    'education.degree1': 'Graduado, Aplicações Móveis e Computação em Nuvem',
    'education.institution1': 'Universidade Positivo',
    'education.period1': '2013 - 2015',

    'education.degree2': 'Bacharel em Sistemas de Informação',
    'education.institution2': 'Universidade Positivo',
    'education.period2': '2008 - 2011',

    'education.certification': 'Certificações',

    // Skills Section
    'skills.title': 'Habilidades',

    // Contact Section
    'contact.title': 'Contato',
    'contact.getInTouch': 'Entre em Contato',
    'contact.description':
      'Estou sempre interessado em novas oportunidades, colaborações e conversas sobre tecnologia, desenvolvimento web e projetos inovadores.',
    'contact.findMe': 'Encontre-me em Outros Lugares',
    'contact.connectWithMe': 'Conecte-se comigo nessas plataformas',
    'contact.gitHubDescription': 'Veja meus repositórios de código e projetos',
    'contact.linkedInDescription':
      'Rede profissional e atualizações de carreira.',
  },
};

// Global state management for language
let globalLanguage: Language = 'en';
let globalIsClient = false;
const listeners: Array<() => void> = [];

// Initialize language from localStorage when on client
const initializeLanguage = () => {
  if (typeof window !== 'undefined' && !globalIsClient) {
    globalIsClient = true;
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'en' || saved === 'pt')) {
      globalLanguage = saved;
    }
    // Notify all components about the initial language
    listeners.forEach(listener => listener());
  }
};

// Static translation function for SSR-safe usage
export const t = (key: string, language: Language = 'en'): string => {
  const translation = translations[language];
  return (translation as any)[key] || key;
};

// Global language change function
export const changeGlobalLanguage = (newLanguage: Language) => {
  globalLanguage = newLanguage;
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', newLanguage);
  }
  // Notify all subscribed components
  listeners.forEach(listener => listener());
};

// Client-side translation hook with shared state management
export const useTranslation = () => {
  const [language, setLanguage] = useState<Language>('en');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Initialize global state if not already done
    initializeLanguage();

    setIsClient(true);
    setLanguage(globalLanguage);

    // Subscribe to language changes
    const updateLanguage = () => {
      setLanguage(globalLanguage);
    };

    listeners.push(updateLanguage);

    // Cleanup subscription on unmount
    return () => {
      const index = listeners.indexOf(updateLanguage);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  const changeLanguage = (newLanguage: Language) => {
    changeGlobalLanguage(newLanguage);
  };

  const translate = (key: string): string => {
    // Always use 'en' during SSR and initial render to prevent hydration mismatches
    // Only switch to user preference after client hydration is complete
    if (!isClient) {
      return t(key, 'en');
    }
    return t(key, language);
  };

  return {
    language: isClient ? language : 'en',
    changeLanguage,
    t: translate,
  };
};

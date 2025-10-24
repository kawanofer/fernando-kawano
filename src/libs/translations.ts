'use client';

import { useEffect, useState } from 'react';

export type Language = 'en' | 'pt';

export const translations = {
  en: {
    // Navigation
    'nav.about': 'About me',
    'nav.education': 'Education',
    'nav.projects': 'Projects',
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
    'contact.findMe': 'Find Me Elsewhere',
    'contact.connectWithMe': 'Connect with me on these platforms',
    'contact.gitHubDescription': 'View my code repositories and projects',
    'contact.linkedInDescription': 'Professional network and career updates.',
    'contact.emailDescription': 'Send an email directly to me.',

    // Contact Form
    'contact.form.name': 'Name',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.sendMeAMessage': 'Send me a message',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.success': 'Your message has been sent successfully!',
    'contact.form.error':
      'An error occurred while sending your message. Please try again later.',

    'contact.form.placeholder.name': 'Your full name',
    'contact.form.placeholder.subject': 'What is this about?',
    'contact.form.placeholder.message': 'Your message here...',

    'contact.form.name.help':
      'Enter your full name. This field is required and must be less than 100 characters.',
    'contact.form.email.help':
      'Enter a valid email address where you can be reached. This field is required.',
    'contact.form.subject.help':
      'Enter a brief subject for your message. This field is optional.',
    'contact.form.message.help':
      'Press Enter or Space to submit the contact form after filling in all required fields.',

    // Projects Section
    'projects.title': 'Projects',
    'projects.subtitle':
      "Some projects I've worked on, showcasing different technologies and approaches to problem-solving.",
    'projects.description': 'Description:',
    'projects.technologies': 'Technologies:',
    'projects.code': 'Code',
    'projects.liveDemo': 'Live Demo',
    'projects.more.title': 'Want to see more?',
    'projects.more.description':
      'Check out my GitHub profile for more projects and contributions.',
    'projects.visitGithub': 'Visit GitHub',

    // Project Descriptions
    'projects.fluig.description':
      'Enterprise productivity & collaboration platform developed by TOTVS, unifying systems, people and processes. I contributed to developing custom components, improving user interface interactions, and implementing responsive design patterns for better user experience.',
    'projects.germini.description':
      'Customer loyalty platform helping companies build and manage retention programs. Developed with modern React patterns, Redux for state management, and Material-UI for consistent design. Features include campaign management, customer analytics, and reward tracking.',
    'projects.artExplorer.description':
      'A comprehensive web application that allows users to explore and discover artworks from the renowned Metropolitan Museum of Art in New York. Features modern UI, search functionality, favorites management, and includes both frontend and backend implementation with caching and queue systems.',
  },
  pt: {
    // Navigation
    'nav.about': 'Sobre mim',
    'nav.education': 'Educação',
    'nav.experiences': 'Experiências',
    'nav.projects': 'Projetos',
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
    'contact.emailDescription': 'Envie um e-mail diretamente para mim',
    'contact.linkedInDescription':
      'Rede profissional e atualizações de carreira.',

    // Contact Form
    'contact.form.name': 'Nome',
    'contact.form.email': 'Email',
    'contact.form.subject': 'Assunto',
    'contact.form.message': 'Mensagem',
    'contact.form.sendMeAMessage': 'Envie uma mensagem',
    'contact.form.send': 'Enviar Mensagem',
    'contact.form.sending': 'Enviando...',
    'contact.form.success': 'Sua mensagem foi enviada com sucesso!',
    'contact.form.error':
      'Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.',

    'contact.form.placeholder.name': 'Seu nome completo',
    'contact.form.placeholder.subject': 'Sobre o que é isso?',
    'contact.form.placeholder.message': 'Sua mensagem aqui...',

    'contact.form.name.help':
      'Digite seu nome completo. Este campo é obrigatório e deve ter menos de 100 caracteres.',
    'contact.form.email.help':
      'Digite um endereço de e-mail válido onde você possa ser contatado. Este campo é obrigatório.',
    'contact.form.subject.help':
      'Digite um assunto breve para sua mensagem. Este campo é opcional.',
    'contact.form.message.help':
      'Pressione Enter ou Espaço para enviar o formulário de contato após preencher todos os campos obrigatórios.',

    // Projects Section
    'projects.title': 'Projetos',
    'projects.subtitle':
      'Alguns projetos nos quais trabalhei, demonstrando diferentes tecnologias e abordagens para resolução de problemas.',
    'projects.description': 'Descrição:',
    'projects.technologies': 'Tecnologias:',
    'projects.code': 'Código',
    'projects.liveDemo': 'Demo ao Vivo',
    'projects.more.title': 'Quer ver mais?',
    'projects.more.description':
      'Confira meu perfil no GitHub para mais projetos e contribuições.',
    'projects.visitGithub': 'Visitar GitHub',

    // Project Descriptions
    'projects.fluig.description':
      'Plataforma de produtividade e colaboração empresarial desenvolvida pela TOTVS, unificando sistemas, pessoas e processos. Contribuí para o desenvolvimento de componentes personalizados, aprimorando as interações da interface do usuário e implementando padrões de design responsivo para uma melhor experiência do usuário.',
    'projects.germini.description':
      'Plataforma de fidelidade do cliente que ajuda as empresas a construir e gerenciar programas de retenção. Desenvolvido com padrões modernos de React, Redux para gerenciamento de estado e Material-UI para design consistente. Os recursos incluem gerenciamento de campanhas, análise de clientes e rastreamento de recompensas.',
    'projects.artExplorer.description':
      'Uma aplicação web abrangente que permite aos usuários explorar e descobrir obras de arte do renomado Metropolitan Museum of Art em Nova York. Possui uma interface moderna, funcionalidade de busca, gerenciamento de favoritos e inclui implementação tanto no frontend quanto no backend com sistemas de cache e fila.',
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

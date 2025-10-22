import React from 'react';

import { Title } from '@/components/UI';

export default function Projects() {
  const projects = [
    {
      title: 'Fluig',
      description:
        'Fluig is a productivity & collaboration platform developed by TOTVS(a major Brazilian enterprise‐software vendor) that aims to unify systems, people and processes in one place.',
      image: '',
      website: 'https://en.fluig.com/',
    },
    {
      title: 'Germini Loyalty Platform',
      description:
        'GERMINI is a platform aimed at helping companies build and manage customer - loyalty programs(“fidelização”) — in other words, helping businesses retain customers, increase purchase frequency, and raise average spend.',
      image: '',
      website: 'https://germini.com.br/',
    },
  ];

  const assessments = [
    {
      title: 'Test Assignment for Frontend Developer Position at Germini',
      description:
        'Art Explorer React is a web application that allows users to explore and discover artworks from the renowned Metropolitan Museum of Art in New York.' +
        '\nWith a modern and intuitive interface, users can search by artists, departments, view artwork details, and manage their favorite collections.' +
        '\nThe backend was not required, but I implemented the backend to implement the cache and queue.',
      image: '',
      website: 'https://germini.com.br/test-assignment',
      githubProjectFrontend: 'https://github.com/kawanofer/art-explorer-react',
      githubProjectBackend: 'https://github.com/kawanofer/met-museum-backend',

      liveDemo: 'https://art-explorer-react-nu.vercel.app/',
      backendDeploy: 'https://met-museum-backend.onrender.com',
    },
  ];

  return (
    <>
      <Title title={'Projetos'} />
      {projects.map((project, index) => (
        <div key={index}>
          <h2>{project.title}</h2>
          <p>{project.description}</p>
          <a href={project.website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </div>
      ))}

      <Title title={'Avaliações'} />
      {assessments.map((assessment, index) => (
        <div key={index}>
          <h2>{assessment.title}</h2>
          <p>{assessment.description}</p>
          <a
            href={assessment.website}
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Website
          </a>
          <br />
          <a
            href={assessment.githubProjectFrontend}
            target="_blank"
            rel="noopener noreferrer"
          >
            Frontend GitHub
          </a>
          <br />
          <a
            href={assessment.githubProjectBackend}
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend GitHub
          </a>
          <br />
          <a
            href={assessment.liveDemo}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo
          </a>
          <br />
          <a
            href={assessment.backendDeploy}
            target="_blank"
            rel="noopener noreferrer"
          >
            Backend Deploy
          </a>
        </div>
      ))}
    </>
  );
}

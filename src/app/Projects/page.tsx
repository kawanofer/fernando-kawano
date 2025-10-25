'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { Code, GitHub, Language, OpenInNew } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Tooltip,
} from '@mui/material';

import Layout from '@/components/Layout';
import { StructuredData } from '@/components/SEO';
import { Title } from '@/components/UI';
import { Section } from '@/components/UI/Section';

import { useTranslation } from '@/libs/translations';

// Dynamic import for Carousel component (heavy with image processing)
const Carousel = dynamic(() => import('@/components/Layout/Carousel'), {
  loading: () => (
    <div className="flex h-64 items-center justify-center rounded-lg bg-gray-100">
      <div className="text-center">
        <div className="border-primary mx-auto h-8 w-8 animate-spin rounded-full border-b-2"></div>
        <p className="mt-2 text-sm text-gray-600">Loading images...</p>
      </div>
    </div>
  ),
  ssr: false, // Disable SSR for image carousel for better performance
});

interface ProjectProps {
  category: 'Front-end' | 'Fullstack';
  description: string;
  githubProjectBackend?: string;
  githubProjectFrontend?: string;
  githubUrl?: string;
  images?: string[];
  liveUrl?: string;
  technologies: string[];
  title: string;
  website?: string;
}

export default function ProjectsPage() {
  const { t } = useTranslation();

  const projects: ProjectProps[] = [
    {
      title: 'TOTVS Fluig',
      description: t('projects.fluig.description'),
      technologies: [
        'JavaScript',
        'ES6+',
        'Custom Elements',
        'MustacheJs',
        'KendoUI',
        'CSS3',
        'HTML5',
        'SASS',
      ],
      images: [
        '/projects/fluig1.avif',
        '/projects/fluig2.avif',
        '/projects/fluig3.avif',
      ],
      website: 'https://en.fluig.com/',
      category: 'Front-end',
    },
    {
      title: 'Germini Loyalty Platform',
      description: t('projects.germini.description'),
      technologies: [
        'React',
        'Material-UI',
        'Redux-saga',
        'Context API',
        'REST API',
        'Chart.js',
      ],
      images: [],
      website: 'https://germini.com.br/',
      category: 'Front-end',
    },
    {
      title: 'Art Explorer React',
      description: t('projects.artExplorer.description'),
      images: [
        '/projects/met_museum1.avif',
        '/projects/met_museum2.avif',
        '/projects/met_museum3.avif',
      ],
      technologies: [
        'React',
        'TypeScript',
        'Next.js',
        'Jest',
        'RTL',
        'Material-UI',
        'Node.js',
        'Express',
        'Redis',
        'MongoDB',
      ],
      githubProjectFrontend: 'https://github.com/kawanofer/art-explorer-react',
      githubProjectBackend: 'https://github.com/kawanofer/met-museum-backend',
      category: 'Fullstack',
    },
  ];

  const getCategoryColor = (category: ProjectProps['category']) => {
    switch (category) {
      case 'Front-end':
        return 'primary';
      case 'Fullstack':
        return 'success';
      default:
        return 'default';
    }
  };

  const projectsStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Fernando Kawano - Projects Portfolio',
    description:
      'Portfolio of frontend development projects by Fernando Kawano including React applications, TypeScript implementations, and modern web solutions.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://fernando-kawano-ivory.vercel.app/'}/Projects`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: projects.map((project, index) => ({
        '@type': 'CreativeWork',
        position: index + 1,
        name: project.title,
        description: project.description,
        url: project.website || project.githubProjectFrontend,
        programmingLanguage: project.technologies,
        creator: {
          '@type': 'Person',
          name: 'Fernando Kawano',
        },
      })),
    },
  };

  return (
    <>
      <StructuredData data={projectsStructuredData} />
      <Layout>
        <Section>
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <Title title={t('projects.title')} />
              <p className="text-lg text-zinc-500">{t('projects.subtitle')}</p>
            </div>

            {/* Projects List */}
            <div className="flex flex-col gap-12">
              {projects.map(project => (
                <Card
                  key={project.title}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    borderRadius: 3,
                    overflow: 'hidden',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme => theme.shadows[12],
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, pb: 0 }}>
                    {/* Project Header */}
                    <div className="mb-6">
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <h2 className="mb-2 text-2xl font-bold text-gray-900">
                            {project.title}
                          </h2>
                          <div className="flex gap-2">
                            <Chip
                              label={project.category}
                              size="medium"
                              color={getCategoryColor(project.category)}
                              variant="filled"
                              sx={{ fontWeight: 'medium' }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Carousel */}
                    {project?.images &&
                      project.images.filter(img => img && img.trim() !== '')
                        .length > 0 && (
                        <div className="mb-6">
                          <Carousel
                            images={project.images.filter(
                              img => img && img.trim() !== ''
                            )}
                          />
                        </div>
                      )}

                    {/* Description */}
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold text-gray-800">
                        {t('projects.description')}
                      </h3>
                      <p className="text-base leading-relaxed text-gray-700">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div className="mb-6">
                      <h3 className="mb-3 text-lg font-semibold text-gray-800">
                        {t('projects.technologies')}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Chip
                            key={techIndex}
                            label={tech}
                            size="medium"
                            variant="outlined"
                            sx={{
                              fontSize: '0.875rem',
                              '&:hover': {
                                backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                borderColor: 'primary.main',
                              },
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </CardContent>

                  {/* Actions */}
                  <CardActions sx={{ p: 4, pt: 0, gap: 2 }}>
                    <div className="flex w-full flex-wrap gap-3">
                      {project.website && (
                        <Tooltip title="Visit Live Website" arrow>
                          <Button
                            size="medium"
                            startIcon={<Language />}
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            sx={{
                              minWidth: 140,
                              fontWeight: 'medium',
                            }}
                          >
                            Live Website
                          </Button>
                        </Tooltip>
                      )}

                      {project.githubProjectFrontend && (
                        <Tooltip title="View Frontend Code" arrow>
                          <Button
                            size="medium"
                            startIcon={<GitHub />}
                            href={project.githubProjectFrontend}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            sx={{ minWidth: 140 }}
                          >
                            Frontend Code
                          </Button>
                        </Tooltip>
                      )}

                      {project.githubProjectBackend && (
                        <Tooltip title="View Backend Code" arrow>
                          <Button
                            size="medium"
                            startIcon={<Code />}
                            href={project.githubProjectBackend}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            sx={{ minWidth: 140 }}
                          >
                            Backend Code
                          </Button>
                        </Tooltip>
                      )}

                      {project.githubUrl && (
                        <Tooltip title="View Source Code" arrow>
                          <Button
                            size="medium"
                            startIcon={<GitHub />}
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            sx={{ minWidth: 140 }}
                          >
                            {t('projects.code')}
                          </Button>
                        </Tooltip>
                      )}

                      {project.liveUrl && (
                        <Tooltip title="View Live Demo" arrow>
                          <Button
                            size="medium"
                            startIcon={<OpenInNew />}
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            color="success"
                            sx={{ minWidth: 140 }}
                          >
                            {t('projects.liveDemo')}
                          </Button>
                        </Tooltip>
                      )}
                    </div>
                  </CardActions>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      </Layout>
    </>
  );
}

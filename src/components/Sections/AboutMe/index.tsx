import React from 'react';

import Image from 'next/image';

import { Tooltip } from '@mui/material';

import Title from '@/components/UI/Title';

export default function AboutMe() {
  return (
    <section id="aboutme" className="rounded-md bg-background2 p-8 pb-16 pt-16">
      <Title title="About me" />

      <div className="m-auto flex flex-col items-center justify-center md:flex-row md:items-start md:justify-between">
        <div className="mb-14 mr-0 flex items-center md:mr-16">
          <Image
            className="rounded-full bg-secondary"
            src="/kawano.png"
            alt="Fernando Kawano picture"
            width={290}
            height={290}
            quality={100}
          />
        </div>

        <div className="bg-background1 p-4 text-white md:w-4/5">
          <p className="text-lg leading-relaxed">
            I&apos;m a Front-end Software Engineer with extensive experience
            crafting immersive digital experiences. I have a proven track record
            of impactful projects across a variety of industries. My expertise
            lies in using cutting-edge technology to create complex and
            user-friendly solutions.
            <br />
            <br />
            My jorney started as a Frontend Developer at Positivo Informática,
            where he developed his skills in HTML5, jQuery and Bootstrap.
            Throughout its path at VEXPRO Business IT, I can demonstrate my
            strengths by seamlessly transitioning between SharePoint and React
            environments, creating solutions tailored to a variety of customer
            needs.
            <br />
            <br />
            At Kenect, I played a key role in transforming backend team
            integration through flexible frontend solutions. Using technologies
            like React, Redux-Saga, and styled-components, I created a unified
            platform that simplified operations and increased productivity.
            <br />
            <br />
            With a strong skill set including AngularJS, React.js, TypeScript,
            and more, I am poised to drive innovation and improve user
            experience in any front-end application
          </p>

          <div className="mt-5 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <Tooltip title="English">
                <Image
                  className="rounded-full"
                  src="/en.png"
                  alt="English flag"
                  width={20}
                  height={20}
                />
              </Tooltip>
              <p>B2/C1</p>
            </div>

            <div className="flex items-center gap-2">
              <Tooltip title="Portuguese (Brazil)">
                <Image
                  className="rounded-full"
                  src="/br.png"
                  alt="Brazilian flag"
                  width={20}
                  height={20}
                />
              </Tooltip>
              <p>Native</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

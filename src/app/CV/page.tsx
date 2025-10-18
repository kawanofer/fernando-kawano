import React from 'react';

import Link from 'next/link';

import WorkExperiences from './workExperiences';

export default function CV() {
  return (
    <div className="my-10">
      <h1 className="flex justify-center text-3xl font-semibold text-tertiary">
        Fernanod Kawano
      </h1>
      <div className="mt-3 flex justify-center gap-10">
        <Link href="mailto:kawano.fer@gmail.com" target="_blank">
          kawano.fer@gmail.com
        </Link>
        <Link
          href="https://www.linkedin.com/in/fernandokawano/"
          target="_blank"
        >
          linkedin.com/in/fernandokawano/
        </Link>
      </div>
      {/* ABOUT ME */}
      <p className="my-10">
        I’m a Front-end Software Engineer with extensive experience crafting
        immersive digital experiences. I have a proven track record of impactful
        projects across a variety of industries. I’m specialized in web
        development using JavaScript’s modern framework like React. My expertise
        lies in using cutting-edge technology to create complex and
        user-friendly solutions.
      </p>
      {/* WORK EXPERIENCE */}
      <WorkExperiences />
    </div>
  );
}

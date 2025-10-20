import React from 'react';

import Link from 'next/link';

import { AiOutlineMail } from 'react-icons/ai';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function SocialIcons() {
  return (
    <div className="mt-10 flex justify-center">
      <div className="transition-transform duration-300 hover:scale-110">
        <Link href="https://github.com/kawanofer" target="_blank">
          <div className="text-5xl transition-colors duration-300 hover:text-secondary">
            <FaGithub />
          </div>
        </Link>
      </div>

      <div className="mx-5">
        <div className="transition-transform duration-300 hover:scale-110">
          <Link
            href="https://www.linkedin.com/in/fernandokawano/"
            target="_blank"
          >
            <div className="text-5xl transition-colors duration-300 hover:text-secondary">
              <FaLinkedin />
            </div>
          </Link>
        </div>
      </div>

      <div className="transition-transform duration-300 hover:scale-110">
        <Link href="mailto:kawano.fer@gmail.com">
          <div className="text-5xl transition-colors duration-300 hover:text-secondary">
            <AiOutlineMail />
          </div>
        </Link>
      </div>
    </div>
  );
}

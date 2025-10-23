'use client';

import { Fragment, useEffect, useState } from 'react';

import Link from 'next/link';

import { Dialog, Transition } from '@headlessui/react';
import { FaBars } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

import { LanguageSwitcher } from '@/components/UI';

type MenuProps = {
  label: string;
  href: string;
};

export default function MobileMenu({ menu }: Readonly<{ menu: MenuProps[] }>) {
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
      >
        <FaBars className="h-4 text-white" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="bg-background fixed inset-0" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="bg-background fixed top-0 right-0 bottom-0 left-0 flex h-full w-full flex-col pb-6">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-white transition-colors"
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <IoMdClose className="h-6" />
                </button>

                {menu.length ? (
                  <ul className="flex w-full flex-col">
                    {menu.map((item: MenuProps) => (
                      <li
                        className="py-2 text-xl text-white transition-colors"
                        key={item.label}
                      >
                        <Link href={item.href} onClick={closeMobileMenu}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {/* Language Switcher */}
                <div className="mt-6 border-t border-zinc-700 pt-4">
                  <p className="mb-3 text-sm text-zinc-400">
                    Language / Idioma
                  </p>
                  <LanguageSwitcher />
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}

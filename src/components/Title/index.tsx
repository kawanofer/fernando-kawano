import React from 'react';

type TitleProps = {
  title: string;
};

export default function Title({ title }: Readonly<TitleProps>) {
  return <h2 className="relative py-8 text-4xl font-bold">{title}</h2>;
}

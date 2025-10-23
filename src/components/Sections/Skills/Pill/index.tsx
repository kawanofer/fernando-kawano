import React from 'react';

type PillProps = {
  value: string;
};

export default function Pill({ value }: Readonly<PillProps>) {
  return (
    <div className="bg-background-2 hover:bg-tertiary hover:text-primary cursor-pointer rounded p-2 text-lg text-white">
      {value}
    </div>
  );
}

import React from 'react';

type PillProps = {
  value: string;
};

export default function Pill({ value }: Readonly<PillProps>) {
  return (
    <div className="cursor-pointer rounded bg-background2 p-2 text-lg text-white hover:bg-tertiary hover:text-primary">
      {value}
    </div>
  );
}

import React from 'react'

type PillProps = {
  value: string
}

export default function Pill({ value }: Readonly<PillProps>) {
  return (
    <div className="rounded p-2 text-lg cursor-pointer bg-background2 text-white hover:bg-tertiary hover:text-primary">
      {value}
    </div>
  )
}

import React from 'react'

type TitleProps = {
  title: string
}

export default function Title({ title }: Readonly<TitleProps>) {
  return (
    <h2 className="text-4xl font-bold py-8 relative">
      {title}
    </h2>
  )
}

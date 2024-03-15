import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}
const Button = ({
  children,
  className,
  onClick
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md px-4 py-2 active:bg-background2 text-white bg-primary hover:bg-secondary
      ${className}`}
      id={'button'}
      onClick={onClick}
      type='button'>
      {children}
    </button>
  )
}

export default Button

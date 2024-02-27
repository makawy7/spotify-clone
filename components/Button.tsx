import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        type={type}
        {...props}
        disabled={disabled}
        ref={ref}
        className={twMerge(
          `rounded-full px-6 py-2 text-sm text-neutral-800 transition  hover:opacity-75 disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button

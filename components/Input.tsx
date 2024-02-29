import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ children, className, disabled, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        {...props}
        className={twMerge(
          `
            w-full
            rounded-md
            bg-neutral-700
            px-4
            py-3
            file:disabled:opacity-50
            placeholder:text-neutral-400
            focus:outline-none
            disabled:cursor-not-allowed
            disabled:opacity-50
        `,
          className,
        )}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input

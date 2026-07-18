import type { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  name: string
  value: string
  error?: string
  hint?: ReactNode
  type?: string
  placeholder?: string
  onChange: (value: string) => void
  onBlur: () => void
}

export function FormField({
  label,
  name,
  value,
  error,
  hint,
  type = 'text',
  placeholder,
  onChange,
  onBlur,
}: FormFieldProps) {
  const errorId = `${name}-error`
  const hintId = `${name}-hint`

  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : hint ? hintId : undefined}
        className={`w-full rounded-lg border bg-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft focus:outline-none ${
          error ? 'border-danger' : 'border-border focus:border-primary'
        }`}
      />
      {error ? (
        <p id={errorId} className="mt-1 text-xs text-danger">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="mt-1 text-xs text-accent">
            {hint}
          </p>
        )
      )}
    </div>
  )
}

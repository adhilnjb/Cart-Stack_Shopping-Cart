import type { ReactNode } from 'react'

interface StatePanelProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  tone?: 'neutral' | 'danger'
}

/**
 * A single reusable panel for empty states and error states, so both look
 * and feel consistent across the app instead of each screen inventing its
 * own "nothing here" markup.
 */
export function StatePanel({ icon, title, description, action, tone = 'neutral' }: StatePanelProps) {
  const toneClasses = tone === 'danger' ? 'border-danger-soft bg-danger-soft/40' : 'border-border bg-surface'

  return (
    <div className={`flex flex-col items-center gap-3 rounded-xl border ${toneClasses} px-6 py-16 text-center`}>
      {icon && <div className="text-3xl">{icon}</div>}
      <p className="text-base font-semibold text-ink">{title}</p>
      {description && <p className="max-w-sm text-sm text-ink-soft">{description}</p>}
      {action}
    </div>
  )
}

import { Fragment } from 'react'

const STEPS = ['Cart Review', 'Shipping', 'Payment Summary'] as const

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  const currentLabel = STEPS[currentStep - 1]

  return (
    <div className="w-full mx-auto max-w-7xl px-1 sm:px-0 mb-6 sm:mb-8">
      {/* 
        Container Strategy: 
        - `w-full flex justify-between`: Ensures the line fills the mobile view end-to-end.
        - `list-none`: Safely resets list element defaults across mobile layout configurations.
      */}
      <ol className="flex w-full items-center justify-between list-none p-0 m-0">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1
          const isComplete = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <Fragment key={label}>
              {/* Item wrapper: flex-1 allows dynamic expanding on desktop, shrink-0 maintains mobile integrity */}
              <li className="flex items-center gap-2 sm:flex-1 sm:last:flex-none">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span
                    className={`font-numeric flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 transition-colors duration-200 ${
                      isComplete
                        ? 'bg-primary text-white'
                        : isCurrent
                          ? 'border-2 border-primary text-primary bg-surface'
                          : 'border border-border text-ink-soft bg-surface'
                    }`}
                    aria-current={isCurrent ? 'step' : undefined}
                  >
                    {isComplete ? '✓' : stepNumber}
                  </span>
                  
                  {/* Text hidden entirely on phone sizes, truncates cleanly on medium table view sizes */}
                  <span
                    className={`hidden sm:inline text-sm max-w-[120px] md:max-w-none truncate tracking-wide transition-colors ${
                      isCurrent ? 'font-semibold text-ink' : 'text-ink-soft'
                    }`}
                  >
                    {label}
                  </span>
                </div>
              </li>

              {/* Connecting line: Scales dynamic sizing across different break points */}
              {stepNumber !== STEPS.length && (
                <div
                  className={`mx-2 h-0.5 min-w-[20px] flex-1 transition-colors duration-300 rounded-full ${
                    stepNumber < currentStep ? 'bg-primary' : 'bg-border'
                  } sm:mx-4`}
                />
              )}
            </Fragment>
          )
        })}
      </ol>

      {/* Modern text helper strictly displayed on mobile break points */}
      <div className="mt-3 text-center sm:hidden bg-surface-muted py-2 px-3 rounded-lg border border-border">
        <p className="text-xs font-medium text-ink-soft">
          Step <span className="font-bold text-ink">{currentStep}</span> of {STEPS.length}:{' '}
          <span className="font-semibold text-primary">{currentLabel}</span>
        </p>
      </div>
    </div>
  )
}
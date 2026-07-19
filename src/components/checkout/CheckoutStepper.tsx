const STEPS = ['Cart Review', 'Shipping', 'Payment Summary'] as const

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  const currentLabel = STEPS[currentStep - 1]

  return (
    <div className="mb-6 sm:mb-8">
      <ol className="flex w-full items-center px-1">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1
          const isComplete = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
                <span
                  className={`font-numeric flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold sm:h-7 sm:w-7 sm:text-xs ${
                    isComplete
                      ? 'bg-primary text-white'
                      : isCurrent
                        ? 'border-2 border-primary text-primary'
                        : 'border border-border text-ink-soft'
                  }`}
                  aria-current={isCurrent ? 'step' : undefined}
                >
                  {isComplete ? '✓' : stepNumber}
                </span>
                <span
                  className={`hidden truncate text-sm sm:inline ${
                    isCurrent ? 'font-semibold text-ink' : 'text-ink-soft'
                  }`}
                >
                  {label}
                </span>
              </div>
              {stepNumber !== STEPS.length && (
                <div
                  className={`mx-1.5 h-px min-w-[12px] flex-1 sm:mx-3 ${
                    isComplete ? 'bg-primary' : 'bg-border'
                  }`}
                />
              )}
            </li>
          )
        })}
      </ol>

      <p className="mt-2 text-center text-xs font-semibold text-ink sm:hidden">
        Step {currentStep} of {STEPS.length}: {currentLabel}
      </p>
    </div>
  )
}
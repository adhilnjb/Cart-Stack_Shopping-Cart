const STEPS = ['Cart Review', 'Shipping', 'Payment Summary'] as const

export function CheckoutStepper({ currentStep }: { currentStep: number }) {
  const currentLabel = STEPS[currentStep - 1]

  return (
    <div className="mb-8">
      <ol className="flex items-center">
        {STEPS.map((label, index) => {
          const stepNumber = index + 1
          const isComplete = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep

          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex items-center gap-2">
                <span
                  className={`font-numeric flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
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
                <div className={`mx-2 h-px flex-1 sm:mx-3 ${isComplete ? 'bg-primary' : 'bg-border'}`} />
              )}
            </li>
          )
        })}
      </ol>

      <p className="mt-2 text-center text-sm font-semibold text-ink sm:hidden">
        Step {currentStep} of {STEPS.length}: {currentLabel}
      </p>
    </div>
  )
}

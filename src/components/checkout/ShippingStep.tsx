import { useState, type FormEvent } from 'react'
import {
  validateShippingField,
  validateShippingForm,
  type ShippingFormErrors,
  type ShippingFormValues,
} from '@/schemas/shipping'
import { FormField } from './FormField'
import { Button } from '@/components/ui/Button'

interface ShippingStepProps {
  values: ShippingFormValues
  onChange: (values: ShippingFormValues) => void
  onNext: () => void
  onBack: () => void
}

const FIELDS: { name: keyof ShippingFormValues; label: string; type?: string; placeholder?: string; hint?: string }[] = [
  { name: 'fullName', label: 'Full name', placeholder: 'Jane Doe' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'jane@gmail.com' },
  { name: 'phone', label: 'Phone number', type: 'tel', placeholder: '9876543210', hint: '10 digits, no spaces or country code' },
  { name: 'address', label: 'Address', placeholder: '123 Market Street' },
  { name: 'city', label: 'City', placeholder: 'Springfield' },
  { name: 'postalCode', label: 'Postal code', placeholder: '560001', hint: '6-digit PIN code' },
]

export function ShippingStep({ values, onChange, onNext, onBack }: ShippingStepProps) {
  const [errors, setErrors] = useState<ShippingFormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingFormValues, boolean>>>({})

  function handleFieldChange(field: keyof ShippingFormValues, value: string) {
    onChange({ ...values, [field]: value })
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateShippingField(field, value) }))
    }
  }

  function handleBlur(field: keyof ShippingFormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateShippingField(field, values[field]) }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const validationErrors = validateShippingForm(values)
    setErrors(validationErrors)
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      address: true,
      city: true,
      postalCode: true,
    })

    if (Object.keys(validationErrors).length === 0) {
      onNext()
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-semibold text-ink">Shipping details</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={field.name === 'address' ? 'sm:col-span-2' : ''}>
            <FormField
              label={field.label}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={values[field.name]}
              error={errors[field.name]}
              hint={!errors[field.name] ? field.hint : undefined}
              onChange={(value) => handleFieldChange(field.name, value)}
              onBlur={() => handleBlur(field.name)}
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex gap-3">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Continue to payment summary</Button>
      </div>
    </form>
  )
}

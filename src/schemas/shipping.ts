import { z } from 'zod'

export const shippingSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, 'Full name is required')
    .min(2, 'Full name must be at least 2 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, and hyphens'),

  email: z
    .string()
    .trim()
    .email('Invalid email')
    .endsWith('@gmail.com', {
      message: 'Only Gmail addresses are allowed',
    }),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, {
      message: 'Phone number must be a valid 10-digit mobile number',
    }),

  address: z.string().trim().min(1, 'Address is required').min(5, 'Enter a complete address'),

  city: z
    .string()
    .trim()
    .min(4, 'City is required')
    .regex(/^[a-zA-Z\s'-]+$/, 'City can only contain letters, spaces, and hyphens'),

  postalCode: z
    .string()
    .trim()
    .regex(/^[1-9][0-9]{5}$/, 'Enter a valid 6-digit postal code'),
})

export type ShippingFormValues = z.infer<typeof shippingSchema>
// Alias kept for compatibility with either naming convention.
export type ShippingFormData = ShippingFormValues

export type ShippingFormErrors = Partial<Record<keyof ShippingFormValues, string>>

export const emptyShippingForm: ShippingFormValues = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
}

export function validateShippingForm(values: ShippingFormValues): ShippingFormErrors {
  const result = shippingSchema.safeParse(values)
  if (result.success) return {}

  const errors: ShippingFormErrors = {}
  result.error.issues.forEach((issue) => {
    const field = issue.path[0] as keyof ShippingFormValues
    if (!errors[field]) errors[field] = issue.message
  })
  return errors
}

export function validateShippingField(field: keyof ShippingFormValues, value: string): string | undefined {
  const fieldSchema = shippingSchema.shape[field]
  const result = fieldSchema.safeParse(value)
  return result.success ? undefined : result.error.issues[0].message
}

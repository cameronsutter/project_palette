import { swatchNames } from './swatchesReducer'

function transformColorVars (vars) {
  let newVars = {}
  swatchNames.forEach(name => {
    vars[name].colors.reduce((acc, color, idx) => {
      acc[`${name}-${idx}`] = color
      return acc
    }, newVars)
  })
  return newVars
}

export default function makeCSSTemplate (colorsPalette, fonts, spacing) {
  let colors = transformColorVars(colorsPalette)
  return `
/* neutral colors */
.neutral-0 {
  color: ${colors['neutral-0']};
}

.neutral-1 {
  color: ${colors['neutral-1']};
}

.neutral-2 {
  color: ${colors['neutral-2']};
}

.neutral-3 {
  color: ${colors['neutral-3']};
}

.neutral-4 {
  color: ${colors['neutral-4']};
}

.neutral-5 {
  color: ${colors['neutral-5']};
}

.neutral-6 {
  color: ${colors['neutral-6']};
}

.neutral-7 {
  color: ${colors['neutral-7']};
}

.neutral-8 {
  color: ${colors['neutral-8']};
}

.neutral-9 {
  color: ${colors['neutral-9']};
}

/* primary colors */
.primary-0 {
  color: ${colors['primary-0']};
}

.primary-1 {
  color: ${colors['primary-1']};
}

.primary-2 {
  color: ${colors['primary-2']};
}

.primary-3 {
  color: ${colors['primary-3']};
}

.primary-4 {
  color: ${colors['primary-4']};
}

.primary-5 {
  color: ${colors['primary-5']};
}

.primary-6 {
  color: ${colors['primary-6']};
}

.primary-7 {
  color: ${colors['primary-7']};
}

.primary-8 {
  color: ${colors['primary-8']};
}

.primary-9 {
  color: ${colors['primary-9']};
}

.success-0 {
  color: ${colors['success-0']};
}

/* success colors */
.success-1 {
  color: ${colors['success-1']};
}

.success-2 {
  color: ${colors['success-2']};
}

.success-3 {
  color: ${colors['success-3']};
}

.success-4 {
  color: ${colors['success-4']};
}

.success-5 {
  color: ${colors['success-5']};
}

.success-6 {
  color: ${colors['success-6']};
}

.success-7 {
  color: ${colors['success-7']};
}

.success-8 {
  color: ${colors['success-8']};
}

.success-9 {
  color: ${colors['success-9']};
}

/* error colors */
.error-0 {
  color: ${colors['error-0']};
}

.error-1 {
  color: ${colors['error-1']};
}

.error-2 {
  color: ${colors['error-2']};
}

.error-3 {
  color: ${colors['error-3']};
}

.error-4 {
  color: ${colors['error-4']};
}

.error-5 {
  color: ${colors['error-5']};
}

.error-6 {
  color: ${colors['error-6']};
}

.error-7 {
  color: ${colors['error-7']};
}

.error-8 {
  color: ${colors['error-8']};
}

.error-9 {
  color: ${colors['error-9']};
}

/* warning colors */
.warning-0 {
  color: ${colors['warning-0']};
}

.warning-1 {
  color: ${colors['warning-1']};
}

.warning-2 {
  color: ${colors['warning-2']};
}

.warning-3 {
  color: ${colors['warning-3']};
}

.warning-4 {
  color: ${colors['warning-4']};
}

.warning-5 {
  color: ${colors['warning-5']};
}

.warning-6 {
  color: ${colors['warning-6']};
}

.warning-7 {
  color: ${colors['warning-7']};
}

.warning-8 {
  color: ${colors['warning-8']};
}

.warning-9 {
  color: ${colors['warning-9']};
}

/* support colors */
.support-0 {
  color: ${colors['support-0']};
}

.support-1 {
  color: ${colors['support-1']};
}

.support-2 {
  color: ${colors['support-2']};
}

.support-3 {
  color: ${colors['support-3']};
}

.support-4 {
  color: ${colors['support-4']};
}

.support-5 {
  color: ${colors['support-5']};
}

.support-6 {
  color: ${colors['support-6']};
}

.support-7 {
  color: ${colors['support-7']};
}

.support-8 {
  color: ${colors['support-8']};
}

.support-9 {
  color: ${colors['support-9']};
}

/* font sizes */
.font-0 {
  font-size: ${fonts['--font-0']};
}

.font-1 {
  font-size: ${fonts['--font-1']};
}

.font-2 {
  font-size: ${fonts['--font-2']};
}

.font-3 {
  font-size: ${fonts['--font-3']};
}

.font-4 {
  font-size: ${fonts['--font-4']};
}

.font-5 {
  font-size: ${fonts['--font-5']};
}

.font-6 {
  font-size: ${fonts['--font-6']};
}

.font-7 {
  font-size: ${fonts['--font-7']};
}

.font-8 {
  font-size: ${fonts['--font-8']};
}

.font-9 {
  font-size: ${fonts['--font-9']};
}

.font-xl {
  font-size: ${fonts['--font-xl']};
}

/* spacing sizes */
.spacing-0 {
  margin: ${spacing['--spacing-0']};
}

.spacing-1 {
  margin: ${spacing['--spacing-1']};
}

.spacing-2 {
  margin: ${spacing['--spacing-2']};
}

.spacing-3 {
  margin: ${spacing['--spacing-3']};
}

.spacing-4 {
  margin: ${spacing['--spacing-4']};
}

.spacing-5 {
  margin: ${spacing['--spacing-5']};
}

.spacing-6 {
  margin: ${spacing['--spacing-6']};
}

.spacing-7 {
  margin: ${spacing['--spacing-7']};
}

.spacing-8 {
  margin: ${spacing['--spacing-8']};
}

.spacing-9 {
  margin: ${spacing['--spacing-9']};
}
  `
}
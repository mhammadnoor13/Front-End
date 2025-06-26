// src/features/auth/RegisterPage.tsx
import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegister } from '../../hooks/useRegister'
import { SPECIALTY_KEYS, SpecialtyKey } from '../../utils/specialties'
import styles from './RegisterPage.module.css'

interface FormState {
  firstName: string
  lastName: string
  speciality: SpecialtyKey | ''
  email: string
  password: string
  confirmPassword: string
}
type FormErrors = Partial<Record<keyof FormState, string>>

export default function RegisterPage() {
  const { t } = useTranslation()
  const { submit, loading } = useRegister()

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    speciality: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value as any }))
    setErrors(prev => ({ ...prev, [name]: undefined }))
  }

  const validate = (): boolean => {
    const errs: FormErrors = {}
    // required
    ;(Object.keys(form) as (keyof FormState)[]).forEach(field => {
      if (!form[field]?.toString().trim())
        errs[field] = t('register.errors.required')
    })
    // email format
    if (form.email && !/.+@.+\..+/.test(form.email))
      errs.email = t('register.errors.emailInvalid')
    // password rules
    if (form.password && form.password.length < 8)
      errs.password = t('register.errors.passwordWeak')
    if (form.confirmPassword && form.confirmPassword !== form.password)
      errs.confirmPassword = t('register.errors.passwordMatch')

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    try {
      await submit(form)
      // TODO: navigate to login/dashboard
    } catch {
      // error shown by toast
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('register.title')}</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/** First Name **/}
        <div className={styles.formGroup}>
          <label htmlFor="firstName" className={styles.label}>
            {t('register.firstName')}
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className={styles.input}
            value={form.firstName}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.firstName && (
            <div className={styles.error}>{errors.firstName}</div>
          )}
        </div>

        {/** Last Name **/}
        <div className={styles.formGroup}>
          <label htmlFor="lastName" className={styles.label}>
            {t('register.lastName')}
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className={styles.input}
            value={form.lastName}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.lastName && (
            <div className={styles.error}>{errors.lastName}</div>
          )}
        </div>

        {/** Speciality **/}
        <div className={styles.formGroup}>
          <label htmlFor="speciality" className={styles.label}>
            {t('register.speciality')}
          </label>
          <select
            id="speciality"
            name="speciality"
            className={styles.input}
            value={form.speciality}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="" disabled>
              {t('register.selectSpeciality')}
            </option>
            {SPECIALTY_KEYS.map((key) => (
              <option key={key} value={key}>
                {t(`specialties.${key}`)}
              </option>
            ))}
          </select>
          {errors.speciality && (
            <div className={styles.error}>{errors.speciality}</div>
          )}
        </div>

        {/** Email **/}
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            {t('register.email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && (
            <div className={styles.error}>{errors.email}</div>
          )}
        </div>

        {/** Password **/}
        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            {t('register.password')}
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={styles.input}
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
        </div>

        {/** Confirm Password **/}
        <div className={styles.formGroup}>
          <label htmlFor="confirmPassword" className={styles.label}>
            {t('register.confirmPassword')}
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={styles.input}
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? t('home.submitting') : t('register.submit')}
        </button>
      </form>
    </div>
  )
}

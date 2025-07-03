// src/features/auth/RegisterPage.tsx
import { FormEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './RegisterPage.module.css'
import {  LoginRequest } from './types'
import { useLogin } from './hooks/useLogin'


type FormErrors = Partial<Record<keyof LoginRequest, string>>

export default function LoginPage() {
  const { t } = useTranslation()
  const { doLogin, loading } = useLogin()

  const [form, setForm] = useState<LoginRequest>({
    email: '',
    password: ''
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
    ;(Object.keys(form) as (keyof LoginRequest)[]).forEach(field => {
      if (!form[field]?.toString().trim())
        errs[field] = t('register.errors.required')
    })
    // email format
    if (form.email && !/.+@.+\..+/.test(form.email))
      errs.email = t('register.errors.emailInvalid')
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    const {...payload} = form

    try {
      await doLogin(payload as LoginRequest)
    } catch {
      // error shown by toast
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{t('login.title')}</h1>
      <form onSubmit={handleSubmit} noValidate>

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



        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading ? t('login.submitting') : t('login.submit')}
        </button>
      </form>
    </div>
  )
}

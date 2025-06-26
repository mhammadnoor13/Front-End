// src/hooks/useRegister.ts
import { useState } from 'react'
import { toast } from 'react-toastify'
import { registerUser, RegisterPayload } from '../services/authService'
import { useTranslation } from 'react-i18next'

export function useRegister() {
  const { t } = useTranslation()
  const [loading, setLoading] = useState(false)

  async function submit(data: RegisterPayload) {
    setLoading(true)
    try {
      const result = await registerUser(data)
      toast.success(t('register.success'))
      return result
    } catch (err: any) {
      // map error.code (in err.message) to i18n path
      const code = err.message
      const key = `register.errors.${code}` as const
      // fallback
      const msg =
        t(key, { defaultValue: t('register.errors.SERVER_ERROR') })
      toast.error(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading }
}

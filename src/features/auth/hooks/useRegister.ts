// src/hooks/useRegister.ts
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../shared/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { RegisterPayload } from '../types'
import { AppRoutes } from '../../../shared/routes/routes'

export function useRegister() {
  const {register} = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);


  async function doRegister(data: RegisterPayload) {
    setLoading(true);
    try {
      await register(data);
      navigate(AppRoutes.reviewCases);
      toast.success(t('register.success'))
    } 
    catch (err: any) {
      // map error.code (in err.message) to i18n path
      const code = err.message
      const key = `register.errors.${code}` as const
      // fallback
      const msg =
        t(key, { defaultValue: t('register.errors.UNKNOWN') })
      toast.error(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { doRegister, loading }
}

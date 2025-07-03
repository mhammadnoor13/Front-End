// src/hooks/uselogin.ts
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../../shared/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { AppRoutes } from '../../../shared/routes/routes'
import { LoginRequest } from '../types'

export function useLogin() {
  const {login} = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);


  async function doLogin(data: LoginRequest) {
    setLoading(true);
    try {
      await login(data);
      navigate(AppRoutes.REVIEW_CASES);
      toast.success(t('login.success'))
    } 
    catch (err: any) {
      // map error.code (in err.message) to i18n path
      const code = err.message
      const key = `login.errors.${code}` as const
      // fallback
      const msg =
        t(key, { defaultValue: t('login.errors.UNKNOWN') })
      toast.error(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { doLogin, loading }
}

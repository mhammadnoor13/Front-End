import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import styles from './SubmitCaseForm.module.css';
import { useHttpClient } from '../../../../shared/contexts/HttpClientContext';
import { CaseInput, makeCaseService } from '../../services/caseService';
import { SPECIALTY_KEYS, SpecialtyKey } from '../../../../shared/utils/specialties';

export default function SubmitCaseForm() {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CaseInput>();

  const client = useHttpClient();
  const { submitCase } = makeCaseService(client);

  const onSubmit = async (data: CaseInput) => {
    try {
      await submitCase(data);
      toast.success(t('home.success'));
      reset();
    } catch {
      toast.error(t('home.error'));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}
      noValidate
    >
      {/* Email */}
      <div className={styles.group}>
        <label htmlFor="email" className={styles.label}>
          {t('home.emailPlaceholder')}
        </label>
        <input
          id="email"
          type="email"
          aria-invalid={!!errors.email}
          {...register('email', { required: true })}
          className={styles.input}
        />
        {errors.email && <span className={styles.error}>{t('home.emailRequired')}</span>}
      </div>

      {/* Specialty */}
      <div className={styles.group}>
        <label htmlFor="speciality" className={styles.label}>
          {t('home.specialtySelect')}
        </label>
        <select
          id="speciality"
          aria-invalid={!!errors.speciality}
          {...register('speciality', { required: true })}
          className={styles.select}
        >
          <option value="">{t('home.specialtySelect')}</option>
          {SPECIALTY_KEYS.map((key: SpecialtyKey) => (
            <option key={key} value={key}>
              {t(`specialties.${key}`)}
            </option>
          ))}
        </select>
        {errors.speciality && <span className={styles.error}>{t('home.specialtyRequired')}</span>}
      </div>

      {/* Description */}
      <div className={styles.group}>
        <label htmlFor="description" className={styles.label}>
          {t('home.descriptionPlaceholder')}
        </label>
        <textarea
          id="description"
          aria-invalid={!!errors.description}
          {...register('description', { required: true })}
          className={styles.textarea}
        />
        {errors.description && (
          <span className={styles.error}>{t('home.descriptionRequired')}</span>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={styles.button}
      >
        {isSubmitting ? t('home.submitting') : t('home.submit')}
      </button>
    </form>
  );
}

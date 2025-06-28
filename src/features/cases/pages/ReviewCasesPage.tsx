import { useTranslation } from 'react-i18next';
import styles from './ReviewCasesPage.module.css';

export default function ReviewCasesPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {t('reviewCases.registered')}
      </h1>
    </div>
  );
}

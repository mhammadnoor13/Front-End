import { useTranslation } from 'react-i18next';
import SubmitCaseForm from './SubmitCaseForm';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <section className={styles.container}>
      <h1>{t('home.title')}</h1>
      <SubmitCaseForm />
    </section>
  );
}

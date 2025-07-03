import { useTranslation } from 'react-i18next';
import styles from './HomePage.module.css';
import SubmitCaseForm from './components/SubmitCaseForm';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <section className={styles.container}>
      <h1>{t('home.title')}</h1>
      <SubmitCaseForm />
    </section>
  );
}

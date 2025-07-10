import { useEffect, useState } from 'react';
import { useHttpClient } from '../../../shared/contexts/HttpClientContext';
import { getAssignedCases } from '../../cases/services/caseService';
import styles from './ReviewCasesPage.module.css';
import { CaseToReviewResponse } from '../types/Case';
import CaseCard from './components/CaseCard';
import { useAuth } from '../../../shared/contexts/AuthContext';

export default function ReviewCasesPage() {
  const { tokens } = useAuth();
  const httpClient = useHttpClient();
  const [cases, setCases] = useState<CaseToReviewResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    if(!tokens) return;
    async function fetchCases() {
      try {
        setLoading(true);
        const data = await getAssignedCases(httpClient);
        setCases(data);
      } catch (err: any) {
        setError(err.message || 'Failed to load cases');
      } finally {
        setLoading(false);
      }
    }
    fetchCases();
  }, [httpClient]);

  if (loading) {
    return <div className={styles.center}>Loading cases…</div>;
  }

  if (error) {
    return <div className={styles.center}>Error: {error}</div>;
  }

  if (cases.length === 0) {
    return <div className={styles.center}>No cases assigned.</div>;
  }

  return (
    <div className={styles.grid}>
      {cases.map(caseItem => (
        <CaseCard key={caseItem.id} caseItem={caseItem} />
      ))}
    </div>
  );
}

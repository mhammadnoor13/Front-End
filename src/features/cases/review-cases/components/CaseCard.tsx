import { useNavigate } from 'react-router-dom';
import { CaseToReviewResponse } from '../../types/Case';
import styles from './CaseCard.module.css';
import { AppRoutes } from '../../../../shared/routes/routes';

interface Props {
  caseItem: CaseToReviewResponse;
}


export default function CaseCard({ caseItem }: Props) {
  const navigate = useNavigate();

  const onReview =() =>{
    navigate(`${AppRoutes.REVIEW_CASES}/${caseItem.id}`);
  };

  const snippet =
    caseItem.description.length > 100
      ? caseItem.description.slice(0, 100) + '…'
      : caseItem.description;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>This is Title</h3>
      <div className={styles.meta}>
        <span className={styles.specialty}>Specialty</span>
        <span className={styles.date}>Date</span>
      </div>
      <p className={styles.snippet}>{snippet}</p>
      <button className={styles.button} onClick={onReview}>
        Review
      </button>
    </div>
  );
}

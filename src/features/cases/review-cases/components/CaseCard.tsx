// src/features/cases/review-cases/components/CaseCard.tsx

import { CaseToReviewResponse } from '../../types/Case';
import styles from './CaseCard.module.css';

interface Props {
  caseItem: CaseToReviewResponse;
}

export default function CaseCard({ caseItem }: Props) {
  return (
    <article className={styles.card}>
      <h2 className={styles.id}>{caseItem.id}</h2>
      <p className={styles.description}>{caseItem.description}</p>
      {/* TODO: later add action buttons: Accept, Suggest, Request */}
    </article>
  );
}

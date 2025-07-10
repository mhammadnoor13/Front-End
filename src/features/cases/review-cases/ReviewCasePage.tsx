import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../shared/contexts/AuthContext";
import { useHttpClient } from "../../../shared/contexts/HttpClientContext";
import { useEffect, useState } from "react";
import styles from './ReviewCasePage.module.css';
import { getCaseDetail } from "../services/caseService";
import { CaseDetail } from "../types/Case";

export default function ReviewCasePage(){
    const {id} = useParams<{id:string}>();
    const navigate = useNavigate();
    const {tokens} = useAuth();
    const httpClient = useHttpClient();

    const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(()=>{
        if(!tokens || !id) return;
        async function fetchDetails(caseId:string) {
        try {
            setLoading(true);
            const data = await getCaseDetail(httpClient,caseId);
            setCaseDetail(data);
        } catch (err: any) {
            setError(err.message || 'Failed to load cases');
        } finally {
            setLoading(false);
        }
        }
        fetchDetails(id)
    },[httpClient, id, tokens]);

    if (!id)  return <div className={styles.center}>No case selected.</div>;
    if (loading) return <div className={styles.center}>Loading case…</div>;
    if (error)   return <div className={styles.center}>Error: {error}</div>;
    if (!caseDetail) return <div className={styles.center}>Case not found.</div>;

    return (
    <div className={styles.detailContainer}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        ← Back
      </button>

      <h2 className={styles.title}>{caseDetail.title}</h2>
      <div className={styles.meta}>
        <span>{caseDetail.specialty}</span>
        <span>{new Date(caseDetail.date).toLocaleDateString()}</span>
      </div>

      <section className={styles.section}>
        <h3>Description</h3>
        <p>{caseDetail.description}</p>
      </section>

      <section className={styles.section}>
        <h3>Suggestions</h3>
        {/* suggestion form goes here */}
      </section>
    </div>
  );
}
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import CaseCard from "./CaseCard";
import { Case } from "../../types/Case";

const CasesList = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch('/api/cases');
        if (!response.ok) {
          throw new Error('Failed to fetch cases');
        }
        const data = await response.json();
        setCases(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Mock data for demonstration
        setCases([
          {
            id: "ca00ae27-a4e9-4d30-86ba-5537da4470ae",
            title: "Customer Complaint Analysis",
            description: "I know it is a long description and I'm sorry about that. The Idea here is that I am trying to test how the card component handles longer descriptions and truncates them properly while maintaining good readability.",
            status: "Assigned",
            createdAt: "2025-07-01T20:42:17.559Z"
          },
          {
            id: "cb11bf38-b5ea-5e41-97cb-6648eb5581bf",
            title: "Security Incident Review",
            description: "Security breach detected in payment processing system. Immediate review required to assess impact and implement corrective measures.",
            status: "ReadyToReview",
            createdAt: "2025-07-10T15:30:00.000Z"
          },
          {
            id: "cc22cf49-c6fb-6f52-08dc-7759fc6692cg",
            title: "Performance Optimization Case",
            description: "Application performance has degraded significantly. Database queries are taking longer than expected and user experience is impacted.",
            status: "New",
            createdAt: "2025-07-12T08:15:30.000Z"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading cases...</span>
        </div>
      </div>
    );
  }

  if (error && cases.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading cases</p>
          <p className="text-muted-foreground text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Case Reviews</h1>
        <p className="text-muted-foreground">
          {cases.length} {cases.length === 1 ? 'case' : 'cases'} found
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cases.map((caseItem) => (
          <CaseCard key={caseItem.id} case={caseItem} />
        ))}
      </div>
    </div>
  );
};

export default CasesList;
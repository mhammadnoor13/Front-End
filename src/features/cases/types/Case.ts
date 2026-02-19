export interface Case {
  id: string;
  title: string;
  description: string;
  status: "New" | "Assigned" | "ReadyToReview";
  createdAt: string;
}

export interface CaseToReviewResponse{
    id:string;
    title:string;
    description: string;
    status:string;
    createdAt: string;
}

export interface Suggestion {
    id: string;
    text: string;
}


export interface CaseDetail extends CaseToReviewResponse {
  suggestions: Suggestion[];
}
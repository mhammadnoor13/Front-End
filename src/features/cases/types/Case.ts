export interface CaseToReviewResponse{
    id:string;
    title:string;
    description: string;
}

export interface Suggestion {
    id: string;
    text: string;
}


export interface CaseDetail extends CaseToReviewResponse {
  specialty:   string;
  date:        string;
  suggestions: Suggestion[];
}
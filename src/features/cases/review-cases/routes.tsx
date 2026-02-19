
import { Routes, Route } from "react-router-dom";
import CasesListPage from "./pages/CasesListPage";
import CaseReviewPage from "./pages/CaseReviewPage";

export const ReviewCasesRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CasesListPage />} />
      <Route path="/:id" element={<CaseReviewPage />} />
    </Routes>
  );
};
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Eye } from "lucide-react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Case } from "../../types/Case";

interface CaseCardProps {
  case: Case;
}

const CaseCard = ({ case: caseData }: CaseCardProps) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const getDaysWaiting = (createdAt: string) => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTimeWaitingColor = (days: number) => {
    if (days > 10) return "text-warning-severe";
    if (days > 5) return "text-warning-moderate";
    return "text-muted-foreground";
  };

  const getStatusColor = () => {
    switch (caseData.status) {
      case "Assigned":
        return "bg-status-assigned";
      case "ReadyToReview":
        return "bg-status-ready";
      default:
        return "bg-muted";
    }
  };

  const getStatusText = () => {
    switch (caseData.status) {
      case "Assigned":
        return "Waiting for AI Suggestions";
      case "ReadyToReview":
        return "Waiting for Review";
      default:
        return caseData.status;
    }
  };

  const daysWaiting = getDaysWaiting(caseData.createdAt);

  return (
    <Card className="group relative bg-gradient-card shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-card-foreground leading-tight line-clamp-2">
              {caseData.title}
            </h3>
          </div>
          <div className="flex-shrink-0 relative">
            <div
              className={`w-3 h-3 rounded-full ${getStatusColor()} transition-transform duration-300 ${
                isHovered ? "scale-y-[3] rounded-lg" : ""
              } cursor-help`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            {isHovered && (
              <div className="absolute top-0 right-0 bg-popover border border-border rounded-md px-2 py-1 text-xs text-popover-foreground whitespace-nowrap z-10 shadow-lg animate-fade-in">
                {getStatusText()}
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
          {caseData.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3" />
            <span className={`font-medium ${getTimeWaitingColor(daysWaiting)}`}>
              {daysWaiting} {daysWaiting === 1 ? "day" : "days"} waiting
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/case/${caseData.id}`)}
            className="bg-primary text-primary-foreground hover:bg-primary/90 border-primary/20 shadow-sm"
          >
            <Eye className="w-4 h-4 mr-1" />
            Review
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseCard;
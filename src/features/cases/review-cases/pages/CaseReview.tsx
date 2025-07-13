import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ArrowLeft, Calendar, FileText, CheckCircle, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Textarea } from "../components/ui/textarea";
import { Badge } from "../components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { CaseDetail } from "../../types/Case";
import { useToast } from "../hooks/use-toast";
import { Label } from "../components/ui/label";

const CaseReview = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [caseDetail, setCaseDetail] = useState<CaseDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSuggestion, setSelectedSuggestion] = useState<string>("");
  const [customSuggestion, setCustomSuggestion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCaseDetail = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch(`/api/cases/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch case details');
        }
        const data = await response.json();
        setCaseDetail(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        // Mock data for demonstration
        setCaseDetail({
          id: id || "",
          title: "Customer Complaint Analysis",
          description: "A comprehensive analysis is required for the customer complaint regarding the recent service outage. The customer reported multiple issues including data loss, service interruption, and poor communication during the incident. We need to review the technical details, assess the impact, and provide appropriate remediation steps.",
          status: "ReadyToReview",
          createdAt: "2025-07-01T20:42:17.559Z",
          suggestions: [
            {
              id: "sug1",
              text: "Implement automated backup system to prevent data loss in future incidents"
            },
            {
              id: "sug2", 
              text: "Improve communication protocols during service outages with real-time status updates"
            },
            {
              id: "sug3",
              text: "Offer service credits and enhanced support package as compensation"
            },
            {
              id: "sug4",
              text: "Conduct thorough system audit to identify and fix underlying infrastructure issues"
            }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetail();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!selectedSuggestion) {
      toast({
        title: "Selection Required",
        description: "Please select a suggestion or provide a custom one.",
        variant: "destructive"
      });
      return;
    }

    if (selectedSuggestion === "custom" && !customSuggestion.trim()) {
      toast({
        title: "Custom Suggestion Required",
        description: "Please provide your custom suggestion.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const reviewData = {
        caseId: id,
        selectedSuggestion: selectedSuggestion === "custom" ? customSuggestion : selectedSuggestion,
        isCustom: selectedSuggestion === "custom"
      };

      // Replace with your actual API endpoint
      const response = await fetch(`/api/cases/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      toast({
        title: "Review Submitted",
        description: "Your review has been successfully submitted.",
      });

      navigate('/');
    } catch (err) {
      toast({
        title: "Submission Failed",
        description: err instanceof Error ? err.message : "An error occurred while submitting the review.",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Loading case details...</span>
        </div>
      </div>
    );
  }

  if (error && !caseDetail) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive mb-2">Error loading case details</p>
          <p className="text-muted-foreground text-sm mb-4">{error}</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </Button>
        </div>
      </div>
    );
  }

  if (!caseDetail) return null;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Cases
          </Button>
        </div>

        <div className="space-y-6">
          {/* Case Details Card */}
          <Card className="bg-gradient-card shadow-soft border-border/50">
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-2xl text-card-foreground mb-2">
                    {caseDetail.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>Created: {format(new Date(caseDetail.createdAt), "PPP")}</span>
                    </div>
                    <Badge variant="secondary" className="font-medium">
                      {caseDetail.status}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-card-foreground leading-relaxed">
                  {caseDetail.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions Card */}
          <Card className="bg-gradient-card shadow-soft border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <CheckCircle className="w-5 h-5 text-primary" />
                Review Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={selectedSuggestion}
                onValueChange={setSelectedSuggestion}
                className="space-y-4"
              >
                {caseDetail.suggestions.map((suggestion) => (
                  <div key={suggestion.id} className="flex items-start space-x-3">
                    <RadioGroupItem
                      value={suggestion.id}
                      id={suggestion.id}
                      className="mt-1"
                    />
                    <Label
                      htmlFor={suggestion.id}
                      className="text-sm leading-relaxed cursor-pointer flex-1"
                    >
                      {suggestion.text}
                    </Label>
                  </div>
                ))}
                
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <RadioGroupItem
                      value="custom"
                      id="custom"
                      className="mt-1"
                    />
                    <Label
                      htmlFor="custom"
                      className="text-sm font-medium cursor-pointer"
                    >
                      Write a custom suggestion
                    </Label>
                  </div>
                  
                  <Textarea
                    value={customSuggestion}
                    onChange={(e) => setCustomSuggestion(e.target.value)}
                    disabled={selectedSuggestion !== "custom"}
                    placeholder="Enter your custom suggestion here..."
                    className="ml-6 min-h-[100px] disabled:opacity-50"
                  />
                </div>
              </RadioGroup>

              <div className="pt-4 border-t border-border">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      size="lg"
                      disabled={!selectedSuggestion || submitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submit Review
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirm Review Submission</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to submit this review? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSubmitReview}>
                        Yes, Submit Review
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseReview;
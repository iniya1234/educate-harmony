import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EvaluationResults } from "@/components/EvaluationResults";
import { ArrowLeft, FileText, ChevronRight, BookOpen, Star } from "lucide-react";
import { AssessmentEvaluation, getStoredAssessmentEvaluation, getStudentEvaluations } from "@/services/evaluationService";
import { toast } from "sonner";

const StudentReport = () => {
  const { studentId, assessmentId } = useParams<{ studentId: string; assessmentId?: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentEvaluation, setCurrentEvaluation] = useState<AssessmentEvaluation | null>(null);
  const [studentEvaluations, setStudentEvaluations] = useState<AssessmentEvaluation[]>([]);
  const [activeTab, setActiveTab] = useState<string>("current");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        if (!studentId) {
          toast.error("Student ID is required");
          navigate("/assignments");
          return;
        }

        // Fetch student's evaluations
        const evaluations = await getStudentEvaluations(studentId);
        setStudentEvaluations(evaluations);

        // If assessmentId is provided, fetch that specific evaluation
        if (assessmentId) {
          const evaluation = await getStoredAssessmentEvaluation(studentId, assessmentId);
          setCurrentEvaluation(evaluation);
        } else if (evaluations.length > 0) {
          // Otherwise, use the most recent evaluation
          setCurrentEvaluation(evaluations[0]);
        }
      } catch (error) {
        console.error("Error fetching student report:", error);
        toast.error("Failed to load student report");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [studentId, assessmentId, navigate]);

  // Handle selecting a different evaluation
  const handleSelectEvaluation = (evaluation: AssessmentEvaluation) => {
    setCurrentEvaluation(evaluation);
    navigate(`/student/${studentId}/assessment/${evaluation.assessmentId}`);
    setActiveTab("current");
  };

  if (loading) {
    return (
      <div className="container p-6 space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/assignments")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assignments
          </Button>
        </div>
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading student report...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!currentEvaluation) {
    return (
      <div className="container p-6 space-y-8">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={() => navigate("/assignments")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Assignments
          </Button>
        </div>
        <Card>
          <CardContent className="p-12">
            <div className="flex flex-col items-center justify-center space-y-4">
              <FileText className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-lg font-medium">No Evaluations Found</h3>
              <p className="text-sm text-muted-foreground text-center max-w-md">
                There are no evaluations available for this student. Please upload and evaluate assignments first.
              </p>
              <Button onClick={() => navigate("/assignments")}>
                Go to Assignments
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container p-6 space-y-8">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={() => navigate("/assignments")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Assignments
        </Button>
        <div>
          <h2 className="text-lg font-bold">{currentEvaluation.studentName}</h2>
          <p className="text-sm text-muted-foreground">Student ID: {currentEvaluation.studentId}</p>
        </div>
      </div>

      <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="current">Current Assessment</TabsTrigger>
          <TabsTrigger value="history">Assessment History</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6 animate-fade-in mt-6">
          <EvaluationResults evaluation={currentEvaluation} />
          
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Study Recommendations</CardTitle>
                <BookOpen className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>
                Personalized recommendations based on assessment performance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentEvaluation.questionEvaluations.filter(q => {
                // Identify questions where score is below 80%
                const [earned, total] = q.score.split('/').map(num => parseInt(num.trim()));
                return (earned / total) < 0.8;
              }).map((question, index) => (
                <div key={index} className="p-3 border rounded-lg hover:border-primary transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2 mt-1">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">
                        Strengthen understanding of {question.questionText}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {question.feedback.split('.')[0]}. Consider reviewing related study materials.
                      </p>
                      <Button variant="link" size="sm" className="h-auto p-0 text-xs text-primary">
                        View Resources <ChevronRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {currentEvaluation.questionEvaluations.filter(q => {
                const [earned, total] = q.score.split('/').map(num => parseInt(num.trim()));
                return (earned / total) < 0.8;
              }).length === 0 && (
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-3">
                    <Star className="h-5 w-5 text-green-600" />
                  </div>
                  <h4 className="text-sm font-medium">Great work!</h4>
                  <p className="text-xs text-muted-foreground max-w-xs mt-1">
                    This student performed well across all questions. Consider more advanced exercises to challenge them further.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Assessment History</CardTitle>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>
                Previous assessments and evaluations
              </CardDescription>
            </CardHeader>
            <CardContent>
              {studentEvaluations.length > 0 ? (
                <div className="divide-y">
                  {studentEvaluations.map((evaluation, index) => (
                    <div
                      key={index}
                      className="py-3 flex items-center justify-between cursor-pointer hover:bg-accent/50 transition-colors -mx-2 px-2 rounded-md"
                      onClick={() => handleSelectEvaluation(evaluation)}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{evaluation.assessmentTitle}</h4>
                          {evaluation.assessmentId === currentEvaluation.assessmentId && (
                            <Badge variant="outline" className="text-[10px]">Current</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(evaluation.date).toLocaleDateString()} | Score: {evaluation.overallScore} ({evaluation.overallPercentage}%)
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-sm text-muted-foreground">No previous assessments found</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentReport;

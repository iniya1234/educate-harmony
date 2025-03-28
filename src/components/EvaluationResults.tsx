
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AssessmentEvaluation, QuestionEvaluation } from "@/services/evaluationService";
import { FileText, Check, AlertCircle, BookOpen, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EvaluationResultsProps {
  evaluation: AssessmentEvaluation;
}

export function EvaluationResults({ evaluation }: EvaluationResultsProps) {
  // Extract percentage as a number for progress bar
  const percentageValue = parseInt(evaluation.overallPercentage) || 0;
  
  // Determine the grade color based on percentage
  const getGradeColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-500";
    if (percentage >= 75) return "text-blue-500";
    if (percentage >= 60) return "text-amber-500";
    return "text-red-500";
  };
  
  // Determine the badge color for question scores
  const getScoreBadgeColor = (score: string) => {
    const [earned, total] = score.split('/').map(num => parseInt(num.trim()));
    const percentage = (earned / total) * 100;
    
    if (percentage >= 90) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (percentage >= 75) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    if (percentage >= 60) return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl">{evaluation.assessmentTitle}</CardTitle>
              <CardDescription>
                Student: {evaluation.studentName} | ID: {evaluation.studentId}
              </CardDescription>
            </div>
            <Badge variant="outline">
              {new Date(evaluation.date).toLocaleDateString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <p className="text-sm font-medium">Overall Score</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">{evaluation.overallScore}</span>
                <span className={cn("text-xl font-semibold", getGradeColor(percentageValue))}>
                  {evaluation.overallPercentage}%
                </span>
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-2">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Performance</p>
                <p className="text-sm">{percentageValue}%</p>
              </div>
              <Progress value={percentageValue} className="h-2" />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted/50">
              <h3 className="font-medium mb-2 flex items-center">
                <AlertCircle className="mr-2 h-4 w-4 text-primary" />
                General Feedback
              </h3>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {evaluation.generalFeedback}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {evaluation.questionEvaluations.map((question) => (
                <AccordionItem key={question.questionNumber} value={`question-${question.questionNumber}`}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-4">
                      <span>Question {question.questionNumber}: {question.questionText}</span>
                      <Badge className={cn("ml-2", getScoreBadgeColor(question.score))}>
                        {question.score}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      <div className="p-3 border rounded-md bg-background">
                        <h4 className="text-sm font-medium mb-2">Student Response:</h4>
                        <p className="text-sm whitespace-pre-line">{question.studentResponse}</p>
                      </div>
                      
                      <div className="p-3 border rounded-md bg-muted/30">
                        <h4 className="text-sm font-medium mb-2 flex items-center">
                          <Check className="mr-2 h-4 w-4 text-primary" />
                          Feedback:
                        </h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line">
                          {question.feedback}
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="flex justify-end items-center space-x-2 mt-6">
            <Button variant="outline" size="sm">
              <BookOpen className="mr-2 h-4 w-4" />
              Study Recommendations
            </Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

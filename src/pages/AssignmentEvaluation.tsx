
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  FileText,
  Upload,
  PieChart,
  Settings,
  Lock,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  BookOpenCheck,
  User,
  Eye
} from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { AssessmentEvaluation, evaluateStudentAssessment } from "@/services/evaluationService";
import { getApiKeys } from "@/services/apiConfig";

// Interface for assignment structure
interface AssignmentQuestion {
  number: number;
  text: string;
  maxScore: number;
}

interface StudentResponse {
  questionNumber: number;
  response: string;
}

interface Student {
  id: string;
  name: string;
}

const AssignmentEvaluation = () => {
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("new");
  
  // New state for assessment creation
  const [assignmentTitle, setAssignmentTitle] = useState("");
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([
    { number: 1, text: "", maxScore: 10 }
  ]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEvaluateDialog, setShowEvaluateDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [studentResponses, setStudentResponses] = useState<StudentResponse[]>([]);
  const [evaluation, setEvaluation] = useState<AssessmentEvaluation | null>(null);
  
  // Mock data for completed assignments
  const completedAssignments = [
    {
      id: "A-1234",
      title: "Mid-term Physics Exam",
      date: "Mar 15, 2023",
      class: "Physics 101",
      files: 32,
      insights: 8,
    },
    {
      id: "A-1233",
      title: "Chemical Reactions Lab Report",
      date: "Mar 10, 2023",
      class: "Chemistry",
      files: 30,
      insights: 12,
    },
    {
      id: "A-1232",
      title: "Polynomial Functions Quiz",
      date: "Mar 5, 2023",
      class: "Algebra II",
      files: 24,
      insights: 6,
    },
    {
      id: "A-1231",
      title: "Literary Analysis Essay",
      date: "Feb 28, 2023",
      class: "English 10",
      files: 26,
      insights: 9,
    },
    {
      id: "A-1230",
      title: "Cellular Biology Test",
      date: "Feb 21, 2023",
      class: "Biology",
      files: 28,
      insights: 11,
    },
  ];
  
  // Mock students data
  const students = [
    { id: "S001", name: "John Doe" },
    { id: "S002", name: "Jane Smith" },
    { id: "S003", name: "Michael Johnson" },
    { id: "S004", name: "Emily Williams" },
    { id: "S005", name: "David Brown" },
  ];

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
  };

  const handleAnalyze = () => {
    if (files.length === 0) {
      toast.error("Please upload at least one file to analyze");
      return;
    }

    setAnalyzing(true);
    setProgress(0);

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          toast.success("Analysis complete! See the results in your dashboard.");
          setFiles([]);
          setActiveTab("history");
          return 0;
        }
        return prev + 5;
      });
    }, 300);
  };
  
  // Add a new question to the assessment
  const addQuestion = () => {
    setQuestions([...questions, {
      number: questions.length + 1,
      text: "",
      maxScore: 10
    }]);
  };
  
  // Update question text
  const updateQuestionText = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };
  
  // Update question max score
  const updateQuestionMaxScore = (index: number, score: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].maxScore = score;
    setQuestions(updatedQuestions);
  };
  
  // Handle creating a new assessment
  const handleCreateAssessment = () => {
    if (!assignmentTitle.trim()) {
      toast.error("Please enter an assignment title");
      return;
    }
    
    if (questions.some(q => !q.text.trim())) {
      toast.error("Please fill in all question fields");
      return;
    }
    
    toast.success(`Assessment "${assignmentTitle}" created successfully`);
    setShowCreateDialog(false);
    
    // Reset form
    setAssignmentTitle("");
    setQuestions([{ number: 1, text: "", maxScore: 10 }]);
  };
  
  // Handle student response update
  const updateStudentResponse = (questionNumber: number, response: string) => {
    const existingIndex = studentResponses.findIndex(r => r.questionNumber === questionNumber);
    
    if (existingIndex >= 0) {
      const updatedResponses = [...studentResponses];
      updatedResponses[existingIndex].response = response;
      setStudentResponses(updatedResponses);
    } else {
      setStudentResponses([...studentResponses, { questionNumber, response }]);
    }
  };
  
  // Handle evaluate student assessment
  const handleEvaluateAssessment = async () => {
    if (!selectedStudent) {
      toast.error("Please select a student");
      return;
    }
    
    if (studentResponses.length === 0 || studentResponses.some(r => !r.response.trim())) {
      toast.error("Please fill in all student responses");
      return;
    }
    
    const { GEMINI_API_KEY } = getApiKeys();
    if (!GEMINI_API_KEY) {
      toast.error("Gemini API key is required for evaluation. Please set up your API keys.");
      return;
    }
    
    try {
      setAnalyzing(true);
      
      // Start progress simulation
      let progressValue = 0;
      const interval = setInterval(() => {
        progressValue += 5;
        if (progressValue <= 95) {
          setProgress(progressValue);
        }
      }, 300);
      
      // Evaluate the assessment
      const result = await evaluateStudentAssessment(
        selectedStudent.name,
        selectedStudent.id,
        "Computer Science Basics",
        questions,
        studentResponses
      );
      
      // Complete progress
      clearInterval(interval);
      setProgress(100);
      
      // Set the evaluation result
      setEvaluation(result);
      
      setTimeout(() => {
        setAnalyzing(false);
        setShowEvaluateDialog(false);
        
        // Navigate to student report
        navigate(`/student/${selectedStudent.id}/assessment/${result.assessmentId}`);
      }, 500);
      
    } catch (error) {
      console.error("Error evaluating assessment:", error);
      toast.error("Failed to evaluate assessment. Please try again.");
      setAnalyzing(false);
    }
  };
  
  // View student report
  const viewStudentReport = (studentId: string) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div className="container p-6 space-y-8">
      <Tabs defaultValue="new" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between mb-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="new">New Evaluation</TabsTrigger>
            <TabsTrigger value="history">Evaluation History</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="new" className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Upload Panel */}
            <div className="lg:col-span-8 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Upload Assignments</CardTitle>
                      <CardDescription>
                        Upload student assignments or tests for AI analysis
                      </CardDescription>
                    </div>
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex flex-col space-y-2">
                    <div className="flex justify-between">
                      <Button variant="outline" onClick={() => setShowCreateDialog(true)}>
                        Create New Assessment
                      </Button>
                      <Button variant="outline" onClick={() => setShowEvaluateDialog(true)}>
                        Enter Student Responses
                      </Button>
                    </div>
                  </div>
                  <FileUpload
                    accept=".pdf,.doc,.docx,.txt"
                    maxSize={10}
                    maxFiles={50}
                    onFilesSelected={handleFilesSelected}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" disabled={analyzing}>
                    <Settings className="mr-2 h-4 w-4" />
                    Evaluation Settings
                  </Button>
                  <Button onClick={handleAnalyze} disabled={files.length === 0 || analyzing}>
                    {analyzing ? (
                      <>
                        Analyzing...
                        <span className="ml-2">{progress}%</span>
                      </>
                    ) : (
                      <>
                        Analyze Assignments
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {analyzing && (
                <Card className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Analysis Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Progress value={progress} className="h-2" />
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="space-y-1">
                          <div className="text-2xl font-bold">{files.length}</div>
                          <div className="text-xs text-muted-foreground">Files</div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold">{Math.floor(progress / 10)}</div>
                          <div className="text-xs text-muted-foreground">
                            Insights Generated
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="text-2xl font-bold">
                            {Math.floor((progress / 100) * 60)}m
                          </div>
                          <div className="text-xs text-muted-foreground">Time Saved</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-4 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>How It Works</CardTitle>
                    <HelpCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <Upload className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Upload</h4>
                        <p className="text-xs text-muted-foreground">
                          Add student assignments, tests, or worksheets
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <BookOpenCheck className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">AI Analysis</h4>
                        <p className="text-xs text-muted-foreground">
                          Our AI evaluates the work for correctness, patterns, and areas of improvement
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <PieChart className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Insights</h4>
                        <p className="text-xs text-muted-foreground">
                          Receive detailed feedback, class performance data, and suggestions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="rounded-full bg-primary/10 p-2 mt-1">
                        <CheckCircle className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Implement</h4>
                        <p className="text-xs text-muted-foreground">
                          Use the insights to improve teaching and provide personalized feedback
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Privacy & Security</CardTitle>
                    <Lock className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>
                      All uploaded files and student data are processed with the highest security
                      standards.
                    </p>
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>End-to-end encryption</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>FERPA compliant data handling</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>Automatic data purging after 30 days</span>
                      </li>
                      <li className="flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>No data used for AI training</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="animate-fade-in">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Previous Evaluations</CardTitle>
                  <CardDescription>
                    View and revisit your past assignment analyses
                  </CardDescription>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-7 bg-muted p-3 text-xs font-medium">
                  <div className="col-span-2">Assignment</div>
                  <div>Date</div>
                  <div>Class</div>
                  <div className="text-center">Files</div>
                  <div className="text-center">Insights</div>
                  <div className="text-center">Action</div>
                </div>
                <div className="divide-y">
                  {completedAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="grid grid-cols-7 items-center p-3 text-sm hover:bg-accent/50 transition-colors"
                    >
                      <div className="col-span-2 font-medium">{assignment.title}</div>
                      <div className="text-muted-foreground">{assignment.date}</div>
                      <div>{assignment.class}</div>
                      <div className="text-center">{assignment.files}</div>
                      <div className="text-center">{assignment.insights}</div>
                      <div className="text-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-8 px-2"
                          onClick={() => viewStudentReport("S001")}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Create Assessment Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Assessment</DialogTitle>
            <DialogDescription>
              Define your assessment structure and questions
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="assignment-title">Assessment Title</Label>
              <Input 
                id="assignment-title" 
                value={assignmentTitle}
                onChange={e => setAssignmentTitle(e.target.value)}
                placeholder="e.g., Computer Science Midterm Exam"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Questions</h4>
                <Button variant="outline" size="sm" onClick={addQuestion}>
                  Add Question
                </Button>
              </div>
              
              {questions.map((question, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Question {question.number}</h5>
                    <div className="flex items-center space-x-2">
                      <Label htmlFor={`max-score-${index}`} className="text-xs">Max Score:</Label>
                      <Input 
                        id={`max-score-${index}`}
                        type="number"
                        value={question.maxScore}
                        onChange={e => updateQuestionMaxScore(index, parseInt(e.target.value) || 10)}
                        className="w-16 h-8 text-sm"
                        min={1}
                        max={100}
                      />
                    </div>
                  </div>
                  
                  <Textarea 
                    value={question.text}
                    onChange={e => updateQuestionText(index, e.target.value)}
                    placeholder="Enter your question here..."
                    className="min-h-[80px]"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateDialog(false)}>Cancel</Button>
            <Button onClick={handleCreateAssessment}>Create Assessment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Evaluate Student Dialog */}
      <Dialog open={showEvaluateDialog} onOpenChange={setShowEvaluateDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Evaluate Student Responses</DialogTitle>
            <DialogDescription>
              Enter student responses to evaluate their performance
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Student Selection */}
            <div className="space-y-2">
              <Label htmlFor="student-select">Select Student</Label>
              <div className="grid grid-cols-3 gap-2">
                {students.map(student => (
                  <Button
                    key={student.id}
                    variant={selectedStudent?.id === student.id ? "default" : "outline"}
                    className="justify-start"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {student.name}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Questions and Responses */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium">Student Responses</h4>
              
              {questions.map((question, index) => (
                <div key={index} className="border rounded-md p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium">Question {question.number}</h5>
                    <span className="text-xs text-muted-foreground">Max Score: {question.maxScore}</span>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-md text-sm">
                    {question.text || "What are the main functions of an operating system?"}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor={`response-${index}`} className="text-xs">Student Response:</Label>
                    <Textarea 
                      id={`response-${index}`}
                      value={studentResponses.find(r => r.questionNumber === question.number)?.response || ""}
                      onChange={e => updateStudentResponse(question.number, e.target.value)}
                      placeholder="Enter student's answer here..."
                      className="min-h-[80px]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEvaluateDialog(false)} disabled={analyzing}>
              Cancel
            </Button>
            <Button onClick={handleEvaluateAssessment} disabled={analyzing}>
              {analyzing ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Evaluating ({progress}%)
                </>
              ) : (
                <>Evaluate Responses</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignmentEvaluation;

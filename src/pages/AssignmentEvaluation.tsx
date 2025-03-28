import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, FileText, Upload, PieChart, Settings, Lock, CheckCircle, HelpCircle, ChevronRight, BookOpenCheck } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const AssignmentEvaluation = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("new");

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

  // History data for completed assignments
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
                <div className="grid grid-cols-6 bg-muted p-3 text-xs font-medium">
                  <div className="col-span-2">Assignment</div>
                  <div>Date</div>
                  <div>Class</div>
                  <div className="text-center">Files</div>
                  <div className="text-center">Insights</div>
                </div>
                <div className="divide-y">
                  {completedAssignments.map((assignment) => (
                    <div
                      key={assignment.id}
                      className="grid grid-cols-6 items-center p-3 text-sm hover:bg-accent/50 transition-colors cursor-pointer"
                    >
                      <div className="col-span-2 font-medium">{assignment.title}</div>
                      <div className="text-muted-foreground">{assignment.date}</div>
                      <div>{assignment.class}</div>
                      <div className="text-center">{assignment.files}</div>
                      <div className="text-center">{assignment.insights}</div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignmentEvaluation;

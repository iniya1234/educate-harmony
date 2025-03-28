import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Lightbulb, BookOpenCheck, Clock, User, MessageSquare, FileText, Sparkles, BookMarked, ChevronRight } from "lucide-react";

const TeacherAI = () => {
  return (
    <div className="container p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Main Chat Section */}
        <div className="md:col-span-8 space-y-6">
          <Card className="h-[calc(100vh-240px)] flex flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>AI Assistant</CardTitle>
                  <CardDescription>Chat with your AI teaching assistant</CardDescription>
                </div>
                <MessageSquare className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden px-0">
              <ChatInterface />
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-6">
          {/* Quick Prompts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Prompts</CardTitle>
                <Lightbulb className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription>
                Suggested prompts to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                "Create a lesson plan for teaching photosynthesis to 9th graders",
                "Generate 10 quiz questions about World War II for high school students",
                "How can I make my chemistry lab more engaging for students?",
                "Write a rubric for evaluating persuasive essays",
                "Explain a complex algebraic equation in simple terms",
              ].map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 px-3 whitespace-normal"
                >
                  <Sparkles className="h-4 w-4 mr-2 flex-shrink-0" />
                  <span className="text-xs">{prompt}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* AI Capabilities Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>
                Ways the AI can help with your teaching
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="planning">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="planning">Planning</TabsTrigger>
                  <TabsTrigger value="grading">Grading</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>
                
                <TabsContent value="planning" className="space-y-3 pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookOpenCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Lesson Planning</h4>
                      <p className="text-xs text-muted-foreground">
                        Create comprehensive lesson plans with objectives, activities, and assessments
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Scheduling</h4>
                      <p className="text-xs text-muted-foreground">
                        Optimize your teaching schedule and plan effective use of class time
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Differentiation</h4>
                      <p className="text-xs text-muted-foreground">
                        Adapt lesson content for different learning styles and abilities
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="grading" className="space-y-3 pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Assignment Review</h4>
                      <p className="text-xs text-muted-foreground">
                        Quickly analyze student work and generate constructive feedback
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookOpenCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Rubric Creation</h4>
                      <p className="text-xs text-muted-foreground">
                        Design detailed grading rubrics for any assignment type
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookMarked className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Progress Reports</h4>
                      <p className="text-xs text-muted-foreground">
                        Draft comprehensive student progress reports with personalized comments
                      </p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="resources" className="space-y-3 pt-4">
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Resource Creation</h4>
                      <p className="text-xs text-muted-foreground">
                        Generate worksheets, handouts, and supplementary materials for your lessons
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Quiz Generation</h4>
                      <p className="text-xs text-muted-foreground">
                        Create assessments with varied question types tailored to your curriculum
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Lightbulb className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Research Assistance</h4>
                      <p className="text-xs text-muted-foreground">
                        Get help researching topics, finding references, and staying current in your field
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                View All Capabilities <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Conversations */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Conversations</CardTitle>
                <Clock className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  {
                    title: "Photosynthesis Lesson Planning",
                    time: "Yesterday, 3:24 PM",
                    messages: 12,
                  },
                  {
                    title: "Quiz Generation for Algebra",
                    time: "Mar 14, 2:15 PM",
                    messages: 8,
                  },
                  {
                    title: "Student Engagement Strategies",
                    time: "Mar 10, 11:30 AM",
                    messages: 15,
                  },
                ].map((conversation, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-accent/50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageSquare className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">{conversation.title}</h4>
                        <p className="text-xs text-muted-foreground">{conversation.time}</p>
                      </div>
                    </div>
                    <div className="rounded-full bg-muted px-2 py-1 text-xs">
                      {conversation.messages} msgs
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TeacherAI;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, AlertCircle, Calendar, Users, FileText, BrainCog, TrendingUp, File, UserCheck } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="container p-6 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Classes",
            value: "5",
            description: "Active classes",
            icon: Users,
            color: "bg-blue-100 dark:bg-blue-900",
            iconColor: "text-blue-600 dark:text-blue-400",
          },
          {
            title: "Students",
            value: "128",
            description: "Total students",
            icon: UserCheck,
            color: "bg-green-100 dark:bg-green-900",
            iconColor: "text-green-600 dark:text-green-400",
          },
          {
            title: "Assignments",
            value: "24",
            description: "Pending review",
            icon: FileText,
            color: "bg-amber-100 dark:bg-amber-900",
            iconColor: "text-amber-600 dark:text-amber-400",
          },
          {
            title: "AI Sessions",
            value: "42",
            description: "Past 7 days",
            icon: BrainCog,
            color: "bg-purple-100 dark:bg-purple-900",
            iconColor: "text-purple-600 dark:text-purple-400",
          },
        ].map((stat, index) => (
          <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.color}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Col 1 */}
        <div className="space-y-6">
          {/* Upcoming deadlines */}
          <Card className="animate-fade-in">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Tasks requiring your attention soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Physics Quiz Grading",
                  due: "Today",
                  class: "Physics 101",
                  urgent: true,
                },
                {
                  title: "Math Homework Review",
                  due: "Tomorrow",
                  class: "Algebra II",
                  urgent: false,
                },
                {
                  title: "End of Term Reports",
                  due: "3 days",
                  class: "All Classes",
                  urgent: true,
                },
                {
                  title: "Parent-Teacher Conference",
                  due: "1 week",
                  class: "Administrative",
                  urgent: false,
                },
              ].map((task, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 flex items-start justify-between hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-sm">{task.title}</h4>
                      {task.urgent && (
                        <span className="rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 text-[10px] px-2 py-0.5 font-medium">
                          Urgent
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{task.class}</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Due {task.due}</span>
                      </span>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-muted flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Insights Card */}
          <Card className="animate-fade-in" style={{ animationDelay: `100ms` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">AI Insights</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Recent observations from your classes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Concept Mastery Gap",
                  description: "Several students in Algebra II are struggling with quadratic equations.",
                  action: "Generate practice problems",
                  icon: AlertCircle,
                  color: "text-amber-500",
                },
                {
                  title: "Assignment Improvement",
                  description: "Physics 101 quiz scores improved by 18% after implementing suggested feedback.",
                  action: "View detailed analysis",
                  icon: TrendingUp,
                  color: "text-green-500",
                },
                {
                  title: "Student Engagement",
                  description: "Participation has declined in Chemistry during theoretical lessons.",
                  action: "Get engagement ideas",
                  icon: Users,
                  color: "text-blue-500",
                },
              ].map((insight, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-2 hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center space-x-2">
                    <insight.icon className={`h-4 w-4 ${insight.color}`} />
                    <h4 className="font-medium text-sm">{insight.title}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground">{insight.description}</p>
                  <div className="text-primary text-xs font-medium">{insight.action} →</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Col 2 */}
        <div className="space-y-6">
          {/* Recent Assignments */}
          <Card className="animate-fade-in" style={{ animationDelay: `200ms` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Recent Assignments</CardTitle>
                <File className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Recently submitted or graded work</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Forces and Motion Lab Report",
                  class: "Physics 101",
                  submissions: 28,
                  total: 32,
                  status: "Grading in progress",
                  progress: 75,
                },
                {
                  title: "Polynomial Functions Homework",
                  class: "Algebra II",
                  submissions: 18,
                  total: 24,
                  status: "Not started",
                  progress: 0,
                },
                {
                  title: "Chemical Reactions Quiz",
                  class: "Chemistry",
                  submissions: 30,
                  total: 30,
                  status: "Completed",
                  progress: 100,
                },
                {
                  title: "Essay: Modern Literature",
                  class: "English 10",
                  submissions: 22,
                  total: 26,
                  status: "Grading in progress",
                  progress: 40,
                },
              ].map((assignment, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-3 space-y-3 hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">{assignment.title}</h4>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{assignment.class}</span>
                      <span>
                        {assignment.submissions}/{assignment.total} submissions
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className={
                          assignment.progress === 100
                            ? "text-green-500"
                            : assignment.progress === 0
                            ? "text-muted-foreground"
                            : "text-amber-500"
                        }
                      >
                        {assignment.status}
                      </span>
                      <span>{assignment.progress}%</span>
                    </div>
                    <Progress value={assignment.progress} className="h-1" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Time Saved Stats */}
          <Card className="animate-fade-in" style={{ animationDelay: `300ms` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Time Saved with AI</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Hours saved on administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold">14.5</div>
                    <div className="text-xs text-muted-foreground">hours saved this month</div>
                  </div>
                  <div className="h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center text-green-600 dark:text-green-400">
                    <Clock className="h-8 w-8" />
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { task: "Grading & Assessment", hours: 8.2, percentage: 56 },
                    { task: "Lesson Planning", hours: 3.5, percentage: 24 },
                    { task: "Student Feedback", hours: 2.8, percentage: 20 },
                  ].map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span>{item.task}</span>
                        <span className="font-medium">{item.hours} hrs</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Col 3 */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card className="animate-fade-in" style={{ animationDelay: `400ms` }}>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Frequently used tools and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { title: "Evaluate Assignment", icon: FileText, color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" },
                  { title: "Generate Quiz", icon: File, color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400" },
                  { title: "Ask Teacher AI", icon: BrainCog, color: "bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400" },
                  { title: "View Resources", icon: BookOpen, color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400" },
                ].map((action, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 flex flex-col items-center justify-center text-center space-y-2 hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer"
                  >
                    <div className={`p-3 rounded-full ${action.color}`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm font-medium">{action.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Student Engagement */}
          <Card className="animate-fade-in" style={{ animationDelay: `500ms` }}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Student Engagement</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </div>
              <CardDescription>Class participation metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { class: "Physics 101", engagement: 87, trend: "up", students: 32 },
                  { class: "Algebra II", engagement: 72, trend: "down", students: 24 },
                  { class: "Chemistry", engagement: 91, trend: "up", students: 30 },
                  { class: "English 10", engagement: 68, trend: "stable", students: 26 },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-3 space-y-2 hover:border-primary/50 hover:bg-accent/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{item.class}</h4>
                      <div className="flex items-center space-x-1 text-xs">
                        <span>{item.students} students</span>
                        {item.trend === "up" ? (
                          <TrendingUp className="h-3 w-3 text-green-500" />
                        ) : item.trend === "down" ? (
                          <TrendingUp className="h-3 w-3 text-red-500 transform rotate-180" />
                        ) : (
                          <span>→</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-muted-foreground">Engagement score</span>
                        <span
                          className={
                            item.engagement >= 80
                              ? "text-green-500"
                              : item.engagement >= 70
                              ? "text-amber-500"
                              : "text-red-500"
                          }
                        >
                          {item.engagement}/100
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={
                            item.engagement >= 80
                              ? "h-full bg-green-500"
                              : item.engagement >= 70
                              ? "h-full bg-amber-500"
                              : "h-full bg-red-500"
                          }
                          style={{ width: `${item.engagement}%` }}
                        ></div>
                      </div>
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

export default Dashboard;

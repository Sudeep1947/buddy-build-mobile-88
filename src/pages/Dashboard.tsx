import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, AlertCircle, TrendingUp, Users } from "lucide-react";

const Dashboard = () => {
  const summaryCards = [
    {
      title: "Total Schedules",
      value: "12",
      description: "Active timetables",
      icon: Calendar,
      trend: "+2 this month",
    },
    {
      title: "Conflicts",
      value: "3",
      description: "Pending resolution",
      icon: AlertCircle,
      trend: "-5 from last week",
    },
    {
      title: "Utilization Rate",
      value: "87%",
      description: "Room efficiency",
      icon: TrendingUp,
      trend: "+12% improvement",
    },
    {
      title: "Faculty Load",
      value: "94%",
      description: "Average workload",
      icon: Users,
      trend: "Balanced across departments",
    },
  ];

  const recentActivity = [
    { action: "Timetable generated", detail: "Spring 2025 - B.Ed Programme", time: "2 hours ago" },
    { action: "Conflict resolved", detail: "Room allocation overlap fixed", time: "5 hours ago" },
    { action: "Faculty updated", detail: "3 new faculty members added", time: "1 day ago" },
    { action: "Schedule published", detail: "Fall 2024 - FYUP Year 1", time: "2 days ago" },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Overview of your timetable management</p>
          </div>
          <Button size="lg" className="gap-2">
            <Calendar className="h-4 w-4" />
            Generate Timetable
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground">{card.description}</p>
                <p className="text-xs text-accent mt-1">{card.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex flex-col space-y-1 border-b pb-3 last:border-0">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.detail}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and operations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Import Data
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Manage Faculty
              </Button>
              <Button variant="outline" className="w-full justify-start">
                View Reports
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

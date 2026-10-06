import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

type Course = {
  id: string;
  code: string;
  name: string;
  credits: number;
  course_type: string;
  semester: number;
  weekly_hours: number;
  max_students?: number;
};

const Courses = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [coursesData] = useState<Course[]>([
    {
      id: "1",
      code: "CS101",
      name: "Introduction to Programming",
      credits: 4,
      course_type: "theory",
      semester: 1,
      weekly_hours: 4,
      max_students: 60,
    },
    {
      id: "2",
      code: "CS102L",
      name: "Programming Lab",
      credits: 2,
      course_type: "lab",
      semester: 1,
      weekly_hours: 4,
      max_students: 30,
    },
  ]);

  const columns: ColumnDef<Course>[] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Course Name",
    },
    {
      accessorKey: "credits",
      header: "Credits",
    },
    {
      accessorKey: "course_type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("course_type") as string;
        return (
          <Badge variant="outline">
            {type.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "semester",
      header: "Semester",
    },
    {
      accessorKey: "weekly_hours",
      header: "Hours/Week",
    },
    {
      accessorKey: "max_students",
      header: "Max Students",
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold">Course Management</h1>
            <p className="text-muted-foreground">
              Manage courses and their requirements
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Enter the details of the new course
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Course Code</Label>
                    <Input id="code" placeholder="CS101" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Course Name</Label>
                    <Input id="name" placeholder="Introduction to Programming" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="credits">Credits</Label>
                    <Input id="credits" type="number" placeholder="4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Course Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="theory">Theory</SelectItem>
                        <SelectItem value="practical">Practical</SelectItem>
                        <SelectItem value="lab">Lab</SelectItem>
                        <SelectItem value="seminar">Seminar</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <Input id="semester" type="number" placeholder="1" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weeklyHours">Weekly Hours</Label>
                    <Input id="weeklyHours" type="number" placeholder="4" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxStudents">Max Students</Label>
                    <Input id="maxStudents" type="number" placeholder="60" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Course description..." rows={3} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Course</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          columns={columns}
          data={coursesData}
          searchPlaceholder="Search courses..."
        />
      </div>
    </MainLayout>
  );
};

export default Courses;

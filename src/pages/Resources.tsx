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
import { Switch } from "@/components/ui/switch";

type Resource = {
  id: string;
  code: string;
  name: string;
  resource_type: string;
  capacity: number;
  building: string;
  floor: number;
  is_available: boolean;
};

const Resources = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [resourcesData] = useState<Resource[]>([
    {
      id: "1",
      code: "R101",
      name: "Lecture Hall A",
      resource_type: "classroom",
      capacity: 100,
      building: "Main Building",
      floor: 1,
      is_available: true,
    },
    {
      id: "2",
      code: "LAB201",
      name: "Computer Lab 1",
      resource_type: "laboratory",
      capacity: 40,
      building: "CS Department",
      floor: 2,
      is_available: true,
    },
  ]);

  const columns: ColumnDef<Resource>[] = [
    {
      accessorKey: "code",
      header: "Code",
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "resource_type",
      header: "Type",
      cell: ({ row }) => {
        const type = row.getValue("resource_type") as string;
        return (
          <Badge variant="secondary">
            {type.replace(/_/g, " ").toUpperCase()}
          </Badge>
        );
      },
    },
    {
      accessorKey: "capacity",
      header: "Capacity",
    },
    {
      accessorKey: "building",
      header: "Building",
    },
    {
      accessorKey: "floor",
      header: "Floor",
    },
    {
      accessorKey: "is_available",
      header: "Status",
      cell: ({ row }) => {
        const available = row.getValue("is_available") as boolean;
        return (
          <Badge variant={available ? "default" : "destructive"}>
            {available ? "Available" : "Unavailable"}
          </Badge>
        );
      },
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
            <h1 className="text-3xl font-heading font-bold">Resource Management</h1>
            <p className="text-muted-foreground">
              Manage rooms and facilities
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Resource</DialogTitle>
                <DialogDescription>
                  Enter the details of the new room or facility
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Resource Code</Label>
                    <Input id="code" placeholder="R101" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Lecture Hall A" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="type">Resource Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classroom">Classroom</SelectItem>
                        <SelectItem value="laboratory">Laboratory</SelectItem>
                        <SelectItem value="auditorium">Auditorium</SelectItem>
                        <SelectItem value="seminar_hall">Seminar Hall</SelectItem>
                        <SelectItem value="library">Library</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capacity">Capacity</Label>
                    <Input id="capacity" type="number" placeholder="100" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="building">Building</Label>
                    <Input id="building" placeholder="Main Building" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input id="floor" type="number" placeholder="1" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="available">Available for Booking</Label>
                  <Switch id="available" defaultChecked />
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Add Resource</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <DataTable
          columns={columns}
          data={resourcesData}
          searchPlaceholder="Search resources..."
        />
      </div>
    </MainLayout>
  );
};

export default Resources;

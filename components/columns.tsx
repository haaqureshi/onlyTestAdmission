"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export type Lead = {
  id: string;
  name: string;
  dob: string;
  phone: string;
  education: string;
  email: string;
  source: string;
  program: string;
  status: string;
};

export const columns: ColumnDef<Lead>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "dob",
    header: "Date of Birth",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "education",
    header: "Education",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "source",
    header: "Source",
    cell: ({ row }) => (
      <Badge variant="secondary">{row.getValue("source")}</Badge>
    ),
  },
  {
    accessorKey: "program",
    header: "Program",
    cell: ({ row }) => (
      <Badge variant="outline">{row.getValue("program")}</Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const getStatusColor = (status: string): "secondary" | "warning" | "success" | "default" | "destructive" => {
        const colors: Record<string, "secondary" | "warning" | "success" | "default" | "destructive"> = {
          "No Contact": "secondary",
          "Thinking": "warning",
          "Interested": "success",
          "Next Session": "default",
          "Won": "success",
          "Not Interested": "destructive",
          "Not Affordable": "default",
        };
        return colors[status] || "default";
      };

      return <Badge variant={getStatusColor(status)}>{status}</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Edit Lead
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
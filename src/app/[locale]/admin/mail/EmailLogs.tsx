"use client";

import { api } from "~/trpc/react";
import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "~/components/ui/data-table";
import { Badge } from "~/components/ui/badge";
import { Spinner } from "~/components/ui/spinner";

interface EmailLog {
  id: string;
  to: string;
  subject: string;
  status: string;
  createdAt: Date;
}

const columns: ColumnDef<EmailLog>[] = [
  {
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleString();
    },
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge variant={status === "success" ? "success" : "destructive"}>
          {status}
        </Badge>
      );
    },
  },
];

export default function EmailLogs() {
  const { data: logs, isLoading } = api.email.getLogs.useQuery();

  if (isLoading) {
    return (
      <div className="flex h-48 items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return <DataTable columns={columns} data={logs ?? []} />;
}

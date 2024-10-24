"use client";

import { useState } from "react";
import { api } from "~/trpc/react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import FloatingLabelInput from "~/components/ui/floating-label-input";
import FloatingLabelTextarea from "~/components/ui/floating-label-textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "react-hot-toast";
import { Badge } from "~/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Trash2, Edit2, Plus, Power } from "lucide-react";
import { CronPatterns, describeCronSchedule } from "~/utils/cronUtils";

export default function EmailSchedules() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    templateId: "",
    groupId: "",
    cronExpression: CronPatterns.EVERY_DAY_MIDNIGHT as string,
  });

  const utils = api.useUtils();
  const { data: schedules, isLoading: loadingSchedules } =
    api.emailGroup.getSchedules.useQuery();
  const { data: templates } = api.email.getTemplates.useQuery();
  const { data: groups } = api.emailGroup.getGroups.useQuery();

  const createMutation = api.emailGroup.createSchedule.useMutation({
    onSuccess: () => {
      toast.success("Schedule created successfully");
      void utils.emailGroup.getSchedules.invalidate();
      setIsCreating(false);
      setFormData({
        name: "",
        description: "",
        templateId: "",
        groupId: "",
        cronExpression: CronPatterns.EVERY_DAY_MIDNIGHT as string,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = api.emailGroup.updateSchedule.useMutation({
    onSuccess: () => {
      toast.success("Schedule updated successfully");
      void utils.emailGroup.getSchedules.invalidate();
      setEditingSchedule(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const toggleMutation = api.emailGroup.toggleSchedule.useMutation({
    onSuccess: () => {
      void utils.emailGroup.getSchedules.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = api.emailGroup.deleteSchedule.useMutation({
    onSuccess: () => {
      toast.success("Schedule deleted successfully");
      void utils.emailGroup.getSchedules.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingSchedule) {
      updateMutation.mutate({
        id: editingSchedule,
        ...formData,
        isActive: true,
      });
    } else {
      createMutation.mutate({
        ...formData,
        isActive: true,
      });
    }
  };

  if (loadingSchedules) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setIsCreating(!isCreating);
          setEditingSchedule(null);
          setFormData({
            name: "",
            description: "",
            templateId: "",
            groupId: "",
            cronExpression: CronPatterns.EVERY_DAY_MIDNIGHT as string,
          });
        }}
      >
        {isCreating ? (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            Cancel
          </>
        ) : (
          <>
            <Plus className="mr-2 h-4 w-4" />
            Create Schedule
          </>
        )}
      </Button>

      {(isCreating || editingSchedule) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingSchedule ? "Edit Schedule" : "New Email Schedule"}
            </CardTitle>
            <CardDescription>
              {editingSchedule
                ? "Edit your email schedule"
                : "Create a new email schedule"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <FloatingLabelInput
                id="name"
                label="Schedule Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <FloatingLabelTextarea
                id="description"
                label="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <Select
                value={formData.templateId}
                onValueChange={(value) =>
                  setFormData({ ...formData, templateId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Template" />
                </SelectTrigger>
                <SelectContent>
                  {templates?.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.groupId}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    groupId: value === "none" ? "" : value,
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Group (Optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Group</SelectItem>
                  {groups?.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={formData.cronExpression}
                onValueChange={(
                  value: (typeof CronPatterns)[keyof typeof CronPatterns],
                ) => setFormData({ ...formData, cronExpression: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Schedule" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(CronPatterns)
                    .filter(([key, value]) =>
                      process.env.VERCEL === "1" || 1
                        ? value.startsWith("0 0")
                        : true,
                    )
                    .map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {describeCronSchedule(value)}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full">
                {editingSchedule ? "Update Schedule" : "Create Schedule"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Email Schedules</CardTitle>
          <CardDescription>Manage your email schedules</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Template</TableHead>
                <TableHead>Group</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Next Run</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schedules?.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.name}</TableCell>
                  <TableCell>{schedule.template.name}</TableCell>
                  <TableCell>
                    {schedule.group ? (
                      <Badge variant="secondary">{schedule.group.name}</Badge>
                    ) : (
                      "—"
                    )}
                  </TableCell>
                  <TableCell>
                    {describeCronSchedule(schedule.cronExpression)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={schedule.isActive ? "success" : "secondary"}
                    >
                      {schedule.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {schedule.nextRun
                      ? new Date(schedule.nextRun).toLocaleString()
                      : "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          toggleMutation.mutate({
                            id: schedule.id,
                            isActive: !schedule.isActive,
                          });
                        }}
                      >
                        <Power
                          className={`h-4 w-4 ${
                            schedule.isActive
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingSchedule(schedule.id);
                          setIsCreating(false);
                          setFormData({
                            name: schedule.name,
                            description: schedule.description ?? "",
                            templateId: schedule.templateId,
                            groupId: schedule.groupId ?? "",
                            cronExpression: schedule.cronExpression,
                          });
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you want to delete this schedule?",
                            )
                          ) {
                            deleteMutation.mutate({ id: schedule.id });
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

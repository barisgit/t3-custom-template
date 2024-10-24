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
import { Trash2, Edit2, Plus } from "lucide-react";

export default function EmailGroups() {
  const [isCreating, setIsCreating] = useState(false);
  const [editingGroup, setEditingGroup] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: "",
  });

  const utils = api.useUtils();
  const { data: groups, isLoading } = api.emailGroup.getGroups.useQuery();

  const createMutation = api.emailGroup.createGroup.useMutation({
    onSuccess: () => {
      toast.success("Group created successfully");
      void utils.emailGroup.getGroups.invalidate();
      setIsCreating(false);
      setFormData({ name: "", description: "", members: "" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateMutation = api.emailGroup.updateGroup.useMutation({
    onSuccess: () => {
      toast.success("Group updated successfully");
      void utils.emailGroup.getGroups.invalidate();
      setEditingGroup(null);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteMutation = api.emailGroup.deleteGroup.useMutation({
    onSuccess: () => {
      toast.success("Group deleted successfully");
      void utils.emailGroup.getGroups.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const members = formData.members
      .split(",")
      .map((email) => email.trim())
      .filter((email) => email);

    if (editingGroup) {
      updateMutation.mutate({
        id: editingGroup,
        name: formData.name,
        description: formData.description,
        members,
      });
    } else {
      createMutation.mutate({
        name: formData.name,
        description: formData.description,
        members,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Button
        onClick={() => {
          setIsCreating(!isCreating);
          setEditingGroup(null);
          setFormData({ name: "", description: "", members: "" });
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
            Create Group
          </>
        )}
      </Button>

      {(isCreating || editingGroup) && (
        <Card>
          <CardHeader>
            <CardTitle>
              {editingGroup ? "Edit Group" : "New Email Group"}
            </CardTitle>
            <CardDescription>
              {editingGroup
                ? "Edit your email group details"
                : "Create a new email group"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <FloatingLabelInput
                  id="name"
                  label="Group Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div>
                <FloatingLabelTextarea
                  id="description"
                  label="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
              <div>
                <FloatingLabelTextarea
                  id="members"
                  label="Email addresses (comma-separated)"
                  value={formData.members}
                  onChange={(e) =>
                    setFormData({ ...formData, members: e.target.value })
                  }
                />
              </div>
              <Button type="submit" className="w-full">
                {editingGroup ? "Update Group" : "Create Group"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Email Groups</CardTitle>
          <CardDescription>Manage your email groups</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Members</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groups?.map((group) => (
                <TableRow key={group.id}>
                  <TableCell>{group.name}</TableCell>
                  <TableCell>{group.description}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {group.members.map((email) => (
                        <Badge key={email} variant="secondary">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingGroup(group.id);
                          setIsCreating(false);
                          setFormData({
                            name: group.name,
                            description: group.description ?? "",
                            members: group.members.join(", "),
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
                              "Are you sure you want to delete this group?",
                            )
                          ) {
                            deleteMutation.mutate({ id: group.id });
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

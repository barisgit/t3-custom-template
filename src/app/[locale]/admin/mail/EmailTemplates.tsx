"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/trpc/react";
import LabelTextarea from "~/components/ui/floating-label-textarea";
import BoxFloatingLabelInput from "~/components/ui/floating-label-input";
import { toast } from "react-hot-toast";
import { useAppDispatch } from "~/redux/hooks";
import { setSelectedTemplate } from "~/redux/features/emailSlice";
import { type EmailTemplate } from "~/redux/features/emailSlice";

interface EmailTemplatesProps {
  onUseTemplate: () => void;
}

export default function EmailTemplates({ onUseTemplate }: EmailTemplatesProps) {
  const dispatch = useAppDispatch();
  const [isCreating, setIsCreating] = useState(false);
  const [template, setTemplate] = useState({
    name: "",
    subject: "",
    text: "",
    html: "",
  });

  const utils = api.useUtils();
  const { data: templates, isLoading } = api.email.getTemplates.useQuery();

  const createTemplate = api.email.createTemplate.useMutation({
    onSuccess: () => {
      toast.success("Template created successfully");
      setIsCreating(false);
      setTemplate({ name: "", subject: "", text: "", html: "" });
      void utils.email.getTemplates.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteTemplate = api.email.deleteTemplate.useMutation({
    onSuccess: () => {
      toast.success("Template deleted successfully");
      void utils.email.getTemplates.invalidate();
    },
  });

  const handleUseTemplate = (template: EmailTemplate) => {
    dispatch(setSelectedTemplate(template));
    onUseTemplate(); // This will switch to the send tab
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => setIsCreating(!isCreating)}>
        {isCreating ? "Cancel" : "Create Template"}
      </Button>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>New Template</CardTitle>
            <CardDescription>Create a new email template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <BoxFloatingLabelInput
              id="templateName"
              label="Template Name"
              value={template.name}
              onChange={(e) =>
                setTemplate({ ...template, name: e.target.value })
              }
              backgroundClass="bg-background-paper"
            />
            <LabelTextarea
              id="subject"
              label="Subject"
              value={template.subject}
              onChange={(e) =>
                setTemplate({ ...template, subject: e.target.value })
              }
              rows={1}
              backgroundClass="bg-background-paper"
            />
            <LabelTextarea
              id="text"
              label="Text Content"
              value={template.text}
              onChange={(e) =>
                setTemplate({ ...template, text: e.target.value })
              }
              rows={4}
              backgroundClass="bg-background-paper"
            />
            <LabelTextarea
              id="html"
              label="HTML Content"
              value={template.html}
              onChange={(e) =>
                setTemplate({ ...template, html: e.target.value })
              }
              rows={4}
              backgroundClass="bg-background-paper"
            />
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => createTemplate.mutate(template)}
              disabled={createTemplate.isPending}
            >
              {createTemplate.isPending ? "Creating..." : "Create Template"}
            </Button>
          </CardFooter>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates?.map((template) => (
          <Card key={template.id}>
            <CardHeader>
              <CardTitle>{template.name}</CardTitle>
              <CardDescription>
                Created: {new Date(template.createdAt).toLocaleDateString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="font-semibold">Subject:</p>
              <p className="mb-2">{template.subject}</p>
              <p className="font-semibold">Text Content:</p>
              <p className="line-clamp-3">{template.text}</p>
            </CardContent>
            <CardFooter className="justify-between">
              <Button
                variant="outlined"
                onClick={() => handleUseTemplate(template as EmailTemplate)}
              >
                Use Template
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteTemplate.mutate({ id: template.id })}
                disabled={deleteTemplate.isPending}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import LabelTextarea from "~/components/ui/floating-label-textarea";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import { useAppSelector } from "~/redux/hooks";

export default function MailForm() {
  const selectedTemplate = useAppSelector(
    (state) => state.email.selectedTemplate,
  );
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    text: "",
    html: "",
  });

  // Update form when template is selected
  useEffect(() => {
    if (selectedTemplate) {
      setFormData((prev) => ({
        ...prev,
        subject: selectedTemplate.subject,
        text: selectedTemplate.text,
        html: selectedTemplate.html ?? "",
      }));
      toast.success("Template loaded!");
    }
  }, [selectedTemplate]);

  const emailMutation = api.email.send.useMutation({
    onSuccess: () => {
      toast.success("Email sent successfully!");
      setFormData({ to: "", subject: "", text: "", html: "" });
    },
    onError: (error) => {
      toast.error(error.message ?? "Failed to send email");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await emailMutation.mutateAsync(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <LabelTextarea
          id="to"
          label="To Email"
          value={formData.to}
          onChange={(e) => setFormData({ ...formData, to: e.target.value })}
          rows={1}
        />
      </div>

      <div>
        <LabelTextarea
          id="subject"
          label="Subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData({ ...formData, subject: e.target.value })
          }
          rows={1}
        />
      </div>

      <div>
        <LabelTextarea
          id="text"
          label="Text Content"
          value={formData.text}
          onChange={(e) => setFormData({ ...formData, text: e.target.value })}
          rows={4}
        />
      </div>

      <div>
        <LabelTextarea
          id="html"
          label="HTML Content (optional)"
          value={formData.html}
          onChange={(e) => setFormData({ ...formData, html: e.target.value })}
          rows={4}
        />
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={emailMutation.isPending}
      >
        {emailMutation.isPending ? "Sending..." : "Send Email"}
      </Button>
    </form>
  );
}

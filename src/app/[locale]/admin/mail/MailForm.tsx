"use client";

import { useState } from "react";
import { Button } from "~/components/ui/button";
import LabelTextarea from "~/components/ui/floating-label-textarea";
import { api } from "~/trpc/react";

export default function MailForm() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    text: "",
    html: "",
  });
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const emailMutation = api.email.send.useMutation({
    onSuccess: () => {
      setStatus({
        type: "success",
        message: "Email sent successfully!",
      });
      setFormData({ to: "", subject: "", text: "", html: "" });
    },
    onError: (error) => {
      setStatus({
        type: "error",
        message: error.message ?? "Failed to send email",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    try {
      await emailMutation.mutateAsync(formData);
    } catch (error) {
      // Error handling is done in onError callback
      console.error("Error in form submission:", error);
    }
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

      {status.message && (
        <div
          className={`rounded-md p-4 ${
            status.type === "success"
              ? "bg-success-50 text-success-900"
              : "bg-error-50 text-error-900"
          }`}
        >
          {status.message}
        </div>
      )}

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

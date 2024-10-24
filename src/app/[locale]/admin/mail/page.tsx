"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useTranslations } from "next-intl";
import MailForm from "./MailForm";
import EmailTemplates from "./EmailTemplates";
import EmailLogs from "./EmailLogs";
import { useState } from "react";

export default function MailPage() {
  const t = useTranslations("admin");
  const [activeTab, setActiveTab] = useState("send");

  return (
    <div className="container mx-auto mt-24 max-w-6xl p-4">
      <h1 className="mb-8 text-3xl font-bold">{t("mail.title")}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="send">Send Email</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="logs">Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <MailForm />
        </TabsContent>

        <TabsContent value="templates">
          <EmailTemplates onUseTemplate={() => setActiveTab("send")} />
        </TabsContent>

        <TabsContent value="logs">
          <EmailLogs />
        </TabsContent>
      </Tabs>
    </div>
  );
}

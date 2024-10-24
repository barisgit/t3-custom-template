// import { type NextRequest } from "next/server";
// import { db } from "~/server/db";
// import { verifyMailgunWebhook } from "~/utils/mailgun";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();

//     // Verify webhook signature
//     if (!(await verifyMailgunWebhook(req))) {
//       return new Response("Invalid signature", { status: 401 });
//     }

//     // Process the incoming email
//     const incomingEmail = {
//       from: formData.get("sender") as string,
//       to: formData.get("recipient") as string,
//       subject: formData.get("subject") as string,
//       text: formData.get("body-plain") as string,
//       html: formData.get("body-html") as string,
//       headers: JSON.parse(formData.get("message-headers") as string) as Record<
//         string,
//         string
//       >,
//       attachments: formData.getAll("attachment-[1-9]+").map((file) => ({
//         filename: file.name,
//         contentType: file.type,
//         size: file.size,
//       })),
//     };

//     // Store in database
//     await db.incomingEmail.create({
//       data: {
//         ...incomingEmail,
//         status: "processed",
//       },
//     });

//     return new Response("OK", { status: 200 });
//   } catch (error) {
//     console.error("Error processing incoming email:", error);
//     return new Response("Internal Server Error", { status: 500 });
//   }
// }

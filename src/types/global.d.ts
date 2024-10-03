export type Messages = Record<string, string>; // Adjust based on your JSON structure

export type User = {
  id: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN"; // Adjust these roles as needed
  email: string;
  firstName: string | null;
  lastName: string | null;
  // Add other fields you need, but be cautious about including sensitive information
};

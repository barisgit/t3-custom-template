export type Messages = Record<string, string>; // Adjust based on your JSON structure

export type User = {
  id: string;
  role: "USER" | "ADMIN" | "SUPER_ADMIN"; // Adjust these roles as needed
  email: string;
  firstName: string | null;
  lastName: string | null;
  // Add other fields you need, but be cautious about including sensitive information
};

export type Appearance = {
  baseTheme?: undefined;
  variables?: {
    colorPrimary: string;
    colorDanger: string;
    colorSuccess: string;
    colorWarning: string;
    colorNeutral: string;
    colorText: string;
    colorTextOnPrimaryBackground: string;
    colorTextSecondary: string;
    colorBackground: string;
    colorInputText: string;
    colorInputBackground: string;
    colorShimmer: string;
    fontFamily: string;
    fontFamilyButtons: string;
    fontSize: string;
    fontWeight: {
      normal: number;
      medium: number;
      semibold: number;
      bold: number;
    };
    borderRadius: string;
    spacingUnit: string;
  };
  elements?: {
    formButtonPrimary: string;
    card: string;
    headerTitle: string;
    headerSubtitle: string;
    socialButtonsBlockButton: string;
    formFieldLabel: string;
    formFieldInput: string;
    footerActionLink: string;
    userPreviewSecondaryIdentifier: string;
  };
};

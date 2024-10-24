import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  text: string;
  html?: string;
  createdAt: Date;
}

interface EmailState {
  selectedTemplate: EmailTemplate | null;
  templates: EmailTemplate[];
}

const initialState: EmailState = {
  selectedTemplate: null,
  templates: [],
};

export const emailSlice = createSlice({
  name: "email",
  initialState,
  reducers: {
    setSelectedTemplate: (
      state,
      action: PayloadAction<EmailTemplate | null>,
    ) => {
      state.selectedTemplate = action.payload;
    },
    setTemplates: (state, action: PayloadAction<EmailTemplate[]>) => {
      state.templates = action.payload;
    },
  },
});

export const { setSelectedTemplate, setTemplates } = emailSlice.actions;
export default emailSlice.reducer;

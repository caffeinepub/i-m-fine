// Types for AI friend responses
export interface AssistantResponse {
  message: string;
  suggestedActions?: SuggestedAction[];
  deepLinks?: DeepLink[];
}

export interface SuggestedAction {
  label: string;
  description: string;
}

export interface DeepLink {
  label: string;
  route: string;
  description: string;
}

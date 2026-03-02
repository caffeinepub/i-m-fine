// Safety and consent messaging for the AI friend assistant
export const SAFETY_MESSAGES = {
  en: {
    disclaimer: "I'm here to support and guide you, but I'm not a licensed therapist or medical professional. I can't diagnose conditions or prescribe treatment. For clinical support, please reach out to a licensed mental health professional.",
    crisisNote: "If you're in crisis or experiencing thoughts of self-harm, please reach out immediately:",
    crisisAction: "View Crisis Resources",
    activeIndicator: "Your assistant",
    placeholder: "Ask me anything...",
    sendButton: "Send",
    suggestButton: "Send Suggestion",
    closeButton: "Close",
  },
  es: {
    disclaimer: "Estoy aquí para apoyarte y guiarte, pero no soy un terapeuta licenciado ni un profesional médico. No puedo diagnosticar condiciones ni recetar tratamiento. Para apoyo clínico, comunícate con un profesional de salud mental licenciado.",
    crisisNote: "Si estás en crisis o experimentas pensamientos de autolesión, comunícate de inmediato:",
    crisisAction: "Ver Recursos de Crisis",
    activeIndicator: "Tu asistente",
    placeholder: "Pregúntame lo que quieras...",
    sendButton: "Enviar",
    suggestButton: "Enviar Sugerencia",
    closeButton: "Cerrar",
  },
};

export type Language = keyof typeof SAFETY_MESSAGES;

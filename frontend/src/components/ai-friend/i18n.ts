import { Language, SAFETY_MESSAGES } from './safetyMessages';

// Minimal i18n dictionary for AI friend
export const AI_FRIEND_I18N = {
  en: {
    ...SAFETY_MESSAGES.en,
    greeting: "Hi! I'm Seth, here to support you on your healing journey. How can I help you today?",
    toolsPrompt: "Would you like to explore our calming tools like breathing exercises or grounding techniques?",
    journalPrompt: "Journaling can help process your thoughts and feelings. Would you like to start a journal entry?",
    resourcesPrompt: "I can guide you to helpful resources, worksheets, and educational materials.",
    communityPrompt: "Looking for support? I can show you safe community resources and guidance.",
    moodPrompt: "How are you feeling today? Checking in with your mood can help track your progress.",
    unknownResponse: "I'm here to help! You can ask me about our tools, resources, journaling, mood tracking, or community support. What would you like to explore?",
  },
  es: {
    ...SAFETY_MESSAGES.es,
    greeting: "¡Hola! Soy Seth, aquí para apoyarte en tu camino de sanación. ¿Cómo puedo ayudarte hoy?",
    toolsPrompt: "¿Te gustaría explorar nuestras herramientas calmantes como ejercicios de respiración o técnicas de conexión a tierra?",
    journalPrompt: "Escribir en un diario puede ayudar a procesar tus pensamientos y sentimientos. ¿Te gustaría comenzar una entrada de diario?",
    resourcesPrompt: "Puedo guiarte a recursos útiles, hojas de trabajo y materiales educativos.",
    communityPrompt: "¿Buscas apoyo? Puedo mostrarte recursos comunitarios seguros y orientación.",
    moodPrompt: "¿Cómo te sientes hoy? Registrar tu estado de ánimo puede ayudar a seguir tu progreso.",
    unknownResponse: "¡Estoy aquí para ayudar! Puedes preguntarme sobre nuestras herramientas, recursos, diario, seguimiento del estado de ánimo o apoyo comunitario. ¿Qué te gustaría explorar?",
  },
};

export function getTranslation(language: Language, key: keyof typeof AI_FRIEND_I18N.en): string {
  return AI_FRIEND_I18N[language]?.[key] || AI_FRIEND_I18N.en[key];
}

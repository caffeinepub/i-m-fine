import { AssistantResponse, DeepLink, SuggestedAction } from './responseTypes';
import { detectCrisis, getCrisisResponse } from './crisisDetection';
import { getTranslation } from './i18n';
import { Language } from './safetyMessages';

// Deterministic response logic based on user input
export function generateResponse(input: string, language: Language): AssistantResponse {
  const lowerInput = input.toLowerCase();

  // Crisis detection first
  if (detectCrisis(input)) {
    return {
      message: getCrisisResponse(language),
      deepLinks: [
        {
          label: language === 'es' ? 'Recursos de Crisis' : 'Crisis Resources',
          route: 'links',
          description: language === 'es' ? 'Líneas directas y recursos de emergencia' : 'Hotlines and emergency resources',
        },
        {
          label: language === 'es' ? 'Recursos Comunitarios' : 'Community Resources',
          route: 'community',
          description: language === 'es' ? 'Encontrar apoyo seguro' : 'Find safe support',
        },
      ],
    };
  }

  // Greeting detection
  if (lowerInput.match(/\b(hi|hello|hey|hola|buenos días|buenas tardes)\b/)) {
    return {
      message: getTranslation(language, 'greeting'),
      suggestedActions: [
        {
          label: language === 'es' ? 'Explorar Herramientas' : 'Explore Tools',
          description: language === 'es' ? 'Ejercicios de respiración, conexión a tierra y más' : 'Breathing exercises, grounding, and more',
        },
        {
          label: language === 'es' ? 'Ver Recursos' : 'View Resources',
          description: language === 'es' ? 'Hojas de trabajo y guías' : 'Worksheets and guides',
        },
      ],
      deepLinks: [
        { label: language === 'es' ? 'Herramientas' : 'Tools', route: 'tools', description: '' },
        { label: language === 'es' ? 'Recursos' : 'Resources', route: 'resources', description: '' },
      ],
    };
  }

  // Tools-related queries
  if (lowerInput.match(/\b(tool|breathing|grounding|exercise|calm|relax|anxiety|herramienta|respiración|calma|relajar|ansiedad)\b/)) {
    return {
      message: getTranslation(language, 'toolsPrompt'),
      suggestedActions: [
        {
          label: language === 'es' ? 'Ejercicio de Respiración' : 'Breathing Exercise',
          description: language === 'es' ? 'Calma tu sistema nervioso' : 'Calm your nervous system',
        },
        {
          label: language === 'es' ? 'Técnica de Conexión a Tierra 5-4-3-2-1' : '5-4-3-2-1 Grounding',
          description: language === 'es' ? 'Conéctate con el presente' : 'Connect with the present',
        },
      ],
      deepLinks: [
        { label: language === 'es' ? 'Ver Todas las Herramientas' : 'View All Tools', route: 'tools', description: '' },
      ],
    };
  }

  // Journal-related queries
  if (lowerInput.match(/\b(journal|write|writing|thoughts|feelings|diario|escribir|pensamientos|sentimientos)\b/)) {
    return {
      message: getTranslation(language, 'journalPrompt'),
      suggestedActions: [
        {
          label: language === 'es' ? 'Comenzar a Escribir' : 'Start Writing',
          description: language === 'es' ? 'Procesa tus pensamientos de forma segura' : 'Process your thoughts safely',
        },
      ],
      deepLinks: [
        { label: language === 'es' ? 'Ir al Diario' : 'Go to Journal', route: 'dashboard', description: '' },
      ],
    };
  }

  // Resources-related queries
  if (lowerInput.match(/\b(resource|worksheet|guide|pdf|learn|education|recurso|hoja de trabajo|guía|aprender|educación)\b/)) {
    return {
      message: getTranslation(language, 'resourcesPrompt'),
      deepLinks: [
        { label: language === 'es' ? 'Recursos y PDFs' : 'Resources & PDFs', route: 'resources', description: '' },
        { label: language === 'es' ? 'Videos y Música' : 'Videos & Music', route: 'videos', description: '' },
      ],
    };
  }

  // Community/support queries
  if (lowerInput.match(/\b(support|community|help|group|talk|comunidad|apoyo|ayuda|grupo|hablar)\b/)) {
    return {
      message: getTranslation(language, 'communityPrompt'),
      deepLinks: [
        { label: language === 'es' ? 'Recursos Comunitarios' : 'Community Resources', route: 'community', description: '' },
        { label: language === 'es' ? 'Enlaces Útiles' : 'Helpful Links', route: 'links', description: '' },
      ],
    };
  }

  // Mood/feeling queries
  if (lowerInput.match(/\b(mood|feeling|feel|sad|happy|depressed|anxious|estado de ánimo|sentir|triste|feliz|deprimido|ansioso)\b/)) {
    return {
      message: getTranslation(language, 'moodPrompt'),
      deepLinks: [
        { label: language === 'es' ? 'Registrar Estado de Ánimo' : 'Check Mood', route: 'dashboard', description: '' },
      ],
    };
  }

  // Default response
  return {
    message: getTranslation(language, 'unknownResponse'),
    suggestedActions: [
      {
        label: language === 'es' ? 'Explorar Herramientas' : 'Explore Tools',
        description: language === 'es' ? 'Ejercicios calmantes' : 'Calming exercises',
      },
      {
        label: language === 'es' ? 'Ver Recursos' : 'View Resources',
        description: language === 'es' ? 'Materiales útiles' : 'Helpful materials',
      },
    ],
    deepLinks: [
      { label: language === 'es' ? 'Panel de Control' : 'Dashboard', route: 'dashboard', description: '' },
      { label: language === 'es' ? 'Herramientas' : 'Tools', route: 'tools', description: '' },
      { label: language === 'es' ? 'Recursos' : 'Resources', route: 'resources', description: '' },
    ],
  };
}

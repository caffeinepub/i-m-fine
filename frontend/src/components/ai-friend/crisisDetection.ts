// Deterministic crisis keyword detection
const CRISIS_KEYWORDS = [
  'suicide', 'suicidal', 'kill myself', 'end my life', 'want to die',
  'self-harm', 'self harm', 'hurt myself', 'cutting', 'overdose',
  'no reason to live', 'better off dead', 'can\'t go on',
  'suicidio', 'suicida', 'matarme', 'terminar mi vida', 'quiero morir',
  'autolesión', 'hacerme daño', 'cortarme', 'sobredosis',
];

export function detectCrisis(input: string): boolean {
  const lowerInput = input.toLowerCase();
  return CRISIS_KEYWORDS.some(keyword => lowerInput.includes(keyword));
}

export function getCrisisResponse(language: 'en' | 'es'): string {
  if (language === 'es') {
    return 'Entiendo que estás pasando por un momento muy difícil. Tu seguridad es lo más importante. Por favor, comunícate con recursos de crisis de inmediato. No estás solo/a, y hay personas capacitadas disponibles para ayudarte ahora mismo.';
  }
  return 'I understand you\'re going through an incredibly difficult time. Your safety is the most important thing right now. Please reach out to crisis resources immediately. You\'re not alone, and there are trained people available to help you right now.';
}

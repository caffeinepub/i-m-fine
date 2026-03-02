import { useState } from 'react';
import { X, Send, Globe, AlertCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import GreenButton from '../GreenButton';
import { AI_FRIEND_ASSETS } from './aiFriendAssets';
import { SAFETY_MESSAGES, Language } from './safetyMessages';
import { generateResponse } from './aiFriendResponder';
import { AssistantResponse } from './responseTypes';
import { useSubmitProductSuggestion } from '../../hooks/useProductSuggestions';

interface AIFriendPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  response?: AssistantResponse;
}

export default function AIFriendPanel({ isOpen, onClose }: AIFriendPanelProps) {
  const [language, setLanguage] = useState<Language>('en');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestionForm, setShowSuggestionForm] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const submitSuggestion = useSubmitProductSuggestion();

  const safetyMsg = SAFETY_MESSAGES[language];

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
    };

    const response = generateResponse(input, language);
    const assistantMessage: Message = {
      role: 'assistant',
      content: response.message,
      response,
    };

    setMessages(prev => [...prev, userMessage, assistantMessage]);
    setInput('');
  };

  const handleNavigate = (route: string) => {
    window.location.hash = route;
    onClose();
  };

  const handleSubmitSuggestion = async () => {
    if (!suggestion.trim()) return;

    try {
      await submitSuggestion.mutateAsync(suggestion);
      setSuggestion('');
      setShowSuggestionForm(false);
      
      // Add confirmation message
      const confirmationMessage: Message = {
        role: 'assistant',
        content: language === 'es' 
          ? '¡Gracias por tu sugerencia! La hemos recibido y la revisaremos.'
          : 'Thank you for your suggestion! We\'ve received it and will review it.',
      };
      setMessages(prev => [...prev, confirmationMessage]);
    } catch (error) {
      console.error('Failed to submit suggestion:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl">
        <CardHeader className="border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={AI_FRIEND_ASSETS.avatar}
                alt="Seth"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <CardTitle className="text-lg">Seth</CardTitle>
                <p className="text-xs text-muted-foreground">Your assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={language} onValueChange={(val) => setLanguage(val as Language)}>
                <SelectTrigger className="w-[100px]">
                  <Globe className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={safetyMsg.closeButton}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4 overflow-hidden">
          {/* Safety Disclaimer */}
          <Alert className="mb-4 flex-shrink-0">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              {safetyMsg.disclaimer}
            </AlertDescription>
          </Alert>

          {/* Crisis Note */}
          <Alert variant="destructive" className="mb-4 flex-shrink-0">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <p className="font-semibold mb-1">{safetyMsg.crisisNote}</p>
              <button
                onClick={() => handleNavigate('links')}
                className="underline hover:no-underline"
              >
                {safetyMsg.crisisAction}
              </button>
            </AlertDescription>
          </Alert>

          {/* Messages */}
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  <p className="text-sm">
                    {language === 'es' 
                      ? '¡Hola! Estoy aquí para ayudarte. ¿Qué te gustaría explorar hoy?'
                      : 'Hi! I\'m here to help. What would you like to explore today?'}
                  </p>
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                    
                    {msg.response?.suggestedActions && msg.response.suggestedActions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {msg.response.suggestedActions.map((action, i) => (
                          <div key={i} className="text-xs bg-card/50 rounded p-2">
                            <p className="font-semibold">{action.label}</p>
                            <p className="text-muted-foreground">{action.description}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {msg.response?.deepLinks && msg.response.deepLinks.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.response.deepLinks.map((link, i) => (
                          <button
                            key={i}
                            onClick={() => handleNavigate(link.route)}
                            className="text-xs bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-full transition-colors"
                          >
                            {link.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Suggestion Form */}
          {showSuggestionForm ? (
            <div className="space-y-2 flex-shrink-0">
              <Textarea
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                placeholder={language === 'es' ? 'Comparte tu sugerencia...' : 'Share your suggestion...'}
                rows={3}
              />
              <div className="flex gap-2">
                <GreenButton
                  onClick={handleSubmitSuggestion}
                  disabled={submitSuggestion.isPending || !suggestion.trim()}
                  className="flex-1"
                >
                  {submitSuggestion.isPending 
                    ? (language === 'es' ? 'Enviando...' : 'Sending...') 
                    : safetyMsg.suggestButton}
                </GreenButton>
                <GreenButton
                  variant="outline"
                  onClick={() => {
                    setShowSuggestionForm(false);
                    setSuggestion('');
                  }}
                >
                  {language === 'es' ? 'Cancelar' : 'Cancel'}
                </GreenButton>
              </div>
            </div>
          ) : (
            <>
              {/* Input */}
              <div className="flex gap-2 flex-shrink-0">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={safetyMsg.placeholder}
                  className="flex-1"
                />
                <GreenButton onClick={handleSend} disabled={!input.trim()}>
                  <Send className="h-4 w-4" />
                </GreenButton>
                <GreenButton
                  variant="outline"
                  onClick={() => setShowSuggestionForm(true)}
                  title={language === 'es' ? 'Enviar sugerencia de producto' : 'Send product suggestion'}
                >
                  <Lightbulb className="h-4 w-4" />
                </GreenButton>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

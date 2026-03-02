import { createContext, useContext, ReactNode } from 'react';

interface AIFriendContextType {
  isOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

const AIFriendContext = createContext<AIFriendContextType | undefined>(undefined);

export function useAIFriend() {
  const context = useContext(AIFriendContext);
  if (!context) {
    throw new Error('useAIFriend must be used within AIFriendProvider');
  }
  return context;
}

interface AIFriendProviderProps {
  children: ReactNode;
}

export default function AIFriendProvider({ children }: AIFriendProviderProps) {
  // Temporary kill-switch: AI Friend is disabled
  // The provider still exists to prevent breaking changes, but does not render the UI
  const isOpen = false;
  const openPanel = () => {};
  const closePanel = () => {};

  return (
    <AIFriendContext.Provider value={{ isOpen, openPanel, closePanel }}>
      {children}
      {/* AI Friend UI temporarily disabled - no character or panel rendered */}
    </AIFriendContext.Provider>
  );
}

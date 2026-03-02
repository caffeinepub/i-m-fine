import { useState, useEffect } from 'react';
import { AI_FRIEND_ASSETS } from './aiFriendAssets';

interface AIFriendCharacterProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function AIFriendCharacter({ onClick, isOpen }: AIFriendCharacterProps) {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload images
  useEffect(() => {
    const images = [
      AI_FRIEND_ASSETS.idle,
      AI_FRIEND_ASSETS.walk1,
      AI_FRIEND_ASSETS.walk2,
    ];

    let loadedCount = 0;
    images.forEach(src => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === images.length) {
          setImagesLoaded(true);
        }
      };
      img.src = src;
    });
  }, []);

  if (!imagesLoaded) {
    return null;
  }

  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full transition-transform"
      style={{
        width: '80px',
        height: '80px',
      }}
      aria-label="Open Seth Assistant"
    >
      <img
        src={AI_FRIEND_ASSETS.idle}
        alt="Seth"
        className="w-full h-full object-contain drop-shadow-lg"
      />
    </button>
  );
}

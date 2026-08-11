import React, { useState } from 'react';
import FloatingHearts from './components/FloatingHearts';
import PasswordScreen from './components/PasswordScreen';
import LoadingScreen from './components/LoadingScreen';
import BirthdayHome from './components/BirthdayHome';
import GiftSelection from './components/GiftSelection';
import LetterGift from './components/LetterGift';
import BouquetGift from './components/BouquetGift';
import MusicGift from './components/MusicGift';
import FinalMessage from './components/FinalMessage';

export function App() {
  const [currentView, setCurrentView] = useState('password');
  const [visitedGifts, setVisitedGifts] = useState([]);

  // Flow handlers
  const handleUnlockPassword = () => {
    setCurrentView('loading');
  };

  const handleFinishLoading = () => {
    setCurrentView('home');
  };

  const handleOpenGifts = () => {
    setCurrentView('selection');
  };

  const handleSelectGift = (giftId) => {
    if (!visitedGifts.includes(giftId)) {
      setVisitedGifts((prev) => [...prev, giftId]);
    }
    setCurrentView(giftId);
  };

  const handleBackToGifts = () => {
    setCurrentView('selection');
  };

  const handleGoToFinal = () => {
    setCurrentView('final');
  };

  const handleRestart = () => {
    setVisitedGifts([]);
    setCurrentView('password');
  };

  return (
    <div className="app-container">
      {/* Global Aesthetic Background Floating Hearts */}
      <FloatingHearts count={36} />

      {/* Dynamic View Router */}
      <main style={{ position: 'relative', zIndex: 1 }}>
        {currentView === 'password' && (
          <PasswordScreen onUnlock={handleUnlockPassword} />
        )}

        {currentView === 'loading' && (
          <LoadingScreen onFinish={handleFinishLoading} />
        )}

        {currentView === 'home' && (
          <BirthdayHome onOpenGifts={handleOpenGifts} />
        )}

        {currentView === 'selection' && (
          <GiftSelection
            onSelectGift={handleSelectGift}
            visitedGifts={visitedGifts}
            onGoToFinal={handleGoToFinal}
          />
        )}

        {currentView === 'letter' && (
          <LetterGift onBack={handleBackToGifts} />
        )}

        {currentView === 'flowers' && (
          <BouquetGift onBack={handleBackToGifts} />
        )}

        {currentView === 'songs' && (
          <MusicGift onBack={handleBackToGifts} />
        )}

        {currentView === 'final' && (
          <FinalMessage onRestart={handleRestart} />
        )}
      </main>
    </div>
  );
}

export default App;

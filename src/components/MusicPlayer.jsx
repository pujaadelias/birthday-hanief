import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Disc, Sparkles } from 'lucide-react';
import { config } from '../config';

// Web Audio API synth generator for smooth ambient romantic fallback notes
const createSynthAudio = (songId) => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    const ctx = new AudioCtx();
    
    // Different chords for different songs
    const chordsMap = {
      1: [261.63, 329.63, 392.00, 523.25], // C Major
      2: [220.00, 261.63, 329.63, 440.00], // A Minor
      3: [174.61, 220.00, 261.63, 349.23]  // F Major
    };
    
    const freqs = chordsMap[songId] || chordsMap[1];
    let isPlaying = false;
    let timerId = null;

    const playNote = () => {
      if (ctx.state === 'suspended') ctx.resume();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = freqs[Math.floor(Math.random() * freqs.length)];
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 2.6);
    };

    return {
      start: () => {
        if (isPlaying) return;
        isPlaying = true;
        if (ctx.state === 'suspended') ctx.resume();
        playNote();
        timerId = setInterval(playNote, 1400);
      },
      stop: () => {
        isPlaying = false;
        if (timerId) clearInterval(timerId);
      }
    };
  } catch (e) {
    return null;
  }
};

export const MusicPlayer = ({ songs = config.songs }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(180); // default 3 min
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [useSynthFallback, setUseSynthFallback] = useState(false);

  const audioRef = useRef(null);
  const synthRef = useRef(null);
  const currentSong = songs[currentIndex];

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration || 180);
    const handleEnded = () => handleNext();

    const handleError = () => {
      // Audio file missing or blocked -> fallback to web audio synth
      setUseSynthFallback(true);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.load();
      setCurrentTime(0);
      setUseSynthFallback(false);

      if (isPlaying) {
        audioRef.current.play().catch(() => {
          setUseSynthFallback(true);
          if (!synthRef.current) {
            synthRef.current = createSynthAudio(currentSong.id);
          }
          if (synthRef.current) synthRef.current.start();
        });
      }
    }
  }, [currentIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (useSynthFallback) {
      if (isPlaying) {
        if (!synthRef.current) {
          synthRef.current = createSynthAudio(currentSong.id);
        }
        if (synthRef.current) synthRef.current.start();
      } else {
        if (synthRef.current) synthRef.current.stop();
      }
    }
  }, [isPlaying, useSynthFallback, currentIndex]);

  // Synthetic timer ticker if running synth fallback
  useEffect(() => {
    let interval = null;
    if (useSynthFallback && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [useSynthFallback, isPlaying, duration]);

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (synthRef.current) synthRef.current.stop();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          setUseSynthFallback(true);
          setIsPlaying(true);
        });
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % songs.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + songs.length) % songs.length);
  };

  const formatTime = (secs) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current && !useSynthFallback) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div
      className="glass-card"
      style={{
        width: '100%',
        maxWidth: '440px',
        padding: '28px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}
    >
      {/* Cover Artwork */}
      <div
        style={{
          width: '200px',
          height: '200px',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '24px',
          position: 'relative',
          boxShadow: isPlaying ? '0 16px 40px rgba(0,0,0,0.7), 0 0 30px rgba(255,255,255,0.1)' : '0 12px 30px rgba(0,0,0,0.5)',
          transition: 'all 0.5s ease',
          transform: isPlaying ? 'scale(1.03)' : 'scale(1)'
        }}
      >
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          onError={(e) => {
            e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="%231a1c23"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-size="16">🎵 Music</text></svg>';
          }}
        />

        {/* Animated Equalizer Overlay when Playing */}
        {isPlaying && (
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'flex-end',
              gap: '3px',
              height: '20px',
              background: 'rgba(0,0,0,0.5)',
              padding: '4px 8px',
              borderRadius: '12px',
              backdropFilter: 'blur(4px)'
            }}
          >
            <div style={{ width: '3px', height: '100%', background: '#fff', animation: 'pulse 0.8s infinite alternate' }} />
            <div style={{ width: '3px', height: '60%', background: '#fff', animation: 'pulse 0.6s infinite alternate 0.2s' }} />
            <div style={{ width: '3px', height: '80%', background: '#fff', animation: 'pulse 1s infinite alternate 0.4s' }} />
          </div>
        )}
      </div>

      {/* Song Title & Artist */}
      <h3
        className="font-serif text-gradient"
        style={{
          fontSize: '1.5rem',
          fontWeight: 600,
          marginBottom: '4px',
          textAlign: 'center'
        }}
      >
        {currentSong.title}
      </h3>

      <p
        style={{
          fontSize: '0.9rem',
          color: 'var(--text-sub)',
          marginBottom: '20px'
        }}
      >
        {currentSong.artist}
      </p>

      {/* Progress Bar */}
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          style={{
            width: '100%',
            height: '4px',
            accentColor: 'var(--text-main)',
            cursor: 'pointer'
          }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginTop: '6px'
          }}
        >
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Main Controls */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '24px'
        }}
      >
        <button
          onClick={handlePrev}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-sub)',
            cursor: 'pointer',
            padding: '8px'
          }}
          aria-label="Previous Song"
        >
          <SkipBack size={24} />
        </button>

        <button
          onClick={togglePlay}
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 100%)',
            color: '#111827',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(255,255,255,0.2)',
            transition: 'transform 0.2s ease'
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <Pause size={24} fill="#111827" /> : <Play size={24} fill="#111827" style={{ marginLeft: '3px' }} />}
        </button>

        <button
          onClick={handleNext}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-sub)',
            cursor: 'pointer',
            padding: '8px'
          }}
          aria-label="Next Song"
        >
          <SkipForward size={24} />
        </button>
      </div>

      {/* Playlist view */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '8px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {songs.map((song, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={song.id}
              onClick={() => setCurrentIndex(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: 'var(--radius-sm)',
                background: isActive ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Disc size={16} color={isActive ? 'var(--accent-red)' : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.9rem', color: isActive ? '#ffffff' : 'var(--text-sub)', fontWeight: isActive ? 600 : 400 }}>
                  {song.title}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{song.artist}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MusicPlayer;

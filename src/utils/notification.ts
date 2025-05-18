let primaryAudio: HTMLAudioElement | null = null;
let fallbackAudios: HTMLAudioElement[] = [];
let audioLoaded = false;
let audioLoadAttempted = false;

// Primary notification sound URL
const PRIMARY_SOUND_URL = 'https://www.soundjay.com/buttons/sounds/button-20.mp3';
// Fallback notification sound URLs
const FALLBACK_SOUND_URLS = ['/notification.wav', '/notification.ogg'];

/**
 * Preload the notification sounds
 * This should be called early in the application lifecycle
 */
export const preloadNotificationSounds = (): void => {
  if (audioLoadAttempted) return;
  audioLoadAttempted = true;
  
  try {
    // Create and preload the primary audio
    primaryAudio = new Audio(PRIMARY_SOUND_URL);
    
    // Add error handling for the primary audio
    primaryAudio.addEventListener('error', (e) => {
      console.error('Primary audio error:', e);
      
      // If primary fails, preload the fallbacks
      preloadFallbackSounds();
    });
    
    // Add loaded event listener to track successful loading
    primaryAudio.addEventListener('canplaythrough', () => {
      audioLoaded = true;
      console.log('Notification sound preloaded successfully');
    });
    
    // Start preloading
    primaryAudio.load();
    
  } catch (error) {
    console.error('Failed to create primary Audio object:', error);
    // Try fallbacks if primary creation fails
    preloadFallbackSounds();
  }
};

/**
 * Preload fallback audio sources
 */
const preloadFallbackSounds = (): void => {
  fallbackAudios = [];
  
  FALLBACK_SOUND_URLS.forEach((url, index) => {
    try {
      const audio = new Audio(url);
      
      audio.addEventListener('error', () => {
        console.error(`Fallback audio ${url} failed to load`);
      });
      
      audio.addEventListener('canplaythrough', () => {
        audioLoaded = true;
        console.log(`Fallback sound ${url} preloaded successfully`);
      });
      
      audio.load();
      fallbackAudios.push(audio);
    } catch (error) {
      console.error(`Failed to create fallback Audio object for ${url}:`, error);
    }
  });
};

/**
 * Play the notification sound if enabled
 */
export const playNotificationSound = (soundEnabled: boolean): Promise<void> | void => {
  if (!soundEnabled) return;
  
  // If sounds haven't been preloaded yet, do it now
  if (!audioLoadAttempted) {
    preloadNotificationSounds();
  }
  
  // Try to play the primary audio if it's loaded
  if (primaryAudio) {
    primaryAudio.currentTime = 0;
    return primaryAudio.play().catch(error => {
      console.error('Failed to play primary notification sound:', error);
      
      // If primary fails at playback time, try fallbacks
      if (fallbackAudios.length > 0) {
        playFallbackAudio(0);
      } else {
        // If no fallbacks are preloaded yet, try the legacy approach
        return playLegacyAudio();
      }
    });
  } else {
    // If primary audio isn't available, try fallbacks
    if (fallbackAudios.length > 0) {
      return playFallbackAudio(0);
    } else {
      // If no audio is preloaded yet, use the legacy approach
      return playLegacyAudio();
    }
  }
};

/**
 * Try to play fallback audio sources
 */
const playFallbackAudio = (index: number): Promise<void> | void => {
  if (index >= fallbackAudios.length) {
    console.error('All preloaded audio formats failed to play');
    return;
  }
  
  const audio = fallbackAudios[index];
  audio.currentTime = 0;
  
  return audio.play().catch(error => {
    console.error(`Failed to play fallback audio ${index}:`, error);
    // Try the next fallback
    return playFallbackAudio(index + 1);
  });
};

/**
 * Legacy audio playback method (as a fallback if preloading fails)
 */
const playLegacyAudio = (): Promise<void> | void => {
  try {
    const audio = new Audio(PRIMARY_SOUND_URL);
    audio.load();
    
    // Add error event listener to catch loading errors
    audio.addEventListener('error', (e) => {
      console.error('Legacy audio error:', e);
      
      // Try fallback audio formats if the first one fails
      tryFallbackAudio(FALLBACK_SOUND_URLS, 0);
    });
    
    // Return the play promise to allow handling potential promise rejection
    return audio.play().catch(error => {
      console.error('Failed to play legacy notification sound:', error);
      
      // If play was rejected because of autoplay policy, try again with user interaction
      if (error.name === 'NotAllowedError') {
        console.log('Audio playback was prevented by autoplay policy');
      }
      
      // Try fallbacks
      tryFallbackAudio(FALLBACK_SOUND_URLS, 0);
    });
  } catch (error) {
    console.error('Failed to create legacy Audio object:', error);
    return undefined;
  }
};

/**
 * Helper function to try fallback audio formats (legacy approach)
 */
const tryFallbackAudio = (formats: string[], index: number): void => {
  if (index >= formats.length) {
    console.error('All audio formats failed to load');
    return;
  }
  
  const fallbackAudio = new Audio(formats[index]);
  fallbackAudio.addEventListener('error', () => {
    // Try next format
    tryFallbackAudio(formats, index + 1);
  });
  
  fallbackAudio.play().catch(error => {
    console.error(`Failed to play fallback audio ${formats[index]}:`, error);
    tryFallbackAudio(formats, index + 1);
  });
};

/**
 * Show browser notification
 */
export const showBrowserNotification = (title: string, options: NotificationOptions = {}): Notification | Promise<Notification | null> | null => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return null;
  }

  // Merge default options with user-provided options
  const notificationOptions: NotificationOptions = {
    icon: '/notification-icon.png', // Add a default icon
    silent: false, // Use browser's default notification sound
    ...options
  };

  if (Notification.permission === 'granted') {
    return new Notification(title, notificationOptions);
  } else if (Notification.permission !== 'denied') {
    return Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        return new Notification(title, notificationOptions);
      }
      return null;
    });
  }
  return null;
};

/**
 * Verify if notification resources exist and are accessible
 */
export const verifyNotificationResources = async (): Promise<boolean> => {
  try {
    // Check if notification audio exists
    const audioResponse = await fetch('/notification.mp3', { method: 'HEAD' });
    if (!audioResponse.ok) {
      console.warn('Notification sound file not found. Status:', audioResponse.status);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying notification resources:', error);
    return false;
  }
};
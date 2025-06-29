import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Custom hook to detect user inactivity and trigger a callback.
 * @param {number} timeout - The inactivity timeout period in milliseconds.
 * @param {function} onIdleCallback - The function to call when the user is idle.
 * @param {boolean} enabled - Whether the idle timer should be active. Defaults to true.
 */
function useIdleTimer(timeout, onIdleCallback, enabled = true) {
  const navigate = useNavigate(); // navigate might not be needed here if onIdleCallback handles navigation
  const timerRef = useRef(null);
  const callbackRef = useRef(onIdleCallback); // Use ref to hold the latest callback

  const [isIdle, setIsIdle] = useState(false);

  // Update callbackRef if onIdleCallback changes
  useEffect(() => {
    callbackRef.current = onIdleCallback;
  }, [onIdleCallback]);

  const resetTimer = useCallback(() => {
    if (!enabled) return; // Don't do anything if not enabled

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setIsIdle(false);
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      if (callbackRef.current) {
        callbackRef.current();
      }
    }, timeout);
  }, [timeout, enabled]); // Include enabled in dependencies

  const handleActivity = useCallback(() => {
    if (!enabled) return; // Don't do anything if not enabled

    // Only reset if the user is currently marked as active
    if (!isIdle) {
      resetTimer();
    }
  }, [isIdle, resetTimer, enabled]); // Include enabled in dependencies

  useEffect(() => {
    if (!enabled) {
      // If timer is disabled, clear any existing timer and listeners
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      // No need to remove listeners here if they are added conditionally based on 'enabled'
      return;
    }

    // Initial setup of the timer
    resetTimer();

    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, handleActivity, { passive: true });
    });

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      activityEvents.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer, handleActivity, enabled]); // Include enabled in dependencies

  return isIdle;
}

export default useIdleTimer;

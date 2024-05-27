import React, { useEffect, useRef } from 'react';

import styles from './DisableAnimationsOnResize.module.scss';

const DisableAnimationsOnResize: React.FC = () => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const process = () => {
      document.body.classList.add(styles.disable);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(
        () => document.body.classList.remove(styles.disable),
        100,
      );
    };

    window.addEventListener('resize', process);

    return () => window.removeEventListener('resize', process);
  }, []);

  return null;
};

export default DisableAnimationsOnResize;

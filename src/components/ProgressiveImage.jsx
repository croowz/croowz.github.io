import { useEffect, useState, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ProgressiveImage = ({ logos, darkLogos, alt, className, imageId }) => {
  const [themeState] = useTheme();
  const pictureRef = useRef(null);
  
  // Get the initial sources from our global state
  const [currentLogos, setCurrentLogos] = useState(() => {
    // If we have a pre-defined source for this image, use it
    if (imageId && window.__INITIAL_IMAGE_SOURCES__?.[imageId]) {
      return window.__INITIAL_IMAGE_SOURCES__[imageId];
    }
    // Otherwise, determine based on theme
    return themeState.isDark && darkLogos ? darkLogos : logos;
  });

  // Update sources when theme changes
  useEffect(() => {
    const nextLogos = themeState.isDark && darkLogos ? darkLogos : logos;
    
    // Only update if the sources have actually changed
    if (JSON.stringify(nextLogos) !== JSON.stringify(currentLogos)) {
      setCurrentLogos(nextLogos);
    }
  }, [themeState.isDark, darkLogos, logos, currentLogos]);

  return (
    <picture ref={pictureRef}>
      {/* Set the sources without any transition effects */}
      <source
        type="image/jxl"
        srcSet={currentLogos.jxl}
      />
      <source
        type="image/webp"
        srcSet={currentLogos.webp}
      />
      <img
        src={currentLogos.png}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

export default ProgressiveImage;
import { useEffect, useState } from 'react';

const ProgressiveImage = ({ logos, darkLogos, alt, className }) => {
  // We'll check if we're in dark mode by looking at the html class
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Initial check
    setIsDarkMode(document.documentElement.classList.contains('dark'));

    // Create observer to watch for class changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDarkMode(document.documentElement.classList.contains('dark'));
        }
      });
    });

    // Start observing
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const currentLogos = isDarkMode && darkLogos ? darkLogos : logos;

  return (
    <picture>
      <source type="image/jxl" srcSet={currentLogos.jxl} />
      <source type="image/webp" srcSet={currentLogos.webp} />
      <img src={currentLogos.png} alt={alt} className={className} />
    </picture>
  );
};

export default ProgressiveImage;
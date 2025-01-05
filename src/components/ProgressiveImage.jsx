import { useTheme } from '../contexts/ThemeContext';

const ProgressiveImage = ({ logos, darkLogos, alt, className }) => {
  // Get theme state from our context
  const [themeState] = useTheme();
  
  // Determine the correct logos based on theme state
  const currentLogos = themeState.isDark && darkLogos ? darkLogos : logos;
  
  return (
    <picture>
      {/* Using picture element for progressive enhancement */}
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
import { useTheme } from '../contexts/ThemeContext';

const SimpleImage = ({ logoPath, darkLogoPath, alt, className }) => {
  const [themeState] = useTheme();
  const src = themeState.isDark && darkLogoPath ? darkLogoPath : logoPath;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
    />
  );
};

export default SimpleImage;
import { useEffect, useState, useRef } from 'react';

const ProgressiveImage = ({ avifSrc, pngSrc, alt, className }) => {
  return (
    <picture>
      <source type="image/avif" srcSet={avifSrc} />
      <img
        src={pngSrc}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  );
};

export default ProgressiveImage;
import React, { useState } from "react";

interface ImageWithLoaderProps {
  src: string;
  alt: string;
  className?: string;
  placeholderShape?: string;
}

const LazyLoadImage: React.FC<ImageWithLoaderProps> = ({
  src,
  alt,
  className,
  placeholderShape,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${placeholderShape} bg-gray-200 animate-pulse`}
        >
          <div className="w-1/2 h-1/2 bg-gray-300"></div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"}`}
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default LazyLoadImage;

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

const getStorageKey = (id) => `product_gallery_${id}_activeIndex`;
const BASE_URL =
  "https://phplaravel-1483035-5732108.cloudwaysapps.com/storage/";

export function ImageGallery({ images, productId }) {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(() => {
    const savedIndex = localStorage.getItem(getStorageKey(productId));
    return savedIndex ? parseInt(savedIndex) : 0;
  });
  const [showThumbnails, setShowThumbnails] = useState(true);

  // Add base URL to image paths
  const getFullImageUrl = (path) => {
    if (!path) return "";
    // Check if the path already starts with http or base URL
    if (path.startsWith("http") || path.startsWith(BASE_URL)) {
      return path;
    }
    // Remove leading slash if present
    const cleanedPath = path.startsWith("/") ? path.substring(1) : path;
    return `${BASE_URL}${cleanedPath}`;
  };

  // Save activeIndex to localStorage whenever it changes
  useEffect(() => {
    if (images?.length) {
      localStorage.setItem(getStorageKey(productId), activeIndex.toString());
    }
  }, [activeIndex, productId, images]);

  const nextImage = () => {
    if (images?.length) {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (images?.length) {
      setActiveIndex(
        (prevIndex) => (prevIndex - 1 + images.length) % images.length
      );
    }
  };

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const getVisibleThumbnails = () => {
    if (!images) return [];

    const thumbnails = [];
    const totalImages = images.length;
    const maxThumbnails = 6;

    let start = Math.max(0, activeIndex - Math.floor(maxThumbnails / 2));
    start = Math.min(start, totalImages - maxThumbnails);
    start = Math.max(0, start);

    const end = Math.min(start + maxThumbnails, totalImages);

    for (let i = start; i < end; i++) {
      thumbnails.push({
        index: i,
        src: getFullImageUrl(images[i]),
      });
    }

    return thumbnails;
  };

  const renderMainImage = () => (
    <div className="relative w-1/2 mx-auto h-80 bg-gray-100 rounded-lg overflow-hidden mb-4">
      {images?.length ? (
        <img
          src={getFullImageUrl(images[activeIndex])}
          alt={`Product ${activeIndex + 1}`}
          className="w-full mx-auto h-full object-contain"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          {t("ImageGallery.noImages")}
        </div>
      )}
    </div>
  );

  const renderThumbnails = () => {
    if (!images?.length || !showThumbnails) return null;

    const thumbnails = getVisibleThumbnails();
    const hasPrev = activeIndex > 0;
    const hasNext = activeIndex < images.length - 1;

    return (
      <div className="flex items-center justify-center gap-2 mt-4">
        <button
          onClick={prevImage}
          disabled={!hasPrev}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            hasPrev
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 cursor-not-allowed"
          }`}
          aria-label={t("ImageGallery.previousThumbnails")}
        >
          <ArrowLeft size={16} />
        </button>

        {thumbnails.map(({ index, src }) => (
          <button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
              index === activeIndex ? "border-blue-500" : "border-transparent"
            }`}
            aria-label={t("ImageGallery.viewImage", { index: index + 1 })}
          >
            <img
              src={src}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

        <button
          onClick={nextImage}
          disabled={!hasNext}
          className={`w-8 h-8 flex items-center justify-center rounded-full ${
            hasNext
              ? "bg-gray-200 hover:bg-gray-300"
              : "bg-gray-100 cursor-not-allowed"
          }`}
          aria-label={t("ImageGallery.nextThumbnails")}
        >
          <ArrowRight size={16} />
        </button>
      </div>
    );
  };

  return (
    <div className="px-4 pt-16 flex flex-col gap-y-2">
      {renderMainImage()}
      {renderThumbnails()}
    </div>
  );
}

ImageGallery.propTypes = {
  /**
   * Array of image URLs to display in the gallery
   */
  images: PropTypes.arrayOf(PropTypes.string).isRequired,

  /**
   * Unique identifier for the product to store gallery state in localStorage
   */
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

'use client';

import { useCallback, useEffect, useState } from 'react';

import Image from 'next/image';

import useEmblaCarousel from 'embla-carousel-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { useTranslation } from '@/libs/translations';

interface CarouselProps {
  images?: string[];
}

// Helper function for blur placeholder
const generateBlurDataURL = () => {
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+i2ATbtw8fqeqPTjZz2Wjj5TEZATjETXqtNJp7KOOCVtSGm9FdGD2uTGDBwC8F9Qrd+EXXhd14ReOSa8Ifa2gTjX';
};

export default function Carousel({ images = [] }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const { t } = useTranslation();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <div className="relative mb-4 w-full max-w-full">
      <div
        aria-live="polite"
        className="w-full overflow-hidden rounded-lg"
        ref={emblaRef}
      >
        <div className="flex touch-pan-x select-none">
          {images.length > 0 &&
            images.map((imageUrl, index) => (
              <div
                className="relative min-w-0 flex-[0_0_100%] px-1 sm:px-2"
                key={`${imageUrl}-${index}`}
              >
                <div className="xs:h-[19rem] relative w-full bg-zinc-100 sm:h-[31rem] md:h-[19rem] lg:h-[35rem]">
                  <Image
                    alt={`Project image ${index + 1}`}
                    blurDataURL={generateBlurDataURL()}
                    className="h-full w-full rounded-md object-contain"
                    width={1893}
                    height={852}
                    placeholder="blur"
                    priority={index === 0}
                    src={imageUrl}
                  />
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Navigation buttons - only show if more than one image */}
      {images.length > 1 && (
        <>
          <button
            className="hover:bg-tertiary absolute top-1/2 left-2 z-10 ml-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-600 shadow-md hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canScrollPrev}
            onClick={scrollPrev}
            type="button"
            aria-label={t('carousel.previous')}
          >
            <FaChevronLeft className="h-4 w-4 sm:h-3 sm:w-3" />
            <span className="sr-only">{t('carousel.previous')}</span>
          </button>

          <button
            className="hover:bg-tertiary absolute top-1/2 right-2 z-10 mr-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/80 text-gray-600 shadow-md hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canScrollNext}
            onClick={scrollNext}
            type="button"
            aria-label={t('carousel.next')}
          >
            <FaChevronRight className="h-4 w-4 sm:h-3 sm:w-3" />
            <span className="sr-only">{t('carousel.next')}</span>
          </button>
        </>
      )}

      {/* Dots indicator - only show if more than one image */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center gap-2 sm:mt-6">
          {images.map((_, index) => (
            <button
              key={index}
              style={{ width: 16, height: 16, minWidth: 16, minHeight: 16 }}
              className={`rounded-full transition-colors duration-200 focus:ring-2 focus:ring-blue-400 focus:outline-none ${
                index === selectedIndex
                  ? 'scale-110 bg-blue-500'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              onClick={() => emblaApi?.scrollTo(index)}
              type="button"
              aria-label={`${t('carousel.goto')} ${index + 1}`}
            >
              <span className="sr-only">
                {t('carousel.goto')} {index + 1}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

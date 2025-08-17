"use client";

import { useState, useCallback, useEffect } from 'react';
import { useInView } from '@/lib/useInView';
import { GalleryImage } from '@/lib/gallery';
import ImageTile from './ImageTile';
import Lightbox from './Lightbox';

interface Dictionary {
  gallery?: Record<string, string>;
  common?: Record<string, string>;
}

interface GalleryClientProps {
  images: GalleryImage[];
  dictionary: Dictionary;
}

export default function GalleryClient({ images, dictionary }: GalleryClientProps) {
  const [renderCount, setRenderCount] = useState<number>(24);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // chunked rendering
  const { ref, inView } = useInView<HTMLDivElement>({ rootMargin: '400px', once: false });
  useEffect(() => {
    if (inView && renderCount < images.length) {
      setRenderCount((c) => Math.min(c + 24, images.length));
    }
  }, [inView, images.length, renderCount]);

  const openAt = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const onClose = useCallback(() => setIsLightboxOpen(false), []);
  const onPrev = useCallback(() => setCurrentIndex((i) => (i - 1 + images.length) % images.length), [images.length]);
  const onNext = useCallback(() => setCurrentIndex((i) => (i + 1) % images.length), [images.length]);

  const visible = images.slice(0, renderCount);

  return (
    <div>
      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {visible.map((img, i) => (
          <ImageTile key={`${img.originalPath}-${i}`} image={img} index={i} onOpen={openAt} />
        ))}
      </div>

      {/* Load more sentinel */}
      {renderCount < images.length && (
        <div ref={ref} className="h-12" />
      )}

      {isLightboxOpen && (
        <Lightbox
          images={images}
          index={currentIndex}
          dictionary={dictionary}
          onClose={onClose}
          onPrev={onPrev}
          onNext={onNext}
        />
      )}
    </div>
  );
}

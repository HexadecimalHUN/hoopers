"use client";

import { useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage } from '@/lib/gallery';

interface Dictionary {
  gallery?: Record<string, string>;
  common?: Record<string, string>;
}

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  dictionary: Dictionary;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({ images, index, dictionary, onClose, onPrev, onNext }: LightboxProps) {
  const current = images[index];

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    }
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, onPrev, onNext]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      onClick={onClose}
    >
      <div className="absolute inset-0" />

      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary/60"
        aria-label={dictionary.common?.close || 'Close'}
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-6 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary/60"
        aria-label={dictionary.common?.previous || 'Previous'}
      >
        ‹
      </button>

      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-6 p-3 rounded-full bg-black/60 text-white hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-primary/60"
        aria-label={dictionary.common?.next || 'Next'}
      >
        ›
      </button>

      <div className="relative max-w-[92vw] max-h-[90vh] w-auto h-auto mx-6" onClick={(e) => e.stopPropagation()}>
        <Image
          {...current.fullProps}
          alt={current.originalPath}
          className="object-contain w-auto h-auto max-w-full max-h-[90vh] rounded-lg"
          placeholder={current.fullProps.blurDataURL ? 'blur' : 'empty'}
        />
        <div className="mt-3 text-center text-white/90 text-sm">
          {current.originalPath.split('/').pop()}
        </div>
      </div>
    </div>
  );
}

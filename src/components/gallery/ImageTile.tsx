"use client";

import Image from 'next/image';
import { GalleryImage } from '@/lib/gallery';

interface ImageTileProps {
  image: GalleryImage;
  index: number;
  onOpen: (index: number) => void;
}

export default function ImageTile({ image, index, onOpen }: ImageTileProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="relative aspect-square overflow-hidden rounded-lg group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/60 focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Open image"
    >
      <Image
        {...image.thumbProps}
        alt={image.originalPath}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-300"
        placeholder={image.thumbProps.blurDataURL ? "blur" : "empty"}
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors" />
    </button>
  );
}

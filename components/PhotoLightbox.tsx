"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoItem } from "@/data/collections";

type PhotoLightboxProps = {
  images: PhotoItem[];
};

export default function PhotoLightbox({ images }: PhotoLightboxProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      <section className="lightbox-grid">
        {images.map((image, index) => (
          <button
            className="lightbox-thumb"
            key={`${image.src}-${index}`}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            {image.kind === "pdf" ? (
              <span className="lightbox-pdf-thumb">
                <span className="lightbox-pdf-label">PDF</span>
                <span className="lightbox-pdf-caption">{image.alt}</span>
              </span>
            ) : (
              <Image
                alt={image.alt}
                height={700}
                loading="lazy"
                sizes="(max-width: 900px) 100vw, 33vw"
                src={image.src}
                width={1100}
              />
            )}
          </button>
        ))}
      </section>
      {activeIndex !== null && (
        <div className="lightbox-modal" onClick={() => setActiveIndex(null)} role="presentation">
          {images[activeIndex].kind === "pdf" ? (
            <div className="lightbox-modal-pdf" onClick={(e) => e.stopPropagation()} role="presentation">
              <iframe
                className="lightbox-pdf-iframe"
                src={`${images[activeIndex].src}#view=FitH`}
                title={images[activeIndex].alt}
              />
              <a
                className="lightbox-pdf-open"
                href={images[activeIndex].src}
                rel="noopener noreferrer"
                target="_blank"
              >
                Open PDF in new tab
              </a>
            </div>
          ) : (
            <Image
              alt={images[activeIndex].alt}
              className="lightbox-modal-image"
              height={1400}
              sizes="100vw"
              src={images[activeIndex].src}
              width={2200}
            />
          )}
        </div>
      )}
    </>
  );
}

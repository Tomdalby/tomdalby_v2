"use client";

import Image from "next/image";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import type { PhotoItem } from "@/data/collections";

function orientationLabel(w: number, h: number): "landscape" | "portrait" | "square" {
  if (w <= 0 || h <= 0) return "portrait";
  const ratio = w / h;
  if (ratio > 1.05) return "landscape";
  if (ratio < 0.95) return "portrait";
  return "square";
}

type GalleryAdaptiveFigureProps = {
  item: PhotoItem;
};

export default function GalleryAdaptiveFigure({ item }: GalleryAdaptiveFigureProps) {
  const figureRef = useRef<HTMLElement | null>(null);
  const [orientation, setOrientation] = useState<"pending" | "landscape" | "portrait" | "square">(
    item.kind === "pdf" ? "landscape" : "pending"
  );
  const [fitAlign, setFitAlign] = useState<"start" | "end" | "center">("center");

  const updateFitAlign = useCallback(() => {
    const figure = figureRef.current;
    if (!figure) return;
    const gallery = figure.closest(".gallery-layout");
    if (!gallery) return;
    const g = gallery.getBoundingClientRect();
    const f = figure.getBoundingClientRect();
    if (f.width <= 0 || g.width <= 0) return;
    const spanRatio = f.width / g.width;
    /* Full-width row (landscape or single-column): keep centered */
    if (spanRatio > 0.72) {
      setFitAlign("center");
      return;
    }
    /* Half-width cell: hug the gallery edge that this column shares with full-bleed rows */
    const distToGalleryLeft = Math.abs(f.left - g.left);
    const distToGalleryRight = Math.abs(f.right - g.right);
    setFitAlign(distToGalleryLeft < distToGalleryRight ? "start" : "end");
  }, []);

  useLayoutEffect(() => {
    updateFitAlign();
    const figure = figureRef.current;
    const gallery = figure?.closest(".gallery-layout");
    if (!figure || !gallery) return;
    const ro = new ResizeObserver(() => {
      updateFitAlign();
    });
    ro.observe(gallery);
    ro.observe(figure);
    window.addEventListener("resize", updateFitAlign);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", updateFitAlign);
    };
  }, [updateFitAlign, orientation, item.src]);

  const onImageReady = useCallback((img: HTMLImageElement) => {
    setOrientation(orientationLabel(img.naturalWidth, img.naturalHeight));
  }, []);

  if (item.kind === "pdf") {
    return (
      <figure className="gallery-item gallery-item-pdf gallery-item--landscape">
        <div className="pdf-embed">
          <iframe className="pdf-iframe" src={`${item.src}#view=FitH`} title={item.alt} />
          <div className="pdf-actions">
            <a className="pdf-link" href={item.src} rel="noopener noreferrer" target="_blank">
              Open PDF in new tab
            </a>
          </div>
        </div>
      </figure>
    );
  }

  const layoutKey = orientation === "pending" ? "portrait" : orientation;

  return (
    <figure
      ref={figureRef}
      className={`gallery-item gallery-item--orient-${layoutKey}${
        orientation === "pending" ? " gallery-item--orient-pending" : ""
      }`}
    >
      <div className={`gallery-item-fit gallery-item-fit--align-${fitAlign}`}>
        <Image
          alt={item.alt}
          height={1100}
          loading="lazy"
          onLoadingComplete={onImageReady}
          sizes="(max-width: 900px) 92vw, min(1760px, 90vw)"
          src={item.src}
          width={1600}
        />
      </div>
    </figure>
  );
}

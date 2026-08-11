"use client";

import { useEffect, useRef } from "react";
import GalleryPreviewCard from "@/components/GalleryPreviewCard";
import { PhotoCollection } from "@/data/collections";

type MarqueeColumnProps = {
  collections: PhotoCollection[];
  direction: "up" | "down";
};

/** Shared visual scroll speed for both homepage columns (px per second). */
const SCROLL_SPEED_PX_PER_SEC = 28;
const DRAG_THRESHOLD_PX = 4;
const MOBILE_MQ = "(max-width: 900px)";

export default function MarqueeColumn({ collections: items, direction }: MarqueeColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const draggingRef = useRef(false);
  const pointerActiveRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const isMobileRef = useRef(false);

  const wrapOffset = (value: number) => {
    const half = halfRef.current;
    if (half <= 0) return value;
    let next = value % half;
    if (next < 0) next += half;
    return next;
  };

  const applyOffset = () => {
    const track = trackRef.current;
    if (!track) return;
    // Mobile is a static stacked feed — never leave a translate that overlaps cards
    if (isMobileRef.current) {
      track.style.transform = "";
      return;
    }
    track.style.transform = `translate3d(0, ${-offsetRef.current}px, 0)`;
  };

  const nudge = (deltaPx: number) => {
    if (isMobileRef.current) return;
    offsetRef.current = wrapOffset(offsetRef.current + deltaPx);
    applyOffset();
  };

  useEffect(() => {
    const track = trackRef.current;
    const column = columnRef.current;
    if (!track || !column) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobileQuery = window.matchMedia(MOBILE_MQ);

    const syncMobile = () => {
      isMobileRef.current = mobileQuery.matches;
      if (mobileQuery.matches) {
        offsetRef.current = 0;
        halfRef.current = 0;
        draggingRef.current = false;
        pointerActiveRef.current = false;
        applyOffset();
      }
    };

    syncMobile();

    const enableAutoScroll = () =>
      !reducedMotion && !isMobileRef.current;

    const measureHalf = () => {
      if (isMobileRef.current) {
        offsetRef.current = 0;
        applyOffset();
        return true;
      }

      const cards = Array.from(track.querySelectorAll<HTMLElement>(".preview-card"));
      const loopCount = Math.floor(cards.length / 2);
      if (loopCount === 0) return false;

      const gap =
        Number.parseFloat(getComputedStyle(track).rowGap || "0") ||
        Number.parseFloat(getComputedStyle(track).gap || "0") ||
        0;

      let half = 0;
      for (let i = 0; i < loopCount; i++) {
        const cardHeight = cards[i].getBoundingClientRect().height;
        if (cardHeight <= 0) return false;
        half += cardHeight;
        if (i > 0) half += gap;
      }

      if (half <= 0) return false;

      const isFirstMeasure = halfRef.current <= 0;
      halfRef.current = half;
      if (isFirstMeasure && direction === "down") {
        offsetRef.current = half * 0.5;
      }
      offsetRef.current = wrapOffset(offsetRef.current);
      applyOffset();
      return true;
    };

    const onImageLoad = () => {
      measureHalf();
    };

    const bindImageLoads = () => {
      track.querySelectorAll("img").forEach((img) => {
        if (img.complete) {
          measureHalf();
        } else {
          img.addEventListener("load", onImageLoad);
          img.addEventListener("error", onImageLoad);
        }
      });
    };

    offsetRef.current = 0;
    measureHalf();
    bindImageLoads();

    const resizeObserver = new ResizeObserver(() => {
      measureHalf();
    });
    resizeObserver.observe(track);
    track.querySelectorAll(".preview-card").forEach((card) => {
      resizeObserver.observe(card);
    });

    const remeasureId = window.setInterval(() => {
      if (measureHalf()) {
        window.clearInterval(remeasureId);
      } else {
        bindImageLoads();
      }
    }, 200);

    const onWheel = (event: WheelEvent) => {
      if (isMobileRef.current) return;
      if (Math.abs(event.deltaY) < 0.5) return;
      event.preventDefault();
      nudge(event.deltaY);
    };

    column.addEventListener("wheel", onWheel, { passive: false });

    const onMobileChange = () => {
      syncMobile();
      halfRef.current = 0;
      measureHalf();
    };
    mobileQuery.addEventListener("change", onMobileChange);

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (enableAutoScroll() && !draggingRef.current && halfRef.current > 0) {
        const delta = SCROLL_SPEED_PX_PER_SEC * dt * (direction === "up" ? 1 : -1);
        offsetRef.current = wrapOffset(offsetRef.current + delta);
        applyOffset();
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearInterval(remeasureId);
      column.removeEventListener("wheel", onWheel);
      mobileQuery.removeEventListener("change", onMobileChange);
      resizeObserver.disconnect();
      track.querySelectorAll("img").forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
    };
  }, [direction, items.length]);

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobileRef.current) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    pointerActiveRef.current = true;
    dragStartYRef.current = event.clientY;
    dragStartOffsetRef.current = offsetRef.current;
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobileRef.current) return;
    if (!pointerActiveRef.current) return;

    const delta = event.clientY - dragStartYRef.current;
    if (!draggingRef.current && Math.abs(delta) < DRAG_THRESHOLD_PX) return;

    const column = columnRef.current;
    if (!column) return;

    if (!draggingRef.current) {
      draggingRef.current = true;
      column.setPointerCapture(event.pointerId);
    }

    offsetRef.current = wrapOffset(dragStartOffsetRef.current - delta);
    applyOffset();
  };

  const endPointer = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isMobileRef.current) return;
    if (draggingRef.current) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    draggingRef.current = false;
    pointerActiveRef.current = false;
  };

  return (
    <div className="feed-column-wrap">
      <div
        className="feed-column"
        onPointerCancel={endPointer}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerLeave={endPointer}
        onPointerUp={endPointer}
        ref={columnRef}
      >
        <div className="feed-track" ref={trackRef}>
          {items.map((collection, index) => (
            <GalleryPreviewCard
              collection={collection}
              key={`${direction}-${collection.slug}-${index}`}
            />
          ))}
          {items.map((collection, index) => (
            <div
              aria-hidden="true"
              className="feed-card-duplicate"
              key={`${direction}-dup-${collection.slug}-${index}`}
            >
              <GalleryPreviewCard collection={collection} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

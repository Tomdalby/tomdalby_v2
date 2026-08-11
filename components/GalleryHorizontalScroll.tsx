"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PhotoItem } from "@/data/collections";

type GalleryHorizontalScrollProps = {
  /** Used for aria-label only. */
  title: string;
  items: PhotoItem[];
};

const USER_SCROLL_IDLE_MS = 1800;
const DRAG_THRESHOLD_PX = 8;

/** Seamless horizontal strip; auto-drifts left via transform; horizontal wheel + drag override. */
export default function GalleryHorizontalScroll({ title, items }: GalleryHorizontalScrollProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const halfRef = useRef(0);
  const trackReadyRef = useRef(false);
  const userScrollingRef = useRef(false);
  const userScrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const draggingRef = useRef(false);
  const pointerActiveRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragAxisRef = useRef<"x" | "y" | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartYRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const images = items.filter((item) => item.kind !== "pdf");
  const loop = [...images, ...images];
  const loopDurationSec = Math.max(images.length * 10, 120);

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
    track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
  };

  const markUserScrolling = () => {
    userScrollingRef.current = true;
    if (userScrollTimeoutRef.current) {
      clearTimeout(userScrollTimeoutRef.current);
    }
    userScrollTimeoutRef.current = setTimeout(() => {
      userScrollingRef.current = false;
    }, USER_SCROLL_IDLE_MS);
  };

  const nudge = (deltaPx: number) => {
    offsetRef.current = wrapOffset(offsetRef.current + deltaPx);
    applyOffset();
    markUserScrolling();
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enableAutoScroll = !reducedMotion;

    const measure = () => {
      halfRef.current = track.scrollWidth / 2;
      const ready = halfRef.current > 100;
      trackReadyRef.current = ready;
      if (ready) {
        offsetRef.current = wrapOffset(offsetRef.current);
        applyOffset();
      }
      return ready;
    };

    measure();

    const resizeObserver = new ResizeObserver(() => {
      measure();
    });
    resizeObserver.observe(track);

    let rafId = 0;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (
        enableAutoScroll &&
        trackReadyRef.current &&
        !userScrollingRef.current &&
        !draggingRef.current
      ) {
        const half = halfRef.current;
        if (half > 0) {
          offsetRef.current = wrapOffset(
            offsetRef.current + (half / loopDurationSec) * dt
          );
          applyOffset();
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      if (userScrollTimeoutRef.current) {
        clearTimeout(userScrollTimeoutRef.current);
      }
    };
  }, [loopDurationSec]);

  // Non-passive touch/pointer listeners so horizontal swipes work on mobile
  // without killing vertical page scroll (axis lock after a short threshold).
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const resetPointer = () => {
      draggingRef.current = false;
      pointerActiveRef.current = false;
      pointerIdRef.current = null;
      dragAxisRef.current = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerActiveRef.current = true;
      pointerIdRef.current = event.pointerId;
      dragAxisRef.current = null;
      draggingRef.current = false;
      dragStartXRef.current = event.clientX;
      dragStartYRef.current = event.clientY;
      dragStartOffsetRef.current = offsetRef.current;
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!pointerActiveRef.current) return;
      if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) return;

      const dx = event.clientX - dragStartXRef.current;
      const dy = event.clientY - dragStartYRef.current;

      if (!dragAxisRef.current) {
        if (Math.abs(dx) < DRAG_THRESHOLD_PX && Math.abs(dy) < DRAG_THRESHOLD_PX) return;
        dragAxisRef.current = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        if (dragAxisRef.current === "x") {
          draggingRef.current = true;
          viewport.setPointerCapture(event.pointerId);
          markUserScrolling();
        }
      }

      if (dragAxisRef.current !== "x") return;

      event.preventDefault();
      offsetRef.current = wrapOffset(dragStartOffsetRef.current - dx);
      applyOffset();
      markUserScrolling();
    };

    const onPointerUp = (event: PointerEvent) => {
      if (pointerIdRef.current !== null && event.pointerId !== pointerIdRef.current) return;
      if (draggingRef.current) {
        try {
          viewport.releasePointerCapture(event.pointerId);
        } catch {
          // ignore if capture was already released
        }
        markUserScrolling();
      }
      resetPointer();
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    // passive: false so preventDefault works while dragging horizontally on iOS/Android
    viewport.addEventListener("pointermove", onPointerMove, { passive: false });
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);

    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // Only the horizontal wheel (secondary / tilt) drives the carousel.
    // Vertical main-wheel scroll is left alone so the page can scroll.
    if (Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    if (Math.abs(event.deltaX) < 0.5) return;
    event.preventDefault();
    nudge(event.deltaX);
  };

  return (
    <section
      aria-label={`${title} carousel`}
      className="gallery-layout layout-horizontal-scroll"
    >
      <div
        className="horizontal-scroll-viewport"
        onWheel={onWheel}
        ref={viewportRef}
      >
        <div className="horizontal-scroll-track" ref={trackRef}>
          {loop.map((item, index) => {
            const isDuplicate = index >= images.length;

            return (
              <div
                aria-hidden={isDuplicate || undefined}
                className="horizontal-scroll-item"
                key={`${item.src}-${index}`}
              >
                <Image
                  alt={isDuplicate ? "" : item.alt}
                  draggable={false}
                  height={1000}
                  onLoadingComplete={() => {
                    const track = trackRef.current;
                    if (!track) return;
                    halfRef.current = track.scrollWidth / 2;
                    trackReadyRef.current = halfRef.current > 100;
                  }}
                  sizes="(max-width: 900px) 45vh, 36vh"
                  src={item.src}
                  width={800}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

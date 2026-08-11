/** Collection gallery layout. `adaptive` = 2-column grid where landscape images span the full row. */
export type LayoutType =
  | "masonry"
  | "grid"
  | "columns"
  | "full-bleed"
  | "adaptive"
  | "horizontal-scroll";

export type PhotoItem = {
  src: string;
  alt: string;
  /** Use `"pdf"` to embed a PDF from `public/` (omit or `"image"` for photos). */
  kind?: "image" | "pdf";
};

export type PhotoCollection = {
  slug: string;
  title: string;
  description: string;
  /** Public URL; use `collectionImage(folder, file)` for readable paths. */
  coverImage: string;
  layoutType: LayoutType;
  images: PhotoItem[];
  /**
   * Optional images for the horizontal-scroll strip (`layoutType: "horizontal-scroll"`).
   * When set, `images` is used for the adaptive gallery below the carousel.
   */
  carouselImages?: PhotoItem[];
  /**
   * Optional manual cover-image picks for the homepage feed.
   * If omitted, the homepage shows two cards per collection: the main `coverImage`
   * and an auto-picked second photo from `images`.
   * If provided, the homepage shows exactly one card per entry in this array,
   * each using that image as its cover. All cards still link to the same collection page.
   */
  homeCovers?: string[];
  /**
   * Optional extra class names for specific homepage cover cards, keyed by cover image URL
   * (same string as in `homeCovers`). Use for one-off overlay positioning tweaks.
   */
  homeCoverCardClass?: Record<string, string>;
  /**
   * Optional horizontal "hero" image shown at the top of the collection page.
   * If omitted, the collection page uses `coverImage` as the hero.
   * Pick a wide image (or one that crops well to ~21:9) since it's cropped wide.
   */
  heroImage?: string;
  /**
   * Optional focus point for the hero crop, expressed as a CSS `object-position` value.
   * The first value is horizontal, the second is vertical.
   * Examples:
   *   "center center"  (default — middle of the image)
   *   "center top"     (anchor to the top)
   *   "center 30%"     (favor the upper third)
   *   "75% center"     (favor the right side)
   *   "20% 40%"        (any specific point)
   */
  heroFocus?: string;
  /** Homepage-only: extra class for a specific preview card (set in `cardsForCollection`). */
  previewCardClass?: string;
};

/**
 * Build `/images/collections/...` from readable folder + file names (spaces are fine).
 * Use for `coverImage`, `heroImage`, and `images[].src` instead of hand-encoded `%20` paths.
 */
export function collectionImage(folder: string, file: string): string {
  return `/images/collections/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}

/** Build a nested path under `/images/collections/` (e.g. folder + subfolder + file). */
export function collectionImagePath(...segments: string[]): string {
  return `/images/collections/${segments.map(encodeURIComponent).join("/")}`;
}

/**
 * Gallery order — edit the `*GalleryFiles` arrays below to reorder photos.
 * Each entry is the exact filename from public/images/collections/{folder}/.
 * Move lines up/down (Option+↑/↓); keep commas between entries.
 */

/** public/images/collections/Wald Hunters/ */
const waldHuntersGalleryFiles = [
  "Hunters-2.jpg",
  "Hunters-4.jpg",
  "Hunters-6.jpg",
  "Hunters-7.jpg",
  "Hunters-9.jpg",
  "Hunters-10.jpg",
  "Hunters-11.jpg",
  "Hunters-12.jpg",
  "Hunters-15.jpg",
  "Hunters-16.jpg",
  "Hunters-17.jpg",
  "Hunters-18.jpg",
  "Hunters-19.jpg",
  "Hunters-20.jpg",
  "Hunters-21.jpg",
  "Hunters-22.jpg",
  "Hunters-26.jpg",
  "Hunters-28.jpg",
  "Hunters-29.jpg",
  "Hunters-30.jpg",
  "Hunters-31.jpg",
  "Hunters-32.jpg",
  "Hunters-33.jpg",
  "Hunters-34.jpg",
  "Hunters-35.jpg"
] as const;

/** public/images/collections/Wald Hunters/Carosel/ */
const waldHuntersCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg",
  "4x5-Instagram-Carosel-copy_18.jpg",
  "4x5-Instagram-Carosel-copy_19.jpg",
  "4x5-Instagram-Carosel-copy_20.jpg"
] as const;

/** public/images/collections/Bergwelten Helicopter/ */
const bergweltenGalleryFiles = [
  "Bergwelten Helicopter website-1.jpg",
  "Bergwelten Helicopter website-2.jpg",
  "Bergwelten Helicopter website-3.jpg",
  "Bergwelten Helicopter website-4.jpg",
  "Bergwelten Helicopter website-5.jpg",
  "Bergwelten Helicopter website-6.jpg",
  "Bergwelten Helicopter website-7.jpg",
  "Bergwelten Helicopter website-8.jpg",
  "Bergwelten Helicopter website-9.jpg",
  "Bergwelten Helicopter website-10.jpg",
  "Bergwelten Helicopter website-11.jpg",
  "Bergwelten Helicopter website-12.jpg",
  "Bergwelten Helicopter website-13.jpg",
  "Bergwelten Helicopter website-14.jpg",
  "Bergwelten Helicopter website-15.jpg",
  "Bergwelten Helicopter website-16.jpg",
  "Bergwelten Helicopter website-17.jpg",
  "Bergwelten Helicopter website-18.jpg",
  "Bergwelten Helicopter website-30.jpg",
  "Bergwelten Helicopter website-31.jpg",
  "Bergwelten Helicopter website-32.jpg"
] as const;

/** public/images/collections/Bergwelten Helicopter/Carosel/ */
const bergweltenHelicopterCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg",
  "4x5-Instagram-Carosel-copy_18.jpg",
  "4x5-Instagram-Carosel-copy_19.jpg",
  "4x5-Instagram-Carosel-copy_20.jpg"
] as const;

/** public/images/collections/Baby Baby/ */
const babyBabyGalleryFiles = [
  "Baby baby -9.jpg",
  "Baby baby -1.jpg",
  "Baby baby -2.jpg",
  "Baby baby -5.jpg",
  "Baby baby -4.jpg",
  "Baby baby -3.jpg",
  "Baby baby -6.jpg",
  "Baby baby -8.jpg",
  "Baby baby -7.jpg",
] as const;

/** public/images/collections/Baby Baby/Carosel/ */
const babyBabyCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg"
] as const;

/** public/images/collections/James Giddy Artist/ */
const jamesGiddyArtistGalleryFiles = [
  "James Giddy Artist-1.jpg",
  "James Giddy Artist-17.jpg",
  "James Giddy Artist-4.jpg",
  "James Giddy Artist-5.jpg",
  "James Giddy Artist-3.jpg",
  "James Giddy Artist-2.jpg",
  "James Giddy Artist-6.jpg",
  "James Giddy Artist-13.jpg",
  "James Giddy Artist-7.jpg",
  "James Giddy Artist-8.jpg",
  "James Giddy Artist-9.jpg",
  "James Giddy Artist-10.jpg",
  "James Giddy Artist-11.jpg",
  "James Giddy Artist-12.jpg",
  "James Giddy Artist-14.jpg",
  "James Giddy Artist-15.jpg",
  "James Giddy Artist-16.jpg",
] as const;

/** public/images/collections/Moonlight Breakfast/ */
const moonlightBreakfastGalleryFiles = [
  "Moonlight Breakfast-10.jpg",
  "Moonlight Breakfast-6.jpg",
  "Moonlight Breakfast-2.jpg",
  "Moonight -1.jpg",
  "Moonlight Breakfast-1.jpg",
  "Moonlight Breakfast-3.jpg",
  "Moonlight Breakfast-4.jpg",
  "Moonlight Breakfast-5.jpg",
  "Moonlight Breakfast-7.jpg",
  "Moonlight Breakfast-8.jpg",
  "Moonlight Breakfast-9.jpg",
  "Moonlight Breakfast-11.jpg",
  "Moonlight Breakfast-13.jpg",
  "Moonlight Breakfast-16-1.jpg",
  "Moonlight Breakfast-15.jpg",
] as const;

/** public/images/collections/Moonlight Breakfast/Carosel/ */
const moonlightBreakfastCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg"
] as const;

/** public/images/collections/Zwettler/ */
const zwettlerGalleryFiles = [
  "250707_ZW_Social_Image-AD-Feed_Meta_4x5.jpg",
  "250709_ZW_Social_Image-AD-Feed_Meta_4x5.jpg",
  "Zwettler -14.jpg",
  "Zwettler -13.jpg", 
  "Zwettler -8.jpg",
  "Zwettler -9.jpg",
  "250709_ZW_Social_Image-AD-Feed-2_Meta_4x5.jpg",
  "96175_Zwettler_16BG_ICv2_x4.jpg",
  "96175_Zwettler_24BG_ICv2_x4 copy.jpg",
  "Zwettler -1.jpg",
  "Zwettler -1-2.jpg",
  "Zwettler -10.jpg",
  "Zwettler -11.jpg",
  "Zwettler -12.jpg",
  "Zwettler -15.jpg",
  "Zwettler -2.jpg",
  "Zwettler -3.jpg",
  "Zwettler -4.jpg",
  "Zwettler -5.jpg",
  "Zwettler -6.jpg",
  "Zwettler -7.jpg",
] as const;

/** public/images/collections/Zwettler/Carosel/ */
const zwettlerCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg",
  "4x5-Instagram-Carosel-copy_18.jpg",
  "4x5-Instagram-Carosel-copy_19.jpg",
  "4x5-Instagram-Carosel-copy_20.jpg"
] as const;

/** public/images/collections/De Morgen/Carosel/ */
const deMorgenCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg",
  "4x5-Instagram-Carosel-copy_18.jpg",
  "4x5-Instagram-Carosel-copy_19.jpg"
] as const;

/** public/images/collections/De Morgen/ */
const deMorgenGalleryFiles = [
  "20260521-_DSF4307.jpg",
  "20260520-_DSF3726.jpg",
  "20260520-_DSF3741.jpg",
  "20260521-_DSF4542.jpg",
  "20260523-_DSF4835.jpg",
  "20260521-_DSF4148.jpg",
  "20260521-_DSF3775.jpg",
  "20260521-_DSF3965.jpg",
  "20260521-_DSF3982.jpg",
  "20260521-DSCF2762.jpg",
  "20260521-_DSF3800.jpg",
  "20260521-_DSF3897.jpg",
  "20260521-_DSF3939.jpg",
  "20260521-_DSF4037.jpg",
  "20260521-_DSF4063.jpg",
  "20260521-_DSF4351.jpg",
  "20260521-_DSF4384.jpg",
  "20260522-_DSF4658.jpg",
  "20260522-_DSF4700.jpg",
  "20260522-_DSF4710.jpg",
  "20260523-DSCF2957.jpg",
  "20260523-_DSF4762.jpg",
  "20260523-_DSF5022.jpg",
  "20260523-_DSF5047.jpg"
] as const;

/** public/images/collections/Southern River Band/CAROSEL/ */
const southernRiverBandCarouselFiles = [
  "SRB-1.jpg",
  "SRB-2.jpg",
  "SRB-3.jpg",
  "SRB-4.jpg",
  "SRB-5.jpg",
  "SRB-6.jpg",
  "SRB-7.jpg",
  "SRB-8.jpg",
  "SRB-9.jpg",
  "SRB-10.jpg",
  "SRB-11.jpg",
  "SRB-12.jpg",
  "SRB-13.jpg",
  "SRB-14.jpg",
  "SRB-15.jpg",
  "SRB-16.jpg",
  "SRB-17.jpg",
  "SRB-18.jpg",
  "SRB-19.jpg",
  "SRB-20.jpg"
] as const;

/** public/images/collections/Southern River Band/ */
const southernRiverBandGalleryFiles = [
  "SRB digital-9.jpg",
  "SRB digital-13.jpg",
  "SRB digital-8.jpg",
  "SRB digital-1.jpg",
  "SRB digital-2.jpg",
  "SRB digital-3.jpg",
  "SRB digital-4.jpg",
  "SRB digital-6.jpg",
  "SRB digital-7.jpg",
  "SRB digital-10.jpg",
  "SRB digital-12.jpg",
  "SRB digital-14.jpg",
  "SRB digital-15.jpg",
  "SRB digital-16.jpg",
  "SRB digital-17.jpg",
  "SRB digital-18.jpg",
  "SRB digital-19.jpg",
  "SRB-1.jpg",
  "SRB-2.jpg",
  "SRB-3.jpg",
  "SRB-4.jpg",
  "SRB-5.jpg",
  "SRB-6.jpg",
  "SRB-7.jpg",
  "SRB-8.jpg",
  "SRB-9.jpg",
  "SRB-10.jpg",
  "SRB-11.jpg",
  "SRB-12.jpg",
  "SRB-13.jpg",
  "SRB-14.jpg",
  "SRB-15.jpg",
  "SRB-16.jpg",
  "SRB-17.jpg",
  "SRB-18.jpg",
  "SRB-19.jpg",
  "SRB-20.jpg",
  "SRB-21.jpg",
  "SRB-22.jpg"
] as const;

/** public/images/collections/Die Busen Freundin/Busen Carosel/ */
const dieBusenFreundinCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg"
] as const;

/** public/images/collections/Die Busen Freundin/ */
const dieBusenFreundinGalleryFiles = [
  "Busen5.jpg",
  "Busen17.jpg",
  "Busen-1.jpg",
  "Busen13.jpg",
  "Busen19.jpg",
  "Busen6.jpg",
  "Busen8.jpg",
  "Busen15.jpg",
  "Busen4.jpg",
  "Busen18.jpg",
  "Busen1.jpg",
  "Busen2.jpg",
  "Busen3.jpg",
  "Busen7.jpg",
  "Busen9.jpg",
  "Busen10.jpg",
  "Busen11.jpg",
  "Busen12.jpg",
  "Busen14.jpg",
  "Busen16.jpg",
  "Busen20.jpg",
] as const;

/** public/images/collections/Augustinerhütte/Carosel/ */
const augustinerhutteCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg"
] as const;

/** public/images/collections/Augustinerhütte/ */
const augustinerhutteGalleryFiles = [
  "Augustinerhütte OUTTAKES-1.jpg",
  "Augustinerhütte OUTTAKES-1-2.jpg",
  "Augustinerhütte OUTTAKES-1-3.jpg",
  "Augustinerhütte OUTTAKES-1-4.jpg",
  "Augustinerhütte OUTTAKES-1-5.jpg",
  "Augustinerhütte OUTTAKES-1-6.jpg",
  "Augustinerhütte OUTTAKES-1-7.jpg",
  "Augustinerhütte OUTTAKES-1-8.jpg",
  "Augustinerhütte OUTTAKES-1-9.jpg",
  "Augustinerhütte OUTTAKES-1-10.jpg"
] as const;

/** public/images/collections/Winter Quiet/ */
const winterQuietGalleryFiles = [
  "01.svg",
  "02.svg",
  "03.svg",
  "04.svg"
] as const;

/** public/images/collections/Stuffed Animals - Wald/Carosel/images/images/ */
const stuffedAnimalsWaldCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg",
  "4x5-Instagram-Carosel-copy_18.jpg",
  "4x5-Instagram-Carosel-copy_19.jpg",
  "4x5-Instagram-Carosel-copy_20.jpg"
] as const;

/** public/images/collections/Stuffed Animals - Wald/ */
const stuffedAnimalsWaldGalleryFiles = [
  "00_Wald58_Cover copy.jpg",
  "Stuffed Animals-7.jpg",
  "18_präparatorenRedMH copy.jpg",
  "Stuffed Animals-8.jpg",
  "Stuffed Animals-16.jpg",
  "Stuffed Animals-12.jpg",
  "Stuffed Animals-13.jpg",
  "Stuffed Animals-2.jpg",
  "Stuffed Animals-1.jpg",
  "Stuffed Animals-3.jpg",
  "Stuffed Animals-4.jpg",
  "Stuffed Animals-5.jpg",
  "Stuffed Animals-6.jpg",
  "Stuffed Animals-9.jpg",
  "Stuffed Animals-10.jpg",
  "Stuffed Animals-11.jpg",
  "Stuffed Animals-14.jpg",
  "Stuffed Animals-18.jpg",
  "Stuffed Animals-19.jpg",
  "Stuffed Animals-20.jpg",
  "Stuffed Animals-21.jpg",
  "Stuffed Animals-22.jpg",
  "Stuffed Animals-23.jpg",
] as const;

/** public/images/collections/Mwita - Austro Pop/Carosel/images/ */
const mwitaAstroPopCarouselFiles = [
  "4x5-Instagram-Carosel-copy_01.jpg",
  "4x5-Instagram-Carosel-copy_02.jpg",
  "4x5-Instagram-Carosel-copy_03.jpg",
  "4x5-Instagram-Carosel-copy_04.jpg",
  "4x5-Instagram-Carosel-copy_05.jpg",
  "4x5-Instagram-Carosel-copy_06.jpg",
  "4x5-Instagram-Carosel-copy_07.jpg",
  "4x5-Instagram-Carosel-copy_08.jpg",
  "4x5-Instagram-Carosel-copy_09.jpg",
  "4x5-Instagram-Carosel-copy_10.jpg",
  "4x5-Instagram-Carosel-copy_11.jpg",
  "4x5-Instagram-Carosel-copy_12.jpg",
  "4x5-Instagram-Carosel-copy_13.jpg",
  "4x5-Instagram-Carosel-copy_14.jpg",
  "4x5-Instagram-Carosel-copy_15.jpg",
  "4x5-Instagram-Carosel-copy_16.jpg",
  "4x5-Instagram-Carosel-copy_17.jpg",
  "4x5-Instagram-Carosel-copy_18.jpg",
  "4x5-Instagram-Carosel-copy_19.jpg",
  "4x5-Instagram-Carosel-copy_20.jpg"
] as const;

/** public/images/collections/Mwita - Austro Pop/ */
const mwitaAstroPopGalleryFiles = [
  "MWITA QUARRY-1.jpg",
  "MWITA QUARRY-2.jpg",
  "MWITA QUARRY-3.jpg",
  "MWITA QUARRY-4.jpg",
  "MWITA QUARRY-5.jpg",
  "MWITA QUARRY-6.jpg",
  "MWITA QUARRY-7.jpg",
  "MWITA QUARRY-8.jpg",
  "MWITA QUARRY-9.jpg",
  "MWITA QUARRY-10.jpg",
  "MWITA QUARRY-11.jpg",
  "MWITA QUARRY-12.jpg",
  "MWITA QUARRY-13.jpg",
  "MWITA QUARRY-15.jpg",
  "MWITA QUARRY-16.jpg",
  "MWITA QUARRY-17.jpg",
  "MWITA QUARRY-18.jpg",
  "MWITA QUARRY-19.jpg",
  "MWITA QUARRY-20.jpg",
  "MWITA QUARRY-21.jpg",
  "MWITA QUARRY-22.jpg",
  "MWITA QUARRY-23.jpg",
  "MWITA QUARRY-24.jpg",
  "MWITA QUARRY-25.jpg",
  "MWITA QUARRY-26.jpg",
  "MWITA QUARRY-27.jpg",
  "MWITA QUARRY-28.jpg",
] as const;

export const collections: PhotoCollection[] = [
  {
    slug: "zwettler",
    title: "Zwettler",
    description: "Selected work from the Zwettler series.",
    coverImage: collectionImage("Zwettler", "NR. 130 R1.5.jpg"),
    homeCovers: [
      collectionImage("Zwettler", "NR. 130 R1.5.jpg"),
      collectionImage("Zwettler", "250709_ZW_Social_Image-AD-Feed_Meta_4x5.jpg")
    ],
    homeCoverCardClass: {
      [collectionImage(
        "Zwettler",
        "250709_ZW_Social_Image-AD-Feed_Meta_4x5.jpg"
      )]: "preview-card--zwettler-no-title"
    },
    heroFocus: "center 50%",
    layoutType: "horizontal-scroll",
    carouselImages: zwettlerCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Zwettler", "Carosel", file),
      alt: `Zwettler — carousel ${i + 1}`
    })),
    images: zwettlerGalleryFiles.map((file, i) => ({
      src: collectionImage("Zwettler", file),
      alt: `Zwettler — photo ${i + 1}`
    }))
  },
  {
    slug: "wald-hunters",
    title: "Wald Hunters",
    description: "Wald Hunters",
    coverImage: collectionImage("Wald Hunters", "Wald Hunters-4.jpg"),
    homeCovers: [
      collectionImage("Wald Hunters", "Wald Hunters-4.jpg"),
      collectionImage("Wald Hunters", "Wald Hunters-7.jpg")
    ],
    // heroFocus: "center 100%",
    layoutType: "horizontal-scroll",
    carouselImages: waldHuntersCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Wald Hunters", "Carosel", file),
      alt: `Wald Hunters — carousel ${i + 1}`
    })),
    images: waldHuntersGalleryFiles.map((file, i) => ({
      src: collectionImage("Wald Hunters", file),
      alt: `Wald Hunters — photo ${i + 1}`
    }))
  },
  {
    slug: "bergwelten-helicopter",
    title: "Jede Minute Zählt",
    description: "Bergwelten - Mountain Rescue",
    coverImage: collectionImage("Bergwelten Helicopter", "Bergwelten Helicopter website-5.jpg"),
    homeCovers: [
      collectionImage("Bergwelten Helicopter", "Bergwelten Helicopter website-5.jpg"),
      collectionImage("Bergwelten Helicopter", "Bergwelten Helicopter website-2.jpg")
    ],
    layoutType: "horizontal-scroll",
    heroFocus: "center 25%",
    carouselImages: bergweltenHelicopterCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Bergwelten Helicopter", "Carosel", file),
      alt: `Jede Minute Zählt — carousel ${i + 1}`
    })),
    images: bergweltenGalleryFiles.map((file, i) => ({
      src: collectionImage("Bergwelten Helicopter", file),
      alt: `Bergwelten Helicopter — photo ${i + 1}`
    }))
  },
  {
    slug: "baby-baby",
    title: "Baby Baby",
    description: "Celebrating Birth",
    coverImage: collectionImage("Baby Baby", "Baby baby -1.jpg"),
    homeCovers: [
      collectionImage("Baby Baby", "Baby baby -1.jpg"),
      collectionImage("Baby Baby", "Baby baby -5.jpg")
    ],
    heroFocus: "center 45%",
    layoutType: "horizontal-scroll",
    carouselImages: babyBabyCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Baby Baby", "Carosel", file),
      alt: `Baby Baby — carousel ${i + 1}`
    })),
    images: babyBabyGalleryFiles.map((file, i) => ({
      src: collectionImage("Baby Baby", file),
      alt: `Baby Baby — photo ${i + 1}`
    }))
  },
  {
    slug: "james-giddy-artist",
    title: "James Giddy Artist",
    description: "Artist portraits",
    coverImage: collectionImage("James Giddy Artist", "James Giddy Artist-16.jpg"),
    homeCovers: [
      collectionImage("James Giddy Artist", "James Giddy Artist-15.jpg"),
      collectionImage("James Giddy Artist", "James Giddy Artist-16.jpg")
    ],
    layoutType: "adaptive",
    heroFocus: "center 25%",
    images: jamesGiddyArtistGalleryFiles.map((file, i) => ({
      src: collectionImage("James Giddy Artist", file),
      alt: `James Giddy Artist — photo ${i + 1}`
    }))
  },
  {
    slug: "moonlight-breakfast",
    title: "Moonlight Breakfast",
    description: "Romanian Indie Duo",
    coverImage: collectionImage("Moonlight Breakfast", "Moonlight Breakfast-5.jpg"),
    homeCovers: [
      collectionImage("Moonlight Breakfast", "Moonlight Breakfast-6.jpg"),
      collectionImage("Moonlight Breakfast", "Moonlight Breakfast-10.jpg")
    ],
    heroFocus: "center 35%",
    layoutType: "horizontal-scroll",
    carouselImages: moonlightBreakfastCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Moonlight Breakfast", "Carosel", file),
      alt: `Moonlight Breakfast — carousel ${i + 1}`
    })),
    images: moonlightBreakfastGalleryFiles.map((file, i) => ({
      src: collectionImage("Moonlight Breakfast", file),
      alt: `Moonlight Breakfast — photo ${i + 1}`
    }))
  },
  {
    slug: "de-morgen",
    title: "36 Hours In Vienna",
    description: "De Morgen News Paper.",
    coverImage: collectionImagePath("De Morgen", "20260523-_DSF4835.jpg"),
    homeCovers: [
      collectionImagePath("De Morgen", "20260523-_DSF4835.jpg"),
      collectionImagePath("De Morgen", "20260521-_DSF3965.jpg")
    ],
    heroFocus: "center 70%",
    layoutType: "horizontal-scroll",
    carouselImages: deMorgenCarouselFiles.map((file, i) => ({
      src: collectionImagePath("De Morgen", "Carosel", file),
      alt: `De Morgen — carousel ${i + 1}`
    })),
    images: deMorgenGalleryFiles.map((file, i) => ({
      src: collectionImagePath("De Morgen", file),
      alt: `De Morgen — photo ${i + 1}`
    }))
  },
  {
    slug: "southern-river-band",
    title: "Southern River Band",
    description: "Southern River Band.",
    coverImage: collectionImage("Southern River Band", "SRB digital-2.jpg"),
    homeCovers: [
      collectionImage("Southern River Band", "SRB digital-13.jpg"),
      collectionImage("Southern River Band", "SRB-2.jpg")
    ],
    homeCoverCardClass: {
      // Dark text only on the light guitar-case cover (right column).
      // Left cover is dark — leave default light text so the title stays visible.
      [collectionImage("Southern River Band", "SRB-2.jpg")]:
        "preview-card--southern-river-band"
    },
    layoutType: "horizontal-scroll",
    carouselImages: southernRiverBandCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Southern River Band", "CAROSEL", file),
      alt: `Southern River Band — carousel ${i + 1}`
    })),
    images: southernRiverBandGalleryFiles.map((file, i) => ({
      src: collectionImage("Southern River Band", file),
      alt: `Southern River Band — photo ${i + 1}`
    }))
  },
  {
    slug: "die-busen-freundin",
    title: "Die Busen Freundin",
    description: "Fashion, Lifestyle, and Home Decor",
    coverImage: collectionImagePath(
      "Die Busen Freundin",
      "Busen23.jpg"
    ),
    homeCovers: [
      collectionImagePath("Die Busen Freundin", "Busen21.jpg"),
      collectionImagePath("Die Busen Freundin", "Busen5.jpg")
    ],
    layoutType: "horizontal-scroll",
    heroFocus: "center 80%",
    carouselImages: dieBusenFreundinCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Die Busen Freundin", "Busen Carosel", file),
      alt: `Die Busen Freundin — carousel ${i + 1}`
    })),
    images: dieBusenFreundinGalleryFiles.map((file, i) => ({
      src: collectionImage("Die Busen Freundin", file),
      alt: `Die Busen Freundin — photo ${i + 1}`
    }))
  },
  {
    slug: "augustinerhutte",
    title: "Augustinerhütte",
    description: "Augustinerhütte.",
    coverImage: collectionImagePath(
      "Augustinerhütte",
      "Augustinerhütte OUTTAKES-1-7.jpg"
    ),
    homeCovers: [
      collectionImagePath("Augustinerhütte", "Augustinerhütte OUTTAKES-1-4.jpg"),
      collectionImagePath("Augustinerhütte", "Augustinerhütte OUTTAKES-1-6.jpg")
    ],
    layoutType: "horizontal-scroll",
    carouselImages: augustinerhutteCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Augustinerhütte", "Carosel", file),
      alt: `Augustinerhütte — carousel ${i + 1}`
    })),
    images: augustinerhutteGalleryFiles.map((file, i) => ({
      src: collectionImage("Augustinerhütte", file),
      alt: `Augustinerhütte — photo ${i + 1}`
    }))
  },
  {
    slug: "stuffed-animals-wald",
    title: "Stuffed Animals - Wald",
    description: "Stuffed Animals - Wald",
    coverImage: collectionImage("Stuffed Animals - Wald", "Stuffed Animals-8.jpg"),
    homeCovers: [
      collectionImagePath(
        "Stuffed Animals - Wald",
        "00_Wald58_Cover copy.jpg"
      ),
      collectionImagePath(
        "Stuffed Animals - Wald",
        "Stuffed Animals-24.jpg"
      )
    ],
    homeCoverCardClass: {
      [collectionImagePath(
        "Stuffed Animals - Wald",
        "00_Wald58_Cover copy.jpg"
      )]: "preview-card--stuffed-flamingo-cover"
    },
    layoutType: "horizontal-scroll",
    heroFocus: "center 40%",
    carouselImages: stuffedAnimalsWaldCarouselFiles.map((file, i) => ({
      src: collectionImagePath(
        "Stuffed Animals - Wald",
        "Carosel",
        "images",
        "images",
        file
      ),
      alt: `Stuffed Animals - Wald — carousel ${i + 1}`
    })),
    images: stuffedAnimalsWaldGalleryFiles.map((file, i) => ({
      src: collectionImage("Stuffed Animals - Wald", file),
      alt: `Stuffed Animals - Wald — photo ${i + 1}`
    }))
  },
  {
    slug: "mwita-astro-pop",
    title: "MWITA - Astro Pop",
    description: "MWITA - Astro Pop.",
    coverImage: collectionImagePath(
      "Mwita - Austro Pop",
      "MWITA HEADER PIC.jpg"
    ),
    homeCovers: [
      collectionImagePath(
        "Mwita - Austro Pop",
        "MWITA QUARRY-12.jpg"
      ),
      collectionImagePath(
        "Mwita - Austro Pop",
        "MWITA QUARRY-15.jpg"
      )
    ],
    layoutType: "horizontal-scroll",
    heroFocus: "center 65%",
    carouselImages: mwitaAstroPopCarouselFiles.map((file, i) => ({
      src: collectionImagePath("Mwita - Austro Pop", "Carosel", "images", file),
      alt: `MWITA - Astro Pop — carousel ${i + 1}`
    })),
    images: mwitaAstroPopGalleryFiles.map((file, i) => ({
      src: collectionImage("Mwita - Austro Pop", file),
      alt: `MWITA - Astro Pop — photo ${i + 1}`
    }))
  }
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((collection) => collection.slug === slug);

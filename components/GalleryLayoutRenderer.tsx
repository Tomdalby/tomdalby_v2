import GalleryAdaptiveFigure from "@/components/GalleryAdaptiveFigure";
import GalleryHorizontalScroll from "@/components/GalleryHorizontalScroll";
import { PhotoCollection } from "@/data/collections";

type GalleryLayoutRendererProps = {
  collection: PhotoCollection;
};

function AdaptiveGallery({
  collection,
  afterCarousel = false
}: GalleryLayoutRendererProps & { afterCarousel?: boolean }) {
  return (
    <section
      className={`gallery-layout layout-adaptive${
        afterCarousel ? " layout-adaptive-after-carousel" : ""
      }`}
    >
      {collection.images.map((item, index) => (
        <GalleryAdaptiveFigure item={item} key={`${item.src}-${index}`} />
      ))}
    </section>
  );
}

/** Orientation-aware gallery below carousel (when present) or standalone. */
export default function GalleryLayoutRenderer({ collection }: GalleryLayoutRendererProps) {
  if (collection.layoutType === "horizontal-scroll") {
    const carouselItems = collection.carouselImages ?? collection.images;

    return (
      <>
        <GalleryHorizontalScroll items={carouselItems} title={collection.title} />
        {collection.carouselImages && collection.images.length > 0 ? (
          <AdaptiveGallery afterCarousel collection={collection} />
        ) : null}
      </>
    );
  }

  return <AdaptiveGallery collection={collection} />;
}

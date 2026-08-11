import Image from "next/image";
import Link from "next/link";
import { PhotoCollection } from "@/data/collections";

type GalleryPreviewCardProps = {
  collection: PhotoCollection;
};

export default function GalleryPreviewCard({ collection }: GalleryPreviewCardProps) {
  const cardClassName = ["preview-card", collection.previewCardClass]
    .filter(Boolean)
    .join(" ");

  return (
    <Link className={cardClassName} href={`/collections/${collection.slug}`}>
      <div className="preview-image-wrap">
        <div className="preview-image-frame">
          <Image
            alt={collection.title}
            className="preview-image"
            height={1200}
            sizes="(max-width: 900px) 100vw, 50vw"
            src={collection.coverImage}
            style={{ width: "auto", height: "auto", maxWidth: "100%" }}
            width={960}
          />
          <div className="preview-overlay">
            <h2>{collection.title}</h2>
            <p>{collection.description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}

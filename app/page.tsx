import BurgerMenu from "@/components/BurgerMenu";
import MarqueeColumn from "@/components/MarqueeColumn";
import { collections, PhotoCollection } from "@/data/collections";

function cardsForCollection(collection: PhotoCollection): PhotoCollection[] {
  if (collection.homeCovers && collection.homeCovers.length > 0) {
    return collection.homeCovers.map((cover) => ({
      ...collection,
      coverImage: cover,
      previewCardClass: collection.homeCoverCardClass?.[cover]
    }));
  }

  const photos = collection.images.filter((image) => image.kind !== "pdf");
  const primary = collection.coverImage;
  const alt = photos[1]?.src ?? photos[photos.length - 1]?.src ?? primary;

  return [
    { ...collection, coverImage: primary },
    { ...collection, coverImage: alt }
  ];
}

/**
 * One card per set in each column.
 * Cover 1 → left, cover 2 → right, then rotate the right column by 1
 * so the same set is not at the top of both columns.
 */
function splitColumns(items: PhotoCollection[]) {
  const groups = items.map(cardsForCollection);
  const left: PhotoCollection[] = [];
  const right: PhotoCollection[] = [];

  for (const group of groups) {
    left.push(group[0]);
    right.push(group[1] ?? group[0]);
  }

  if (right.length > 1) {
    right.push(right.shift()!);
  }

  return { left, right };
}

export default function HomePage() {
  const { left, right } = splitColumns(collections);

  return (
    <main className="home-page">
      <BurgerMenu />
      <section className="home-feed">
        <MarqueeColumn collections={left} direction="up" />
        <MarqueeColumn collections={right} direction="down" />
      </section>
    </main>
  );
}

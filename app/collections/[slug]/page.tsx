import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BurgerMenu from "@/components/BurgerMenu";
import GalleryLayoutRenderer from "@/components/GalleryLayoutRenderer";
import { collections, getCollectionBySlug } from "@/data/collections";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const heroSrc = collection.heroImage ?? collection.coverImage;

  return (
    <main className={`collection-page collection-page--${slug}`}>
      <BurgerMenu />
      <section className="collection-hero">
        <Image
          alt={`${collection.title} — cover image`}
          className="collection-hero-image"
          fill
          priority
          sizes="100vw"
          src={heroSrc}
          style={collection.heroFocus ? { objectPosition: collection.heroFocus } : undefined}
        />
        <div aria-hidden={true} className="collection-hero-filmstrip" />
        <div className="collection-hero-overlay">
          <div className="collection-hero-text">
            <p className="collection-kicker">Photo Set</p>
            <h1>{collection.title}</h1>
            <p>{collection.description}</p>
            <Link className="back-link" href="/">
              Back to homepage
            </Link>
          </div>
        </div>
      </section>
      <GalleryLayoutRenderer collection={collection} />
    </main>
  );
}

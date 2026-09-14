import Hero from "@/components/Hero";
import TrustMarquee from "@/components/TrustMarquee";
import ProductCatalog from "@/components/ProductCatalog";
import Philosophy from "@/components/Philosophy";
import SlowBar from "@/components/SlowBar";
import ProcessSection from "@/components/ProcessSection";
import LocationSection from "@/components/LocationSection";
import Faq from "@/components/Faq";
import { getGalleryPhotos, getSiteContent } from "@/lib/cms-store";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [content, photos] = await Promise.all([getSiteContent(), getGalleryPhotos()]);
  const wa = content.settings.whatsapp;
  return (
    <>
      <Hero hero={content.hero} whatsapp={wa} photos={photos} />
      <TrustMarquee items={content.trust} />
      <ProductCatalog catalog={content.catalog} whatsapp={wa} />
      <Philosophy story={content.story} />
      <SlowBar slowbar={content.slowbar} />
      <ProcessSection process={content.process} />
      <LocationSection location={content.location} settings={content.settings} whatsapp={wa} />
      <Faq faq={content.faq} whatsapp={wa} />
    </>
  );
}

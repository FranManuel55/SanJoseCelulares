import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Products from "@/components/Products";
import PriceList from "@/components/PriceList";
import Reviews from "@/components/Reviews";
import Gallery from "@/components/Gallery";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Brands />
        <Products />
        <PriceList />
        <Reviews />
        <Gallery />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

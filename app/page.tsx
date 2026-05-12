import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import PricingTable from './components/PricingTable';
import BookingForm from './components/BookingForm';
import Gallery from './components/Gallery';
import Policy from './components/Policy';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';

export default function HomePage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Features />
      <PricingTable />
      <BookingForm />
      <Gallery />
      <Policy />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingActions />
    </main>
  );
}

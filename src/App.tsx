import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import About from '@/components/About';
import ApplyForm from '@/components/ApplyForm';
import Footer from '@/components/Footer';
import { useReveal } from '@/hooks/useReveal';

function App() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div ref={ref} className="min-h-screen bg-ink-950">
      <Header />
      <main>
        <Hero />
        <Features />
        <About />
        <ApplyForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Location from './components/Location';
import { Footer, FloatingCTA } from './components/Extras';
import CustomCursor from './components/CustomCursor';

function App() {
  return (
    <div className="bg-venus-black selection:bg-venus-gold selection:text-venus-black">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Location />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  )
}

export default App

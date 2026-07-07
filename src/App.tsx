import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';

function App() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50">
        <Home />
      </div>
      <Footer />
    </>
  );
}

export default App;
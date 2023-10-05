import { Link, useNavigate } from "react-router-dom";
import Destacados from "../components/Destacados";
import Testimonios from "../components/Testimonios";
import Equipo from "../components/Equipo";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Banner from "../components/Banner";

const Home = () => {
  const navigate = useNavigate();

  return (
    // bg-gradient-to-tl from-indigo-200  to-white
    <div className="bg-white">
      <div className="w-full h-screen">
        <Header />
        <Navbar />
        <Banner />
      </div>
      <Destacados />
      <Testimonios />
      <Equipo />
      <Footer />
    </div>
  );
};

export default Home;

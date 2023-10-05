import React from "react";

const Banner = () => {
  return (
    <section className="w-full h-screen py-14 ">
      <div className="max-w-[1240px] mx-auto flex justify-between items-center">
        <div className="basis-1/2 space-y-8 px-2">
          <div className="flex items-center space-x-4 ">
            <div className="w-[9px] h-[9px] bg-primary"></div>
            <h2>BIENVENIDO A NUESTRA COMPAÑA</h2>
          </div>
          <h1 className="font-semibold text-6xl leading-[70px]">
            Soluciones Sencillas <br /> Para
            <span className="text-primary"> Tu PC!</span>{" "}
          </h1>
          <p>
            The website design should be user-friendly, easy to navigate, and
            aesthetically pleasing. It should be optimized for fast loading
            times, and the layout should be consistent across all pages.
          </p>
          <button className="btn-primary">Descubre Más</button>
        </div>
        <div className="basis-5/12 w-full flex items-center justify-center px-2">
          <img
            src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/img-2-1.png"
            alt="imagen-section"
            className="w-full "
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;

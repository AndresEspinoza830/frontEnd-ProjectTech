import React from "react";

const Nosotros = () => {
  return (
    <section id="about" className="w-full h-screen py-14">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between">
        <div className="basis-5/12 p-3 space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-[9px] h-[9px] bg-primary"></div>{" "}
            <h2>WELCOME TO OUR COMPANY</h2>
          </div>

          <h3 className="leading-[60px]">
            We Are Increasing Business Success With Technology
          </h3>
          <p>
            An IT solution service company may serve clients from various
            industries such as healthcare, finance, education, and
            manufacturing. They may work on a project basis, providing services
            for a specific project or on a long-term basis...
          </p>
          <ul className="space-y-2 list-disc px-7">
            <li>Amazing communication.</li>
            <li>Best trending designing experience</li>
            <li>Email & Live chat.</li>
          </ul>
          <button className="btn-primary">Discover More</button>
        </div>
        <div className="relative basis-5/12 flex ">
          <img
            src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/about-image-1-1.png"
            alt=""
            className="absolute bottom-[-60px] left-[-100px] rounded-3xl border-[5px] border-white"
          />
          <img
            src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/group28.png"
            alt=""
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Nosotros;

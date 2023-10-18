import React from "react";

const Equipo = () => {
  return (
    <section className="w-full py-24">
      <div className="max-w-[1240px] mx-auto space-y-5">
        <div className="mb-8">
          <h2 className="flex items-center space-x-4 justify-center mb-5">
            <div className="w-[9px] h-[9px] bg-primary"></div>
            <span>TEAM MEMBERS</span>{" "}
            <div className="w-[9px] h-[9px] bg-primary"></div>
          </h2>
          <h3 className="text-center">Our Top Skilled Experts</h3>
        </div>
        <div className="flex justify-around group">
          <div className="basis-1/5 relative ">
            <img
              src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/img.jpg"
              alt=""
              className="w-full"
            />
            {/* <div className="w-[220px] h-[150px] absolute bg-white bottom-[14px] left-[14px] ">
              <h3 className="text-lg">Ambert Daniel</h3>
              <p>CEO & Founder</p>
            </div> */}
          </div>

          <div className="basis-1/5">
            <img
              src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/5.jpg"
              alt=""
              className="w-full"
            />
          </div>

          <div className="basis-1/5">
            <img
              src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/6.jpg"
              alt=""
              className="w-full"
            />
          </div>

          <div className="basis-1/5">
            <img
              src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/8-1.jpg"
              alt="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Equipo;

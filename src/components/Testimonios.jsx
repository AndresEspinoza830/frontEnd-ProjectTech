import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const Testimonios = () => {
  return (
    <section className="w-full py-24  bg-[url('/slider.jpg')]">
      <div className="max-w-[1240px] mx-auto space-y-5">
        <div className="flex items-center space-x-4 justify-center">
          <div className="w-[9px] h-[9px] bg-primary"></div>
          <h2 className="text-white">CLIENT TESTIMONIAL</h2>
        </div>
        <h3 className="text-white text-center">About Customer Stories</h3>
      </div>

      <div className="max-w-[1240px] mx-auto py-10">
        <Swiper
          spaceBetween={50}
          centeredSlides={true}
          slidesPerView={3}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide className=" ">
            <div className="w-full bg-white rounded-xl">
              <p className="p-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                sit voluptatibus laboriosam, nemo dolore, architecto, sapiente
                iure sequi assumenda minus impedit quos odio. Suscipit
                voluptatibus enim omnis aliquam. Odit, cupiditate.
              </p>
              <div className="bg-[#eff1f5] p-8 flex items-center space-x-7">
                <img
                  src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/testi.png"
                  alt=""
                  className="w-[70px]"
                />
                <div className="">
                  <h5 className="font-semibold text-xl">Edward Daniel</h5>
                  <p className="text-primary font-medium">Cloud Architect</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="w-full bg-white rounded-xl">
              <p className="p-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                sit voluptatibus laboriosam, nemo dolore, architecto, sapiente
                iure sequi assumenda minus impedit quos odio. Suscipit
                voluptatibus enim omnis aliquam. Odit, cupiditate.
              </p>
              <div className="bg-[#eff1f5] p-8 flex items-center space-x-7">
                <img
                  src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/testi.png"
                  alt=""
                  className="w-[70px]"
                />
                <div className="">
                  <h5 className="font-semibold text-xl">Edward Daniel</h5>
                  <p className="text-primary font-medium">Cloud Architect</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="w-full bg-white rounded-xl">
              <p className="p-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                sit voluptatibus laboriosam, nemo dolore, architecto, sapiente
                iure sequi assumenda minus impedit quos odio. Suscipit
                voluptatibus enim omnis aliquam. Odit, cupiditate.
              </p>
              <div className="bg-[#eff1f5] p-8 flex items-center space-x-7">
                <img
                  src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/testi.png"
                  alt=""
                  className="w-[70px]"
                />
                <div className="">
                  <h5 className="font-semibold text-xl">Edward Daniel</h5>
                  <p className="text-primary font-medium">Cloud Architect</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            {" "}
            <div className="w-full bg-white rounded-xl">
              <p className="p-12">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                sit voluptatibus laboriosam, nemo dolore, architecto, sapiente
                iure sequi assumenda minus impedit quos odio. Suscipit
                voluptatibus enim omnis aliquam. Odit, cupiditate.
              </p>
              <div className="bg-[#eff1f5] p-8 flex items-center space-x-7">
                <img
                  src="https://wptf.themepul.co/tronix/wp-content/uploads/2023/06/testi.png"
                  alt=""
                  className="w-[70px]"
                />
                <div className="">
                  <h5 className="font-semibold text-xl">Edward Daniel</h5>
                  <p className="text-primary font-medium">Cloud Architect</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonios;

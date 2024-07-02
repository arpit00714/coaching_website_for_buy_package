import React, { useEffect, useRef, useState } from "react";
import Navbar from "../navbar/Navbar";
import "./consultymenu.css";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";
// import { RxArrowRight } from "react-icons/rx";
import { IoIosArrowDropright, IoIosArrowDropleft } from "react-icons/io";

// Import Swiper styles
import "swiper/css";
// import Footer from '../footer/Footer'
// import { Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import { getconsultancylist } from "../URLS/getconsultancy";
import { consultancyheading } from "../URLS/consultancymenuheading";
register();

function ConsultancyMenu() {
  const [mainheading, setMainheading] = useState("");
  const [subheading, setSubheading] = useState("");
  const [consultancy, segtCounsultancy] = useState();

  useEffect(() => {
    const Consultancy = async () => {
      try {
        const res = await getconsultancylist();
        if (res.status === 200) {
          const data = await res.json();
          segtCounsultancy(data?.message);
          console.log("consultancydata", data);
        }
      } catch (error) {
        console.error("Error fetching heading:", error);
      }
    };
    Consultancy();
  }, []);

  useEffect(() => {
    const heading = async () => {
      try {
        const res = await consultancyheading();
        if (res.status === 200) {
          const data = await res.json();
          console.log("data", data);
          let latestHeading = data[data.length - 1];
          setMainheading(latestHeading.mainheading);
          setSubheading(latestHeading.subheading);
        }
      } catch (error) {
        console.error("Error fetching heading:", error);
      }
    };
    heading();
  }, []);
  const swiperRef = useRef(null);
  const handlePreview = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const newIndex = swiperRef.current.swiper.activeIndex - 1;
      console.log("Preview index:", newIndex + 1);
      swiperRef.current.swiper.slideTo(newIndex);
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const newIndex = swiperRef.current.swiper.activeIndex + 1;
      console.log("Next index:", newIndex + 1);
      swiperRef.current.swiper.slideTo(newIndex);
    }
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          height: "100vh",
          // width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgb(193 193 193)",
          padding: "0 20px"
        }}
      >
        <div className="Menu_main_div">
          <div className="ConsultancyMenu-heading-container">
            <p id="ConsultancyMenu-heading">
              {mainheading ? mainheading : "Choose"}
            </p>

            <div className="subdiv">
              <p id="subheading-one" className="ConsultancyMenu-sub-heading">
                the option <br/>which you aspire for .
              </p>
              {/* <p id="subheading-one" className="ConsultancyMenu-sub-heading">
                
              </p> */}
            </div>
          </div>

          <div className="Slider_Outer_div">
            <Swiper
              ref={swiperRef}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              className="mySwiper mySwiper-main"
            >
              {consultancy?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.isActive && (
                      <SwiperSlide>
                        <Link
                          to={`/SelectedConsultancy/${item.id}`}
                          state={{ item: item }}
                          className="r-link"
                        >
                          <div className="s-card">
                            {console.log("item.title", item.title)}
                            <div>
                              <h4 id="swiper-heading">{item.title}</h4>
                              <p>{item.description}</p>
                            </div>
                            <div className="r-more"></div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    )}
                  </div>
                );
              })}
            </Swiper>
            {consultancy?.length >= 3 && (
              <div className="indicator">
                <IoIosArrowDropleft
                  size={40}
                  color="black"
                  className="indicator-icon"
                  onClick={handlePreview}
                />
                <IoIosArrowDropright
                  size={40}
                  color="black"
                  className="indicator-icon"
                  onClick={handleNext}
                />
              </div>
            )}
          </div>
          {/* <div className="uni-list-swipe">
          <div className="uni-list-swiper-container">
            <Swiper
              ref={swiperRef}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
              id="mySwiperconsultancy"
            >
              {consultancy?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.isActive && (
                      <SwiperSlide className="uni-list-swipe-slider">
                        <Link
                          to={`/SelectedConsultancy/${item.id}`}
                          state={{ item: item }}
                          className="r-link"
                        >
                          <div className="s-card">
                            {console.log("item.title", item.title)}
                            <div>
                              <h4 id="swiper-heading">{item.title}</h4>
                              <p>{item.description}</p>
                            </div>
                            <div className="r-more">
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    )}
                  </div>
                );
              })}
            </Swiper>
            {consultancy?.length >= 3 && (
              <div className="indicator">
                <IoIosArrowDropleft
                  size={40}
                  color="black"
                  className="indicator-icon"
                  onClick={handlePreview}
                />
                <IoIosArrowDropright
                  size={40}
                  color="black"
                  className="indicator-icon"
                  onClick={handleNext}
                />
              </div>
            )}

          </div>
        </div> */}
        </div>
      </div>

      {/* <div className="cunsultancy_body">
      <div className="consultancy-menu-container">
        <div className="ConsultancyMenu-heading-container">
          <p id="ConsultancyMenu-heading">
            {mainheading ? mainheading : "Choose"}
          </p>

          <div className="subdiv">
            <p id="subheading-one" className="ConsultancyMenu-sub-heading">
              the option
            </p>
            <p id="subheading-one" className="ConsultancyMenu-sub-heading">
              which you aspire for .
            </p>
          </div>
        </div>
        <div className="uni-list-swipe">
          <div className="uni-list-swiper-container">
            <Swiper
              ref={swiperRef}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
              id="mySwiperconsultancy"
            >
              {consultancy?.map((item, key) => {
                return (
                  <div key={key}>
                    {item.isActive && (
                      <SwiperSlide className="uni-list-swipe-slider">
                        <Link
                          to={`/SelectedConsultancy/${item.id}`}
                          state={{ item: item }}
                          className="r-link"
                        >
                          <div className="s-card">
                            {console.log("item.title", item.title)}
                            <div>
                              <h4 id="swiper-heading">{item.title}</h4>
                              <p>{item.description}</p>
                            </div>
                            <div className="r-more">
                            </div>
                          </div>
                        </Link>
                      </SwiperSlide>
                    )}
                  </div>
                );
              })}
            </Swiper>
            {consultancy?.length >= 3 && (
              <div className="indicator">
                <IoIosArrowDropleft
                  size={40}
                  color="black"
                  className="indicator-icon"
                  onClick={handlePreview}
                />
                <IoIosArrowDropright
                  size={40}
                  color="black"
                  className="indicator-icon"
                  onClick={handleNext}
                />
              </div>
            )}

          </div>
        </div>
      </div>
    </div> */}
    </>
  );
}

export default ConsultancyMenu;

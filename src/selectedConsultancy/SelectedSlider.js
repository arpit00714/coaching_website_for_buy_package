import React, { useRef } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./selectedslider.css";
import { Pagination, Navigation } from "swiper/modules";
import { appuri } from "../appUri/appUri";
function SelectedSlider(props) {
  const sliderimages = props.sliderimages;
  const btn1 = props.btn1;
  const btn2 = props.btn2;

  console.log("btn1.sliderBtn1color", btn1.sliderBtn1Bgcolor);
  return (
    <div className="selected-swipwer">
      {/* {console.log("btn2.sliderBtn2link", btn2.sliderBtn2link)} */}
      <div className="sele-btn-container">
        {btn1?.sliderBtn1Text && (
          <a
            href={btn1.sliderBtn1link}
            target="_blank"
            rel="noreferrer"
            style={{
              background: btn1.sliderBtn1Bgcolor,
              color: btn1?.sliderBtn1color ? btn1?.sliderBtn1color:"black",
            }}
          >
            {btn1?.sliderBtn1Text}
          </a>
        )}
          {btn2?.sliderBtn2Text &&  
          
          <a
          href={btn2.sliderBtn2link}
          target="_blank"
          rel="noreferrer"
          style={{
            background: btn2.sliderBtn2Bgcolor,
            color: btn2?.sliderBtn2color ? btn2?.sliderBtn2color:"black",
          }}
        >
          {btn2?.sliderBtn2Text}
        </a>
          }

      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {sliderimages?.map((item, key) => {
          return (
            <SwiperSlide key={key} id="selected-swipwer-SwiperSlide">
              <img
                src={`${appuri}${item}`}
                alt="img1"
                style={{ width: "100%", height: "100%", }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default SelectedSlider;

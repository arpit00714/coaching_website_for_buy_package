import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import "./slider.css"

// import required modules

const img1 = require("../image/christina.jpg")
const img2 = require("../image/good.jpg")
const img3 = require("../image/vasily.jpg")
function Slider() {
  return (
   <div style={{width:"95%",height:"400px",margin:" 50px auto"}}>
        <Swiper
    direction={'vertical'}
    pagination={{
      clickable: true,
    }}
    autoplay
    modules={[Autoplay, Pagination, Navigation]}
    className="mySwiper"
  >
    <SwiperSlide>
    <img src={img1} style={{height:"100%",width:"100%",objectFit:"cover"}} alt='img1'/>
    </SwiperSlide>
    <SwiperSlide>   <img src={img2} style={{height:"100%",width:"100%",objectFit:"cover"}} alt='img1'/></SwiperSlide>
    <SwiperSlide>   <img src={img3} style={{height:"100%",width:"100%",objectFit:"cover"}} alt='img1'/></SwiperSlide>
  </Swiper>
   </div>
  )
}

export default Slider
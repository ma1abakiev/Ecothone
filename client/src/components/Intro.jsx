import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import IntroCard from './IntroCard'
import introCardImg from '../images/intro-card.jpg'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const arr = [
  {
    id: 1,
    title: 'Улётные цены!',
    text: 'На праздник в честь "Дня Независимости" Скидка 20%',
    buttonText: 'Перейти к продуктам',
    imageSrc: introCardImg,
  },
  {
    id: 2,

    title: 'Улётные цены!',
    text: 'На праздник в честь "Дня Независимости" Скидка 20%',
    buttonText: 'Перейти к продуктам',
    imageSrc: introCardImg,
  },
  {
    id: 3,

    title: 'Улётные цены!',
    text: 'На праздник в честь "Дня Независимости" Скидка 20%',
    buttonText: 'Перейти к продуктам',
    imageSrc: introCardImg,
  },
  {
    id: 4,

    title: 'Улётные цены!',
    text: 'На праздник в честь "Дня Независимости" Скидка 20%',
    buttonText: 'Перейти к продуктам',
    imageSrc: introCardImg,
  },
]

export default function Intro() {
  return (
    <>
      <Swiper
        style={{ height: '70vh', marginTop: 50 }}
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination, Navigation]}
        navigation={true}
      >
        {arr.map((item) => {
          return (
            <SwiperSlide
              style={{ display: 'flex', justifyContent: 'center' }}
              key={item.id}
            >
              <IntroCard {...item}></IntroCard>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

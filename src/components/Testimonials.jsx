import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import quote from '../assets/icons/quote.svg';
import './styles/Testimonials.scss';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'John Doe',
      profile_url: 'https://randomuser.me/portraits/men/58.jpg',
      testimonial: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    },
    {
      name: 'Michael Something',
      profile_url: 'https://randomuser.me/portraits/men/60.jpg',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio ratione necessitatibus eveniet obcaecati accusantium adipisci, maiores aut voluptatibus dolor.',
    },
    {
      name: 'Paul Scholes',
      profile_url: 'https://randomuser.me/portraits/men/99.jpg',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio ratione necessitatibus eveniet obcaecati accusantium adipisci, maiores aut voluptatibus dolor.',
    },
    {
      name: 'Iggy Azalea',
      profile_url: 'https://randomuser.me/portraits/women/98.jpg',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio ratione necessitatibus eveniet obcaecati accusantium adipisci, maiores aut voluptatibus dolor.',
    },
    {
      name: 'Sonya Claptone',
      profile_url: 'https://randomuser.me/portraits/women/88.jpg',
      testimonial:
        'Cumque odio ratione necessitatibus eveniet obcaecati accusantium adipisci, maiores aut voluptatibus dolor.',
    },
    {
      name: 'Sean Connery',
      profile_url: 'https://randomuser.me/portraits/men/45.jpg',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio ratione necessitatibus eveniet obcaecati accusantium adipisci.',
    },
    {
      name: 'Kathy Perry',
      profile_url: 'https://randomuser.me/portraits/women/12.jpg',
      testimonial:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque odio ratione necessitatibus eveniet obcaecati accusantium adipisci, maiores aut voluptatibus dolor.',
    },
  ];
  return (
    <section className='testimonials-component d-flex align-items-center pt-5 pb-5'>
      <div className='container'>
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          breakpoints={{
            576: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper pb-5'
        >
          {testimonials.map((item) => {
            return (
              <SwiperSlide key={item.profile_url}>
                <div className='card h-100'>
                  <div className='card-body'>
                    <img className='img-quote' src={quote} alt='Quote' />
                    <blockquote>
                      <p className='card-text'>{item.testimonial}</p>
                    </blockquote>
                  </div>
                  <div className='card-footer text-body-secondary d-flex align-items-center'>
                    <img
                      className='quoter-image rounded-circle'
                      src={item.profile_url}
                      alt='Quoter profile'
                    />
                    <p className='mb-0 ms-3'>{item.name}</p>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;

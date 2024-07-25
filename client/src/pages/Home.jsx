import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import VirtualCampusTour from './VCTour';
import 'swiper/css/bundle';
import Carousel from '../components/Carousel';
import Card from '../components/Card';
// import bgImg from '../assets/bg-4.jpg'

const api = {
  key: "b8b41ca4261db802d75988da80343df6",
  base: "https://api.openweathermap.org/data/2.5/",
};

const slides = [
  "https://i.ibb.co/ncrXc2V/1.png",
  "https://i.ibb.co/B3s7v4h/2.png",
  "https://i.ibb.co/XXR8kzF/3.png",
  "https://i.ibb.co/yg7BSdM/4.png",
];

const cardData = [
  { id: 1, image: 'https://i.ibb.co/ncrXc2V/1.png', title: 'Virtual Campus Tour', desc: 'Explore the campus virtually.', link: '/vctour' },
  { id: 2, image: 'https://i.ibb.co/B3s7v4h/2.png', title: 'General Info', desc: 'Get general information about the college regarding campus life, fests, hostels, canteens.', link: '/geninfo' },
  { id: 3, image: 'https://i.ibb.co/XXR8kzF/3.png', title: 'Cultural Clubs', desc: 'Learn about the cultural clubs.', link: '/cultural' },
  { id: 4, image: 'https://i.ibb.co/yg7BSdM/4.png', title: 'Sports Clubs', desc: 'Get to know the sports clubs.', link: '/sports' },
  { id: 5, image: 'https://i.ibb.co/ncrXc2V/1.png', title: 'Placement Info', desc: 'Information on placements.', link: '/placements' },
  { id: 6, image: 'https://i.ibb.co/B3s7v4h/2.png', title: 'Technical Clubs', desc: 'Explore the technical clubs.', link: '/technical' },
  { id: 7, image: 'https://i.ibb.co/XXR8kzF/3.png', title: 'Academics', desc: 'Academic resources and information.', link: '/academics' },
];

export default function Home() {

  const [search, setSearch] = useState("Jabalpur");
  const [weather, setWeather] = useState({});

  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  useEffect(() => {
    searchPressed();
  }, [searchPressed]);

  return (
    <div>
      {/* top */}
      <div className='flex py-28 px-6 md:py-20 max-w-6xl mx-auto bg-transparent rounded-lg'>

        {/* first */}
        <div className='p-5 text-center md:py-8 flex flex-col lg:gap-7 bg-white rounded-lg'>
          <h1 className='text-slate-700 font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4'>
            Ask anything! with <span class="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              iiitdmChat
            </span>
          </h1>
          <div className='text-gray-400 text-xs sm:text-sm mb-6 lg:text-lg'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem nam sapiente harum modi quibusdam assumenda officia vero quam in maxime, ab ut voluptatem asperiores repellendus temporibus molestias autem commodi itaque id facilis? Quae unde amet reprehenderit molestiae cum, quis numquam pariatur ipsum nulla sapiente?
          </div>
          {typeof weather.main !== "undefined" && (
            <div className='flex flex-col rounded-sm sm:flex-row items-center bg-gray-200 py-1 md:py-3 md:mt-1 xl:mt-9 md:px-10 lg:px-4'>
              <div className='flex-1 text-center'>
                <p className='text-lg font-medium lg:text-xl xl:text-2xl'>{weather.name}</p>
              </div>
              <div className='flex-1 text-center'>
                <p className='text-lg md:text-xl'>{weather.main.temp}°C</p>
                <p className='text-sm'>{weather.weather[0].main} ({weather.weather[0].description})</p>
              </div>
            </div>
          )}
        </div>

        {/* second */}
        <div className='md:max-w-xs lg:max-w-sm xl:max-w-md hidden md:block'>
          <Carousel>
            {slides.map((s) => (
              <img src={s} alt="img" className='rounded-lg' />
            ))}
          </Carousel>
        </div>

      </div>



      {/* cards section */}
      <div className='max-w-6xl mx-auto p-3 my-10 bg-transparent rounded-lg'>
        <div className="grid grid-cols-1 text-center sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
          {cardData.map((card) => (
            <Link to={card.link}>
              <Card key={card.id} image={card.image} title={card.title} desc={card.desc} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


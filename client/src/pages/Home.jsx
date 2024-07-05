import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import VirtualCampusTour from './VCTour';
import 'swiper/css/bundle';

export default function Home() {
  

  return (
    <div>
      {/* top */}
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
          Ask anything! with <span className='text-slate-500'>iiitdmChat</span>
          <br />
        </h1>
        <div className='text-gray-400 text-xs sm:text-sm'>
          Platform where you can resolve all your queries related to IIITJ
          <br />
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'
        >
          Login/Signup for more resources related to the college coursework!!
        </Link>
      </div>

      

      {/* cards section */}
      <div className='max-w-6xl mx-auto p-3 my-10'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          <Card
            title='Virtual Campus Tour'
            link='/vctour'
            description='Explore the campus virtually.'
          />
          <Card
            title='Canteens & Hostels'
            link='/canteens-hostels'
            description='Discover canteens and hostel facilities.'
          />
          <Card
            title='Cultural Clubs'
            link='/cultural-clubs'
            description='Learn about the cultural clubs.'
          />
          <Card
            title='Sports Clubs'
            link='/sports-clubs'
            description='Get to know the sports clubs.'
          />
          <Card
            title='Placements'
            link='/placements'
            description='Information on placements.'
          />
          <Card
            title='Technical Clubs'
            link='/technical-clubs'
            description='Explore the technical clubs.'
          />
          <Card
            title='Academics'
            link='/academics'
            description='Academic resources and information.'
          />
        </div>
      </div>
    </div>
  );
}

function Card({ title, link, description }) {
  return (
    <Link to={link} className='block p-6 max-w-sm rounded-lg border border-gray-200 shadow-md hover:bg-gray-100'>
      <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900'>{title}</h5>
      <p className='font-normal text-gray-700'>{description}</p>
    </Link>
  );
}

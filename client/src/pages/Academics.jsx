import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function Academics() {
  const { user } = useContext(UserContext);

  return (
    <div>
      {/* Navbar */}
      <nav className='bg-white shadow'>
        <div className='max-w-6xl mx-auto px-4'>
          <div className='flex justify-between'>
            <div className='flex space-x-4'>
              <div>
                <Link to='/' className='flex items-center py-5 px-2 text-gray-700 hover:text-gray-900'>
                  <span className='font-bold'>iiitdmChat</span>
                </Link>
              </div>
              {/* Primary Nav */}
              <div className='hidden md:flex items-center space-x-1'>
                <Link to='/vctour' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Virtual Campus Tour</Link>
                <Link to='/canteens-hostels' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Canteens & Hostels</Link>
                <Link to='/cultural-clubs' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Cultural Clubs</Link>
                <Link to='/sports-clubs' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Sports Clubs</Link>
                <Link to='/placements' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Placements</Link>
                <Link to='/technical-clubs' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Technical Clubs</Link>
                <Link to='/academics' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Academics</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className='max-w-6xl mx-auto p-6'>
        <h2 className='text-slate-700 font-bold text-3xl lg:text-5xl mb-6'>
          Academics
        </h2>
        {user ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6'>
            <Card title='Subject 1' description='Description for Subject 1' />
            <Card title='Subject 2' description='Description for Subject 2' />
            <Card title='Subject 3' description='Description for Subject 3' />
            <Card title='Subject 4' description='Description for Subject 4' />
            <Card title='Subject 5' description='Description for Subject 5' />
            {/* Add more subjects as needed */}
          </div>
        ) : (
          <div className='text-gray-600'>
            <p>
              Please <Link to='/sign-in' className='text-blue-800 hover:underline'>log in</Link> to access the academic courses chatbot.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function Card({ title, description }) {
  return (
    <div className='border p-4 rounded shadow hover:shadow-lg transition-shadow duration-200'>
      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
}

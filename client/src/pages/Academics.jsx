import React from 'react';
import { Link } from 'react-router-dom';

export default function Academics() {
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
                                <Link to='/geninfo' className='py-5 px-3 text-gray-700 hover:text-gray-900'>General Information</Link>
                                <Link to='/cultural' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Cultural Clubs</Link>
                                <Link to='/sports' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Sports Clubs</Link>
                                <Link to='/placements' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Placements</Link>
                                <Link to='/technical' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Technical Clubs</Link>
                                <Link to='/academics' className='py-5 px-3 text-gray-700 hover:text-gray-900'>Academics</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            
        </div>
    );
}

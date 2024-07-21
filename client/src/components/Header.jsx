import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const navItems = [
    { name: 'Virtual Campus Tour', path: '/vctour' },
    { name: 'General Information', path: '/geninfo' },
    { name: 'Cultural Clubs', path: '/cultural' },
    { name: 'Sports Clubs', path: '/sports' },
    { name: 'Placements', path: '/placements' },
    { name: 'Technical Clubs', path: '/technical' },
    { name: 'Academics', path: '/academics' },
];

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setShowDropdown(true);

        const filtered = navItems.filter(item =>
            item.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredItems(filtered);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    const handleResultClick = (path) => {
        setSearchTerm(''); // Clear the search term
        setShowDropdown(false); // Hide the dropdown
        navigate(path);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
            handleSearch({ target: { value: searchTermFromUrl } });
        }
    }, [location.search]);

    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3 relative'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>iiitdm</span>
                        <span className='text-slate-700'>Chat</span>
                    </h1>
                </Link>
                <form
                    onSubmit={handleSubmit}
                    className='relative bg-slate-100 p-3 rounded-lg flex items-center'
                >
                    <input
                        type='text'
                        placeholder='Search...'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={handleSearch}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    />
                    <button type="submit">
                        <FaSearch className='text-slate-600' />
                    </button>
                    {showDropdown && filteredItems.length > 0 && (
                        <ul className='absolute bg-white border mt-64 w-full rounded-lg shadow-lg max-h-60 overflow-auto z-10'>
                            {filteredItems.map((item) => (
                                <li
                                    key={item.path}
                                    onClick={() => handleResultClick(item.path)}
                                    className='p-2 cursor-pointer hover:bg-gray-200'
                                >
                                    {item.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>
                            About
                        </li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className=' text-slate-700 hover:underline'> Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}

import { Link } from 'react-router-dom';

export default function Placements() {
  return (
    <div className='flex'>
      {/* Sidebar */}
      <div className='sidebar mt-4'>
        <Link to='/vctour' className='sidebar-link'>Virtual Campus Tour</Link>
        <Link to='/canteens-hostels' className='sidebar-link'>Canteens & Hostels</Link>
        <Link to='/cultural-clubs' className='sidebar-link'>Cultural Clubs</Link>
        <Link to='/sports-clubs' className='sidebar-link'>Sports Clubs</Link>
        <Link to='/placements' className='sidebar-link'>Placements</Link>
        <Link to='/technical-clubs' className='sidebar-link'>Technical Clubs</Link>
        <Link to='/academics' className='sidebar-link'>Academics</Link>
      </div>

      {/* Main Content */}
      <div className='main-content'>
        <h1 className='text-3xl font-bold mb-6 text-slate-700'>Placements</h1>
        <div className='content-wrapper'>
          <div className='chat-section'>
            <ChatSection />
          </div>
        </div>
      </div>
    </div>
  );
}

function ChatSection() {
  return (
    <div className='chat-container'>
      <div className='chat-box'>
        {/* Chat messages will go here */}
      </div>
      <form className='chat-input-wrapper'>
        <input
          type='text'
          className='chat-input'
          placeholder='Type your message...'
        />
        <button
          type='submit'
          className='chat-submit'
        >
          ➤
        </button>
      </form>
    </div>
  );
}

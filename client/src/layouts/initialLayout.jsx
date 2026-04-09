import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LinkAction from '../components/LinkAction';
import { TbArrowBackUp } from 'react-icons/tb';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const InitialLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  return (
    <div className='min-h-screen flex flex-col bg-gray-100 text-gray-900'>
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className='flex-grow w-full max-w-6xl mx-auto px-4 py-8 flex flex-col justify-center'>
        {/* Home Section */}
        {isHome && <LinkAction />}

        {/* Back Button */}
        {!isHome && (
          <div className='mb-6'>
            <button
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm hover:bg-gray-100 transition'
            >
              <TbArrowBackUp className='text-lg' />
              Back
            </button>
          </div>
        )}

        {/* ✅ FIXED: No forced styling here */}
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default InitialLayout;

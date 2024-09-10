import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ButtonSection from '../components/ButtonSection';
import { TbArrowBackUp } from "react-icons/tb";
import Footer from '../components/Footer';
const InitialLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === '/';

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col justify-between">
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <nav>
            <Link to="/" className="text-white hover:text-gray-200">
              <h1 className="text-3xl font-bold">Link Shortener App</h1>
            </Link>
          </nav>
        </div>
      </header>
     
      <main className="container mx-auto px-4 py-8">
        {isHome && <ButtonSection />}
        {!isHome && (
          <div>
            <button
              onClick={handleBack}
              className="flex items-center bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              <TbArrowBackUp /> Back
            </button>
          </div>
        )}
        <Outlet />
      </main>
        <Footer/>
    </div>
  );
};

export default InitialLayout;


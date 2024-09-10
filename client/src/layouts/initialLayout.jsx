import { Link, Outlet, useLocation } from 'react-router-dom';
import ButtonSection from '../components/ButtonSection';

const InitialLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
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
        {isHome && <ButtonSection/>}
        <Outlet />
      </main>
    </div>
  );
};

export default InitialLayout;


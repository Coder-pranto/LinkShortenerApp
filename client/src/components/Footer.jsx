const Footer = () => {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="bg-blue-600 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {currentYear} - Link Shortener App. All rights reserved.
          </p>
          <p className="text-sm">
            Designed and built by <span className="font-semibold">Riaj Hasan Pranto</span>
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  
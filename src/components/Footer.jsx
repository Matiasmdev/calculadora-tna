export const Footer = ({ isDarkMode }) => {
    return (
      <footer className={`w-full flex justify-center items-center p-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-neutral-200 text-black'} mt-9`}>
        <p className="text-sm text-center sm:text-left">
          © 2025 <a 
            href="https://matiascoder.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-blue-300 transition-all duration-300 font-semibold"
          >
            MatiasCoder
          </a>. Todos los derechos reservados.
        </p>
      </footer>
    );
  };
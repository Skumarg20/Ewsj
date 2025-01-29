


const BookCallButton = () => {
 

  return (
    <button className="bg-black w-max text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg flex items-center px-6 py-2 space-x-2">
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
    </svg>
    <span>Book A 30 Min Call</span>
</button>
  );
};

export default BookCallButton;

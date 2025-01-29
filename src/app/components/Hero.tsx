'use client'


const Hero =() => {

    return (
        <>
      <div className="relative bg-hero-pattern bg-cover bg-center h-[90vh] flex items-center justify-center overflow-hidden">
    {/* Background gradient animation */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-200 via-indigo-200 to-slate-300 opacity-90 animate-gradient-move"></div>

    {/* Floating particles for added effect */}
    <div className="absolute inset-0">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
    </div>

    <div className="relative text-center z-10">
        <h1 className="text-6xl font-bold text-gold drop-shadow-lg">
            Elevate With Sanjeev Journey
        </h1>
        <p className="text-gray-900 text-lg mt-4 drop-shadow-md">
            We provide solutions to all your problems
        </p>
        <div className="flex flex-col lg:flex-row justify-center mt-8 space-y-4 lg:space-y-0 lg:space-x-6">
    <button className="bg-black w-max text-white font-semibold rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg flex items-center px-6 py-2 space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
        </svg>
        <span>Book A 30 Min Call</span>
    </button>
    <button className="bg-white text-black font-semibold rounded-full border-2 border-black hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg flex items-center px-6 py-2 space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11V7m0 4v4m0 0h-2m2 0h2m2 4v4h-4v-4m0 0h4m0 0V7" />
        </svg>
        <span>Sign Up for Rank</span>
    </button>
</div>



     
    </div>
</div>


        </>

    );

}
export default Hero;
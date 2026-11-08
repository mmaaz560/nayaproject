import React from 'react';
import Postcomponent from '../component/Postcomponent.jsx';
import Creatpost from '../component/Creatpost.jsx';
import { useGloble } from '../context/Context.jsx';


const Home = () => {
  const {setshowpostmodel} = useGloble()

  return (
    <>
    <div className="fixed flex items-center pt-5 ps-5 justify-center bg-gray-100 dark:bg-black">
      
      {/* Button */}
      <button 
        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out transform bg-linear-to-r from-pink-500 via-red-500 to-yellow-500 rounded-full shadow-lg hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-pink-300 dark:focus:ring-pink-800"
onClick={() => {
      console.log('Button clicked!')          // ← add karo
      setshowpostmodel(true)
    }}      >
        {/* Text */}
        <span>Click Me</span>
        
        {/* Chhota sa Heart Icon (Hover par thoda hilta hai) */}
        <span className="ml-2 text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
          ❤️
        </span>
      </button>
      

    </div>
<Postcomponent/>
{/* <Creatpost/> */}
    </>
  );
};

export default Home;
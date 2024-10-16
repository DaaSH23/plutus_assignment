// import ExampleComponent from "@/ui/ExampleComponent";
'use client'
import { WorldBankData } from "@/types";
import AboutComponent from "@/ui/AboutComponent";
import HomeComponent from "@/ui/HomeComponent";
import PopulationComponent from "@/ui/PopulationComponent";
import { useState } from "react";
import { FaLink, FaChartBar, FaInfoCircle } from "react-icons/fa";

const Home = () => {

  const [worldBankData, setWorldBankData] = useState<WorldBankData[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'population' | 'about'>('home'); // State to manage the active tab

  const handleDataUpdate = (data: { [key: string]: WorldBankData[] }) => {
    const updatedData = Object.values(data)[0];
    setWorldBankData(updatedData);
  };

  return (
    <div className="flex p-10 h-screen font-Manrope">
      {/* Sidebar */}
      <div className="fixed h-full rounded-xl w-96 bg-cardground text-center p-10">
        <div>
          <div className="font-extrabold text-2xl mt-12">PopDop</div>
          <div className="mt-5 ">
            <ul className="text-base space-y-2 text-left">
              <li
                className={`cursor-pointer p-2 pl-24 rounded-3xl transition duration-200 flex items-center justify-start space-x-2 ${activeTab === 'home' ? 'bg-gray-300 font-bold text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 hover:font-bold'
                  }`}
                onClick={() => setActiveTab('home')}
              >
                <FaLink className="text-xl font-medium" />
                <span>Home</span>
              </li>
              <li
                className={`cursor-pointer p-2 pl-24 rounded-3xl transition duration-200 flex items-center justify-start space-x-2 ${activeTab === 'population' ? 'bg-gray-300 font-bold text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 hover:font-bold'
                  }`}
                onClick={() => setActiveTab('population')}
              >
                <FaChartBar className="text-xl" />
                <span>Population</span>
              </li>
              <li
                className={`cursor-pointer p-2 pl-24 rounded-3xl transition duration-200 flex items-center justify-start space-x-2 ${activeTab === 'about' ? 'bg-gray-300 font-bold text-gray-900' : 'hover:bg-gray-300 hover:text-gray-900 hover:font-bold'
                  }`}
                onClick={() => setActiveTab('about')}
              >
                <FaInfoCircle className="text-xl" />
                <span>About</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="ml-96 flex-1 overflow-y-auto pr-4">
        {/* Conditionally render components based on the active tab */}
        {activeTab === 'home' && (
          <HomeComponent onDataUpdate={handleDataUpdate} />
        )}
        {activeTab === 'population' && (
          <PopulationComponent onDataUpdate={handleDataUpdate} />
        )}
        {activeTab === 'about' && (
          <AboutComponent />
        )}
      </div>
    </div>
  );
};

export default Home;

'use client'
import React, { useState } from 'react';
import PopulationComponent from '@/ui/PopulationComponent';
import { WorldBankData } from '@/types';

export default function Population() {
  const [worldBankData, setWorldBankData] = useState<WorldBankData[]>([]);

  const handleDataUpdate = (data: { [key: string]: WorldBankData[] }) => {
    // Assuming the data you need is inside the first key of the object
    const updatedData = Object.values(data)[0]; 
    setWorldBankData(updatedData);
  };

  console.log(worldBankData);

  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <PopulationComponent 
        onDataUpdate={handleDataUpdate} 
      />
    </div>
  );
}

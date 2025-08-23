import React, { useState, useEffect } from "react";
import Graph from "./Graph";

const Analytics = () => {
  const [csvData, setCsvData] = useState([]);
  const [filters, setFilters] = useState({ commodity: "", variety: "", district: "" });
  const [seriesData, setSeriesData] = useState([]);

  useEffect(() => {
    // Load CSV from public folder
    fetch("/Karnataka-crop-prices-2023.csv")
      .then(res => res.text())
      .then(text => {
        const rows = text.split("\n").map(r => r.split(","));
        setCsvData(rows);
      });
  }, []);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const applyFilters = () => {
    if (!csvData || csvData.length === 0) return;

    const headers = csvData[0];
    const dateIdx = headers.indexOf("date");
    const minIdx = headers.indexOf("min_price");
    const maxIdx = headers.indexOf("max_price");
    const modalIdx = headers.indexOf("modal_price");
    const commodityIdx = headers.indexOf("commodity_name");
    const varietyIdx = headers.indexOf("variety");
    const districtIdx = headers.indexOf("district_name");

    const filtered = csvData.slice(1)
      .filter((row, i) =>
        row[commodityIdx] === filters.commodity &&
        row[varietyIdx] === filters.variety &&
        row[districtIdx] === filters.district &&
        i % 10 === 0
      );

    const minSeries = filtered.map(row => [new Date(row[dateIdx]).getTime(), parseFloat(row[minIdx])]);
    const maxSeries = filtered.map(row => [new Date(row[dateIdx]).getTime(), parseFloat(row[maxIdx])]);
    const modalSeries = filtered.map(row => [new Date(row[dateIdx]).getTime(), parseFloat(row[modalIdx])]);

    setSeriesData([
      { name: "Min Price", data: minSeries },
      { name: "Max Price", data: maxSeries },
      { name: "Modal Price", data: modalSeries },
    ]);
  };

  return (
    <div className="min-h-screen bg-[#FEFAE0] py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#283618] mb-4">
            Crop Price Analytics
          </h1>
          <p className="text-lg text-[#606C38] max-w-2xl mx-auto">
            Analyze crop price trends and patterns with our comprehensive data visualization tools.
          </p>
        </div>

        <div className="mb-8">
          <div className="bg-[#606C38] rounded-2xl shadow-lg p-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#FEFAE0] mb-6">
              Filter Data
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="block text-sm md:text-base font-medium mb-3 text-[#FEFAE0]">
                  Commodity
                </label>
                <input 
                  className="w-full px-4 py-3 bg-[#FEFAE0]/10 backdrop-blur-md border border-[#FEFAE0]/20 rounded-lg text-[#FEFAE0] placeholder-[#FEFAE0]/60 focus:outline-none focus:ring-2 focus:ring-[#DDA15E] focus:border-transparent text-sm md:text-base transition-all duration-300"
                  placeholder="Enter commodity name" 
                  value={filters.commodity} 
                  onChange={e => handleInputChange("commodity", e.target.value)} 
                />
              </div>
              
              <div>
                <label className="block text-sm md:text-base font-medium mb-3 text-[#FEFAE0]">
                  Variety
                </label>
                <input 
                  className="w-full px-4 py-3 bg-[#FEFAE0]/10 backdrop-blur-md border border-[#FEFAE0]/20 rounded-lg text-[#FEFAE0] placeholder-[#FEFAE0]/60 focus:outline-none focus:ring-2 focus:ring-[#DDA15E] focus:border-transparent text-sm md:text-base transition-all duration-300"
                  placeholder="Enter variety name" 
                  value={filters.variety} 
                  onChange={e => handleInputChange("variety", e.target.value)} 
                />
              </div>
              
              <div>
                <label className="block text-sm md:text-base font-medium mb-3 text-[#FEFAE0]">
                  District
                </label>
                <input 
                  className="w-full px-4 py-3 bg-[#FEFAE0]/10 backdrop-blur-md border border-[#FEFAE0]/20 rounded-lg text-[#FEFAE0] placeholder-[#FEFAE0]/60 focus:outline-none focus:ring-2 focus:ring-[#DDA15E] focus:border-transparent text-sm md:text-base transition-all duration-300"
                  placeholder="Enter district name" 
                  value={filters.district} 
                  onChange={e => handleInputChange("district", e.target.value)} 
                />
              </div>
            </div>
            
            <button 
              className="px-8 py-3 bg-[#DDA15E] text-[#283618] rounded-lg font-medium text-sm md:text-base hover:bg-[#BC6C25] hover:scale-105 transition-all duration-300 transform"
              onClick={applyFilters}
            >
              Generate Analytics
            </button>
          </div>
        </div>

        <div className="bg-[#283618] rounded-2xl shadow-lg p-6">
          <h3 className="text-xl md:text-2xl font-bold text-[#FEFAE0] mb-6">
            Price Trends Visualization
          </h3>
          <div className="bg-[#FEFAE0]/10 backdrop-blur-md rounded-lg p-4">
            <Graph 
              seriesData={seriesData} 
              xAxisName="Date" 
              yAxisName="Price (INR)" 
              title="Crop Prices Over Time" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
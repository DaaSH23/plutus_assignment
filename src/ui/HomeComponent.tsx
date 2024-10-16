'use client'
import React, { useEffect } from "react";
import { WorldBankData } from "@/types";
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import { fetchWorldBankValue, selectCountryData, selectError, selectLoading, selectWorldData } from "@/lib/store/featureSlice";
import GraphSection from "./AreaChartComponent";

interface Props {
    onDataUpdate: (data: { [key: string]: WorldBankData[] }) => void;
}

const INDICATORS = {
    POPULATION: 'SP.POP.TOTL',
    DENSITY: 'EN.POP.DNST',
    GROWTH_RATE: 'SP.POP.GROW',
    LIFE_EXPECTANCY: 'SP.DYN.LE00.IN',
    BIRTH_RATE: 'SP.DYN.CBRT.IN',
    DEATH_RATE: 'SP.DYN.CDRT.IN',
    FERTILITY_RATE: 'SP.DYN.TFRT.IN',
};

const HomeComponent = ({ onDataUpdate }: Props) => {

    const dispatch = useAppDispatch();
    const worldData = useAppSelector(selectWorldData);
    const countryData = useAppSelector(selectCountryData);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    useEffect(() => {
        dispatch(fetchWorldBankValue({ range: 5 }));
    }, [dispatch]);

    useEffect(() => {
        if (worldData) {
            onDataUpdate(worldData);
            console.log("WorldBankData: ", worldData);
            console.log("CountryData: ", countryData);
        }
        // if(countryData) {
        //     onDataUpdate(countryData);
        // }
    }, [worldData, onDataUpdate]);

    const formatValue = (value: number | null, indicator: string) => {
        if (value === null) return 'N/A';
        if (indicator === INDICATORS.POPULATION) {
            // Convert population to billions
            return (value / 1_000_000_000).toLocaleString(undefined, { maximumFractionDigits: 2 }) + 'B';
        };
        if (indicator === INDICATORS.DENSITY) {
            // Round population density to the nearest integer
            return Math.round(value).toLocaleString();
        };
        return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    const getAvailableData = (data: WorldBankData[]): WorldBankData | null => {
        // Sort the data by year in descending order and return the first valid data point
        const sortedData = [...data].sort((a, b) => Number(b.date) - Number(a.date));
        for (const item of sortedData) {
            if (item.value !== null) {
                return item; // Return the first data point with a valid value
            }
        }
        return null;
    };

    const getLatestData = (indicator: string): WorldBankData | null => {
        const data = worldData[indicator];
        if (!data || data.length === 0) return null;
        return getAvailableData(data); // Use helper function to find the latest available data point
    };

    const latestPopulation = getLatestData(INDICATORS.POPULATION);
    const latestDensity = getLatestData(INDICATORS.DENSITY);
    const latestLifeExpectancy = getLatestData(INDICATORS.LIFE_EXPECTANCY);


    const calculateChangeLastYear = (indicator: string): string => {
        const data = worldData[indicator];
        if (!data || data.length < 2) return 'N/A';
        // const sortedData = [...data].sort((a, b) => Number(b.date) - Number(a.date));
        // console.log('sortedData: ',sortedData);
        const latest = data[0];
        const previous = data[1];
        if (latest.value !== null && previous.value !== null) {
            const change = latest.value - previous.value;
            const sign = change >= 0 ? '+' : '-';
            return `${sign}${Math.abs(change / 1000000).toLocaleString()}M`; // Assuming change is in millions
        }
        return 'N/A';
    };

    const changeLastYear = calculateChangeLastYear(INDICATORS.POPULATION);
    // console.log(changeLastYear);


    return (
        <div className="flex pl-10 h-screen font-Manrope">

            <div className="flex-1 ml-6">
                <div className="flex">
                    {/* World Population */}
                    <div className="flex-1 h-28 bg-cardground rounded-xl flex flex-col justify-center items-center">
                        <h2 className="font-bold text-sm text-textColor1">World Population</h2>
                        <p className="text-2xl font-bold">
                            {latestPopulation ? formatValue(latestPopulation.value, INDICATORS.POPULATION) : 'N/A'}
                        </p>
                        <p className="text-xs text-textColor1">Year: {latestPopulation?.date ?? 'N/A'}</p>
                    </div>
                    {/* Average Density */}
                    <div className="flex-1 h-28 bg-cardground rounded-xl ml-6 flex flex-col justify-center items-center">
                        <h2 className="text-sm text-textColor1 font-bold">Average Density</h2>
                        <p className="text-2xl font-bold">
                            {latestDensity ? `${formatValue(latestDensity.value, INDICATORS.DENSITY)} p/sqft` : 'N/A'}
                        </p>
                        <p className="text-xs text-textColor1">Year: {latestDensity?.date ?? 'N/A'}</p>
                    </div>
                </div>
                <div className="flex h-auto bg-cardground rounded-xl mt-6 ">

                    {/* Stats Section */}
                    <div className="ml-12 py-40 space-y-3">
                        <div>
                            <p className="text-xs">Total Population</p>
                            <h1 className="text-2xl font-bold">
                                {latestPopulation ? `${formatValue(latestPopulation.value, INDICATORS.POPULATION)}` : 'N/A'}
                            </h1>
                        </div>
                        <div>
                            <p className="text-xs">Change in last year</p>
                            <h1 className="text-2xl font-bold">
                                {changeLastYear}
                            </h1>
                        </div>
                        <div>
                            <p className="text-xs">Life Expectancy at Birth</p>
                            <h1 className="text-2xl font-bold">
                                {latestLifeExpectancy ? `${formatValue(latestLifeExpectancy.value, INDICATORS.LIFE_EXPECTANCY)} Yrs` : 'N/A'}
                            </h1>
                        </div>
                        <button className="bg-gradient-to-r from-buttong1 to-buttong2 p-3 py-2 rounded-3xl text-xs text-white">Dive Deeper</button>
                    </div>

                    {/* Graph Section */}
                        <div className="flex graph-container w-96 items-center justify-center pl-20">
                            {worldData[INDICATORS.POPULATION] && worldData[INDICATORS.POPULATION].length > 0 && (
                                <GraphSection
                                    data={worldData[INDICATORS.POPULATION].slice(-5).reverse()} // Pass the last 5 data points for the graph
                                    indicator={INDICATORS.POPULATION}
                                />
                            )}
                        </div>

                </div>

                {/* Loading and Error Handling */}
                {loading && <p className="text-gray-600">Loading...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}

            </div>
        </div>
    );
};

export default HomeComponent;
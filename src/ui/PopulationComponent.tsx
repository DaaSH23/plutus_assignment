import React, { useEffect, useState } from "react";
import { WorldBankData } from "@/types";
import useAppDispatch from "@/lib/hooks/appDispatch";
import { fetchWorldBankValue, selectCountryData, selectError, selectLoading, selectWorldData } from "@/lib/store/featureSlice";
import useAppSelector from "@/lib/hooks/appSelector";
import StackedAreaComponent from "./StackedAreaComponent";
// import GraphSection from "./AreaChartComponent";

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
} as const;

type IndicatorKeys = keyof typeof INDICATORS;

const YEAR_RANGES = [
    { label: "Last 5 years", value: 5 },
    { label: "Last 10 years", value: 10 },
    { label: "Last 20 years", value: 20 },
    { label: "Last 100 years", value: 100 },
];

export default function PopulationComponent({ onDataUpdate }: Props) {
    const dispatch = useAppDispatch();
    const worldData = useAppSelector(selectWorldData);
    const countryData = useAppSelector(selectCountryData);
    const loading = useAppSelector(selectLoading);
    const error = useAppSelector(selectError);

    const [selectedYear, setSelectedYear] = useState<string | null>('2023');
    const [selectedRange, setSelectedRange] = useState<number>(5);
    const [selectedIndicator, setSelectedIndicator] = useState<IndicatorKeys>('POPULATION');

    const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedIndicator(e.target.value as IndicatorKeys);
    };

    useEffect(() => {
        // Fetch World Bank Data when the components mounts 
        dispatch(fetchWorldBankValue({ range: selectedRange }));
    }, [dispatch, selectedRange]);

    // Update parent component with the new data when it changes
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

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(e.target.value);
    };

    const handleRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedRange(Number(e.target.value));
    };

    const formatValue = (value: number | null) => {
        if (value === null) return 'N/A';
        return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    const filteredCountryData = (countryId: string, indicator: IndicatorKeys) => {
        const data = countryData[countryId]?.[INDICATORS[indicator]];
        console.log(`Data for ${countryId} - ${indicator}: `, data);

        if (!data) {
            console.warn(`No data found for ${countryId} with indicator ${indicator}`);
        }

        return data?.filter((item) => {
            return selectedYear ? item.date === selectedYear : true;
        }) || [];
    };

    const years = Array.from(new Set(
        Object.values(countryData).flatMap(country =>
            Object.values(country).flatMap(data => data.map(entry => entry.date))
        )
    ));

    return (
        <div className="flex-1 pl-10 h-fit font-Manrope">
            <div className="rounded-xl bg-cardground p-10">
                <div className="flex justify-between mb-8">
                    <div className="">
                        {/* <label htmlFor="indicator-select" className="mr-2">Select Indicator:</label> */}
                        <select
                            id="indicator-select"
                            value={selectedIndicator}
                            onChange={handleIndicatorChange}
                            className="border rounded-2xl p-2 text-sm bg-cardground border-border1 text-textColor1 font-bold"
                        >
                            {Object.keys(INDICATORS).map((indicator) => (
                                <option key={indicator} value={indicator}>
                                    {indicator.replace(/_/g, ' ')}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="">
                        {/* <label htmlFor="range-select" className="mr-2">Select Year Range:</label> */}
                        <select
                            id="range-select"
                            value={selectedRange}
                            onChange={handleRangeChange}
                            className="border rounded-2xl p-2 text-sm bg-cardground border-border1 text-textColor1 font-bold"
                        >
                            {YEAR_RANGES.map((range) => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                {/* Graph Section */}
                <StackedAreaComponent countryData={countryData} selectedIndicator={selectedIndicator} />

                <div className="border-t-2 border-t-border1 mt-10"></div>

                <div className="flex flex-col w-full mt-10">
                    {/* <h1 className="text-2xl font-bold mb-4">World Population Indicators</h1> */}

                    {loading && <p className="text-gray-600">Loading data...</p>}
                    {error && <p className="text-red-500">Error: {error}</p>}

                    {!loading && !error && worldData && countryData && (
                        <div>
                            {/* Dropdown for year selection */}
                            <div className="flex justify-end">
                                <div className="mb-4">
                                    {/* <label htmlFor="year-select" className="mr-2">Filter by Year:</label> */}
                                    <select
                                        id="year-select"
                                        value={selectedYear || ''}
                                        onChange={handleYearChange}
                                        className="border rounded-2xl p-2 text-sm bg-cardground border-border1 text-textColor1 font-bold"
                                    >
                                        {/* <option value="">All Years</option> */}
                                        {years.map((year) => (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Table for country data */}
                            <div className="overflow-auto">
                                <table className="min-w-full bg-cardground border border-gray-200 font-Manrope font-bold text-xs">
                                    <thead>
                                        <tr>
                                            <th className="border p-2 text-left text-black">Country</th>
                                            {Object.keys(INDICATORS).map((indicator) => (
                                                <th key={indicator} className="border p-2">
                                                    {indicator.replace(/_/g, ' ')}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.keys(countryData).map((countryId) => (
                                            <tr key={countryId}>
                                                <td className="border p-2 text-textColor1">{countryId}</td>
                                                {Object.keys(INDICATORS).map((indicator) => {
                                                    const values = filteredCountryData(countryId, indicator as IndicatorKeys)
                                                        .map((item) => formatValue(item.value))
                                                        .join(', ');
                                                    return (
                                                        <td key={`${countryId}-${indicator}`} className="border p-2 text-textColor1">
                                                            {values || 'N/A'}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
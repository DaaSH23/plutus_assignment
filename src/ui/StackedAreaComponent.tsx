import { WorldBankData } from "@/types";
import React from "react";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, Legend, ResponsiveContainer } from 'recharts';


interface CountryData {
    [key: string]: {
        [key: string]: WorldBankData[];
    };
}

interface ChartData {
    year: string;
    [countryId: string]: number | string;
}

interface Props {
    countryData: CountryData;
    selectedIndicator: IndicatorKeys;
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

const StackedAreaComponent = ({ countryData, selectedIndicator }: Props) => {

    // const [selectedIndicator, setSelectedIndicator] = useState<IndicatorKeys>('TOTAL_POPULATION');

    // const handleIndicatorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedIndicator(e.target.value as IndicatorKeys);
    // };

    // Prepare data for the chart
    const chartData: ChartData[] = Object.keys(countryData).reduce((acc: ChartData[], countryId) => {
        const indicatorData = countryData[countryId]?.[INDICATORS[selectedIndicator]];

        if (indicatorData) {
            indicatorData.forEach((entry: WorldBankData) => {
                const existingEntry = acc.find((item) => item.year === entry.date);
                let value;

                // If the selected indicator is POPULATION, divide by 1 billion
                if (selectedIndicator === 'POPULATION') {
                    value = entry.value !== null ? entry.value / 1e9 : 0;
                } else {
                    value = entry.value !== null ? entry.value : 0;
                }

                if (existingEntry) {
                    existingEntry[countryId] = value;
                } else {
                    acc.push({ year: entry.date, [countryId]: value });
                }
            });
        }

        return acc;
    }, []).sort((a, b) => parseInt(a.year) - parseInt(b.year));

    return (
        <div className=" text-xs">
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                    <defs>
                        {Object.keys(countryData).map((countryId, index) => (
                            <linearGradient key={countryId} id={`color-${countryId}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={`hsl(${(index * 40) % 360}, 70%, 50%)`} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={`hsl(${(index * 40) % 360}, 70%, 50%)`} stopOpacity={0} />
                            </linearGradient>
                        ))}
                    </defs>
                    <XAxis dataKey="year" />
                    <YAxis
                        tickFormatter={(value) => (selectedIndicator === 'POPULATION' ? `${value}B` : value)}
                    />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />

                    {/* Stacking area for each country */}
                    {Object.keys(countryData).map((countryId) => (
                        <Area
                            key={countryId}
                            type="monotone"
                            dataKey={countryId}
                            stackId="1"
                            stroke={`hsl(${(Object.keys(countryData).indexOf(countryId) * 40) % 360}, 70%, 50%)`}
                            fillOpacity={1}
                            fill={`url(#color-${countryId})`}
                        />
                    ))}
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};


export default StackedAreaComponent;

import React from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { WorldBankData } from "@/types";
// import WorldBankDatas from "./WorldBankData";


interface GraphSectionProps {
    // data: { [key: string]: WorldBankData[] };
    data: WorldBankData[];
    indicator: string;
}

const GraphSection: React.FC<GraphSectionProps> = ({ data, indicator }) => {

    const graphData = data.map((entry: WorldBankData) => {
        let value;

        // Convert population to billions for TOTAL_POPULATION
        if (indicator === 'SP.POP.TOTL') {
            value = entry.value !== null ? entry.value / 1_000_000_000 : 0; // Convert to billions
        } else {
            value = entry.value !== null ? entry.value : 0; // Use original value for other indicators
        }

        return {
            year: entry.date,
            value,
        };
    });

    const maxValue = Math.ceil(Math.max(...graphData.map(d => d.value))) + 4; // Round up to the next billion

    // Create ticks for Y-axis every 1 billion
    const ticks = Array.from({ length: maxValue }, (_, i) => i);

    return (
        <div className="graph-section w-full  text-xs">
            {/* <h3>{indicator} - Area Chart</h3> */}
            <ResponsiveContainer width={600} height={300}>
                <AreaChart
                    data={graphData}
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis
                        tickFormatter={(value) => (indicator === 'SP.POP.TOTL' ? `${value}B` : value)}
                        interval={1} // Show every tick
                        ticks={ticks}
                        // domain={['dataMin', 'dataMax']} // Automatically set min and max based on data
                    />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default GraphSection;

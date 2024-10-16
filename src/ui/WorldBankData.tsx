import React from "react";
import { WorldBankData } from '../types';

interface Props {
    data: WorldBankData[];
}

export default function WorldBankDatas({data}: Props) {
    return (
        <div>
            <h1>World Bank Data</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

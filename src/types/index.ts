export interface WorldBankData {
    indicator: {
        id: string;
        value: string;
    };
    country: {
        id: string;
        value: string;
    };
    date: string;
    value: number | null;
}
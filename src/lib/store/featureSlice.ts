import { WorldBankData } from '@/types';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Interface for store
interface FeatureState {
  value: number;
  loading: boolean;
  error: string | null;
  worldData: {
    [key: string]: WorldBankData[];
  };
  countryData: {
    [countryCode: string]: {
      [key: string]: WorldBankData[];
    };
  };
};

// Initial state of the store
const initialState: FeatureState = {
  value: 0,
  loading: false,
  error: null,
  countryData: {},
  worldData: {},
};


// API parameter interface
interface FetchWorldDataParams {
  countries: string[];
  indicators: string[];
  startYear: number;
  endYear: number;
}

// API indicator for fetching data
const INDICATORS = {
  TOTAL_POPULATION: 'SP.POP.TOTL',
  POPULATION_DENSITY: 'EN.POP.DNST',
  POPULATION_GROWTH: 'SP.POP.GROW',
  LIFE_EXPECTANCY: 'SP.DYN.LE00.IN',
  BIRTH_RATE: 'SP.DYN.CBRT.IN',
  DEATH_RATE: 'SP.DYN.CDRT.IN',
  FERTILITY_RATE: 'SP.DYN.TFRT.IN',
};

// function for world population
async function fetchWorldPopulationData({ countries, indicators, startYear, endYear }: FetchWorldDataParams): Promise<WorldBankData[]> {

  const countriesString = countries.join(';');
  const data: WorldBankData[] = [];
  // const indicatorsString = indicators.join(';');
  for (const indicator of indicators) {

    const url = `https://api.worldbank.org/v2/country/${countriesString}/indicator/${indicator}?date=${startYear}:${endYear}&format=json&per_page=1000`;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error('Failed to fetch data....');
    }

    const jsonRes = await res.json();
    if (jsonRes[1]) {
      data.push(...jsonRes[1]);
    }
  }
  return data;
}

// Define an async thunk for fetch API function
// export const fetchWorldBankValue = createAsyncThunk(
//   'featureSlice/fetchWorldBankValue',
//   async () => {
//     const currentYear = new Date().getFullYear();
//     const countries = ['WLD', 'CHN', 'IND', 'USA', 'IDN', 'PAK'];
//     const indicators = Object.values(INDICATORS);
//     const data = await fetchWorldPopulationData({
//       countries,
//       indicators,
//       startYear: currentYear - 5,
//       endYear: currentYear,
//     });
//     // console.log(data);
//     return data;
//   }
// );
export const fetchWorldBankValue = createAsyncThunk(
  'featureSlice/fetchWorldBankValue',
  async ({ range }: { range: number }) => {
    const currentYear = new Date().getFullYear();
    const countries = ['WLD', 'CHN', 'IND', 'USA', 'IDN', 'PAK'];
    const indicators = Object.values(INDICATORS);
    const data = await fetchWorldPopulationData({
      countries,
      indicators,
      startYear: currentYear - range,  // Calculate startYear based on selected range
      endYear: currentYear,
    });
    console.log(data);
    return data;
  }
);


// Define an async thunk
export const fetchValue = createAsyncThunk('featureSlice/fetchValue', async () => {
  const response = await new Promise<{ value: number }>((resolve) => {
    setTimeout(() => {
      resolve({ value: Math.floor(Math.random() * 100) }); // Simulating an API response
    }, 1000);
  });
  return response.value;
});

const featureSlice = createSlice({
  name: 'feature',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchValue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchValue.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.value = action.payload;
      })
      .addCase(fetchValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch value';
      })

      // handle the new world bank data thunk
      .addCase(fetchWorldBankValue.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.countryData = {};
        state.worldData = {};
      })
      .addCase(fetchWorldBankValue.fulfilled, (state, action: PayloadAction<WorldBankData[]>) => {
        state.loading = false;
        const data = action.payload;

        if (!data || data.length === 0) {
          state.error = 'No data received';
          return;
        }

        data.forEach((dataPoint) => {
          const indicatorId = dataPoint.indicator.id;
          const countryId = dataPoint.country.id;
          const year = dataPoint.date;

          // console.log('Processing DataPoint: ', dataPoint);

          if (countryId === '1W') {

            // console.log(`Adding data to worldData for indicator ${indicatorId}`);


            if (!state.worldData[indicatorId]) {
              state.worldData[indicatorId] = [];
            }
            // state.worldData[indicatorId] = [
            //   ...state.worldData[indicatorId],
            //   dataPoint
            // ];
            // state.worldData[indicatorId].push(dataPoint);

            const exists = state.worldData[indicatorId].some(
              (existingDataPoint) => existingDataPoint.date === year
            );

            if (!exists) {
              state.worldData[indicatorId].push(dataPoint);
            }

            // console.log('Updated worldData:', state.worldData[indicatorId]);

          } else {
            if (!state.countryData[countryId]) {
              state.countryData[countryId] = {};
            }
            if (!state.countryData[countryId][indicatorId]) {
              state.countryData[countryId][indicatorId] = [];
            }
            // state.countryData[countryId][indicatorId].push(dataPoint);

            // Check for duplicates in countryData
            const existsInCountryData = state.countryData[countryId][indicatorId].some(
              (existingDataPoint) => existingDataPoint.date === year
            );

            if (!existsInCountryData) {
              state.countryData[countryId][indicatorId].push(dataPoint);
            }

          }
        });
      })
      .addCase(fetchWorldBankValue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch world bank data';
      });
  },
});

export const { increment, decrement, setValue } = featureSlice.actions;

// Selector functions
export const selectWorldData = (state: { feature: FeatureState }) => state.feature.worldData;
export const selectCountryData = (state: { feature: FeatureState }) => state.feature.countryData;
export const selectLoading = (state: { feature: FeatureState }) => state.feature.loading;
export const selectError = (state: { feature: FeatureState }) => state.feature.error;

// Helper function to calculate change in last year
export const calculateChangeLastYear = (data: WorldBankData[]) => {
  if (data.length < 2) return null;
  const sortedData = [...data].sort((a, b) => Number(b.date) - Number(a.date));
  const latestYear = sortedData[0];
  const previousYear = sortedData[1];
  return latestYear.value && previousYear.value
    ? latestYear.value - previousYear.value
    : null;
};

export default featureSlice.reducer;
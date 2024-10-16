'use client';
import useAppDispatch from "@/lib/hooks/appDispatch";
import useAppSelector from "@/lib/hooks/appSelector";
import { decrement, fetchValue, increment } from "@/lib/store/featureSlice";
import { RootState } from "@/lib/store/store";

const ExampleComponent = () => {
  const dispatch = useAppDispatch();
  const { value, loading, error } = useAppSelector((state: RootState) => state.feature);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">{value}</h1>

      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Decrement
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Increment
        </button>
      </div>

      <button
        onClick={() => dispatch(fetchValue())}
        disabled={loading}
        className={`py-2 px-4 rounded text-white font-bold ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'}`}
      >
        {loading ? 'Loading...' : 'Fetch Random Value'}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default ExampleComponent;

import { useEffect, useState } from 'react';

interface CovidData {
    date: number;
    death: number;
    hospitalizedCurrently: number;
    positive: number;
}

const CovidData = () => {
    const [data, setData] = useState<CovidData[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchCovidData = async () => {
            const limit = 10; // Set the limit to 10 entries per page
            const covidUrl = `https://api.covidtracking.com/v1/us/daily.json?page=${currentPage}&limit=${limit}`;
    
            try {
                const covidResponse = await fetch(covidUrl);
                if (covidResponse.ok) {
                    const covidResult: CovidData[] = await covidResponse.json();
                    setData(covidResult);
                } else {
                    throw new Error('Failed to fetch COVID-19 data');
                }
            } catch (error) {
                console.error('Error fetching COVID-19 data: ', error);
            }
        };
    
        fetchCovidData();
    }, [currentPage]);
    

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="bg-cover h-auto" style={{ backgroundImage: `url("/images/background3.avif")` }}>
            {/* <div className='md:grid md:grid-cols-7 flex flex-col gap-2 m-auto p-4 w-full'> */}
            <div className="p-4 md:p-8">
                <h1 className="font-extrabold text-white text-center">COVID-19 Data</h1>
                {data && data.length > 0 && (
                    <div className="md:grid md:grid-cols-7 flex flex-col gap-2 
                    p-4 md:p-8 mt-8 shadow-lg shadow-black w-auto border border-background text-background rounded-xl text-left bg-transparent">
                        <h1><strong>Data</strong></h1>
                        {data.map((entry, index) => (
                            <div key={index} className="mt-4 border p-5 rounded-sm">
                                <p><strong>Date:</strong> {new Date(entry.date).toLocaleDateString()}</p>
                                <p><strong>Deaths:</strong> {entry.death}</p>
                                <p><strong>Hospitalized Currently:</strong> {entry.hospitalizedCurrently}</p>
                                <p><strong>Positive Cases:</strong> {entry.positive}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex justify-between mt-4">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextPage}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
        // </div>
    );
};

export default CovidData;

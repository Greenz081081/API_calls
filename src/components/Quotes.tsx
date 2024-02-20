import { useEffect, useState } from 'react';

interface QuoteData {
    results: { author: string; content: string; dateAdded: number }[];
    totalPages: number;
}

const QuoteResult = () => {
    const [data, setData] = useState<QuoteData | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchQuoteData = async () => {
            const quoteUrl = `https://quotable.io/quotes?page=${currentPage}`;

            try {
                const quoteResponse = await fetch(quoteUrl);
                if (quoteResponse.ok) {
                    const quoteResult: QuoteData = await quoteResponse.json();
                    setData(quoteResult);
                } else {
                    throw new Error('Failed to fetch quotes');
                }
            } catch (error) {
                console.error('Error fetching quotes: ', error);
            }
        };

        fetchQuoteData();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="bg-cover h-auto" style={{ backgroundImage: `url("/images/background.jpg")` }}>
            <div className="p-4 md:p-8">
                <h1 className="font-extrabold text-white text-center">Inspirational Quotes</h1>
                {data && data.results && data.results.length > 0 && (
                    <div className="p-4 md:p-8 mt-8 shadow-lg shadow-black w-auto border border-background text-background rounded-xl text-left bg-transparent">
                        <h1><strong>Quotes</strong></h1>
                        {data.results.map((quote, index) => (
                            <div key={index} className="mt-4">
                                <p>Author: {quote.author}</p>
                                <p>Quote: {quote.content}</p>
                                <p>Date Added: {new Date(quote.dateAdded).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}

                {data && data.totalPages && data.totalPages > 1 && (
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
                            disabled={currentPage === data.totalPages}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuoteResult;

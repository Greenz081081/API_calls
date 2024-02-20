import { useEffect, useState } from 'react';

interface UserData {
    name: {
        first: string;
        last: string;
    };
    email: string;
}

const Users = () => {
    const [data, setData] = useState<UserData[] | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        const fetchUserData = async () => {
            const usersPerPage = 10;
            const startIndex = (currentPage - 1) * usersPerPage;
            const url = `https://randomuser.me/api/?results=${usersPerPage}&page=${currentPage}`;

            try {
                const response = await fetch(url);
                if (response.ok) {
                    const result = await response.json();
                    setData(result.results);
                } else {
                    throw new Error('Failed to fetch user data');
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchUserData();
    }, [currentPage]);

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    return (
        <div className="bg-cover h-auto" style={{ backgroundImage: `url("/images/background2.jpg")` }}>
        <div className="p-4 md:p-8">
            <h1 className="font-extrabold text-white text-center">User List</h1>
            {data && data.length > 0 && (
                <div className="p-4 md:p-8 mt-8 shadow-lg shadow-black w-auto border border-background text-background rounded-xl text-left bg-transparent">
                <ul className='border p-5 w-5/12 rounded-xl shadow-sm shadow-white bg-text/70'>
                    {data.map((user, index) => (
                        <li className='mt-5' key={index}>
                            {user.name.first} {user.name.last} - {user.email}
                        </li>
                    ))}
                </ul>
                </div>
            )}

            <div>
                <button onClick={handlePrevPage} disabled={currentPage === 1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Previous
                </button>
                <span className='text-background'>Page {currentPage}</span>
                <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Next</button>
            </div>
        </div>
        </div>
    );
};

export default Users;

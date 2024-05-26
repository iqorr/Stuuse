import React, {useEffect, useState} from "react";
import './FreeHours.css';

function FreeHours({ typeOfFreeHour }) {
    const [freeHours, setFreeHours] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/free_hours')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const rectorHours = data.filter(hour => hour.typeOfFreeHour === typeOfFreeHour);
                setFreeHours(rectorHours);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [typeOfFreeHour]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container text-center hours-box p-5 mb-3">
            <div className="row g-5">
                {freeHours.map(hour => (
                    <div className="col-md-6 col-12 free-hour">
                        <div className="p-3">
                            <p className="free-hour-faculty">{hour.faculty}</p>
                            <p className="free-hour-date">{new Date(hour.date).toLocaleDateString()}</p>
                            <p className="free-hour-time">{hour.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FreeHours;
import React, {useEffect, useState} from 'react';

const FreeHoursToAccept = ({ typeOfFreeHour }) => {
    const [freeHours, setFreeHour] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/free_hours')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setFreeHour(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, [typeOfFreeHour]);

    const unverifiedFreeHours = freeHours.filter(hour => !hour.verified && hour.typeOfFreeHour === typeOfFreeHour);

    return (
        unverifiedFreeHours.map(freeHour => (
        <div className="free-hour-card">
            <div className="hour-info2">
                {freeHour.faculty}<br/>{new Date(freeHour.date).toLocaleDateString()}<br/>
                {freeHour.duration}
            </div>
            <div className="actions">
                <button className="approve">✓</button>
                <button className="reject">✗</button>
            </div>
        </div>
        ))
    );
}

export default FreeHoursToAccept
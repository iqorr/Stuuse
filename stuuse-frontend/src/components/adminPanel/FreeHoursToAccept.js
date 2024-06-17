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

    const handleApprove = hourId => {
        const freeHour = freeHours.find(fh => fh.hourId === hourId);
        if (!freeHour) {
            console.error('Free hour not found');
            return;
        }

        const updatedData = {
            ...freeHour,
            verified: true
        };

        const url = `http://localhost:8080/api/free_hours/${hourId}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update free hour status');
                }
                return response.json();
            })
            .then(() => {
                const updatedContent = freeHours.map(fh =>
                    fh.hourId === hourId ? { ...fh, verified: true } : fh
                );
                setFreeHour(updatedContent);
            })
            .catch(error => {
                console.error('Error updating free hour:', error);
            });
    };

    const handleReject = hourId => {
        const url = `http://localhost:8080/api/free_hours/${hourId}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete free hour');
                }
                setFreeHour(freeHours.filter(fh => fh.hourId !== hourId));
            })
            .catch(error => {
                console.error('Error deleting free hour:', error);
            });
    };


    const unverifiedFreeHours = freeHours.filter(hour => hour.typeOfFreeHour === typeOfFreeHour);

    return (
        unverifiedFreeHours.map(freeHour => (
            <div className="free-hour-card">
                <div className="hour-info2">
                    {freeHour.faculty}<br/>{new Date(freeHour.date).toLocaleDateString()}<br/>
                    {freeHour.duration}
                </div>
                <div className="actions">
                    {!freeHour.verified && (
                        <button className="approve" onClick={() => handleApprove(freeHour.hourId)}>✓</button>
                    )}
                    <button className="reject" onClick={() => handleReject(freeHour.hourId)}>✗</button>
                </div>
            </div>
        ))
    );
}

export default FreeHoursToAccept
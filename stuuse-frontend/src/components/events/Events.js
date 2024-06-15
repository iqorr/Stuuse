import React, {useEffect, useState} from "react";
import './Events.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Events({ typeOfContent }) {
    const [content, setContent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/content')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const events = data.filter(event => event.typeOfContent === typeOfContent && event.verified).map(event => ({
                    ...event,
                    lastRated: localStorage.getItem(`lastRated_${event.contentId}`) || null
                }));
                setContent(events);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [typeOfContent]);

    const updateEvent = (id, changes) => {
        fetch(`http://localhost:8080/api/content/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes)
        }).then(response => response.json())
            .then(() => {
                setContent(currentContent => currentContent.map(event => event.contentId === id ? {...event, ...changes, lastRated: new Date().toISOString()} : event));
                localStorage.setItem(`lastRated_${id}`, new Date().toISOString());
                alert("Pomyślnie oceniono wydarzenie!");
            })
            .catch(error => console.error('Error updating event:', error));
    };

    const handleLike = (event) => {
        const updatedLikes = event.likes + 1;
        updateEvent(event.contentId, {...event, likes: updatedLikes});
    };

    const handleDislike = (event) => {
        const updatedDislikes = event.dislikes + 1;
        updateEvent(event.contentId, {...event, dislikes: updatedDislikes});
    };

    const canRateAgain = (lastRatedTime) => {
        if (!lastRatedTime) return true;
        const lastRatedDate = new Date(lastRatedTime);
        const now = new Date();
        return (now - lastRatedDate) > 36000000; // 10 hours in milliseconds
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container text-center p-5 mb-3">
            <div className="row g-5">
                {content.map((event, index) => (
                    <div key={event.contentId} className="col-xl-6">
                        <div className="events-header h-100 p-3 border rounded-3">
                            <div>
                                <img src={event.image} alt={event.title} style={{
                                    width: '280px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    marginBottom: '50px',
                                    marginRight: '10px'
                                }}/>
                                <div className="card-interaction">
                                    {canRateAgain(event.lastRated) ? (
                                        <>
                                            <button className="button green-button" onClick={() => handleLike(event)}>
                                                <FontAwesomeIcon icon={faHeart}/></button>
                                            <button className="button red-button" onClick={() => handleDislike(event)}>
                                                <FontAwesomeIcon icon={faThumbsDown}/></button>
                                        </>
                                    ) : (
                                        <>
                                            <h6><FontAwesomeIcon icon={faHeart}/>: {event.likes}</h6>
                                            <h6><FontAwesomeIcon icon={faThumbsDown}/>: {event.dislikes}</h6>
                                        </>
                                    )}
                                </div>
                            </div>
                            <div>
                                <h3>{event.title},</h3>
                                <h3>{event.address}</h3>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Events;
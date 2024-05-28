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
                const events = data.filter(event => event.typeOfContent === typeOfContent);
                setContent(events);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [typeOfContent]);

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
                    <div key={event.id} className="col-xl-6">
                        <div className="events-header h-100 p-3 border rounded-3">
                            <div>
                                <img src={event.image} alt={event.title} style={{
                                    width: '280px',
                                    height: '150px',
                                    objectFit: 'cover',
                                    marginBottom: '50px'
                                }}/>
                                <div className="card-interaction">
                                <button className="button green-button"><FontAwesomeIcon icon={faHeart}/></button>
                                <button className="button red-button"><FontAwesomeIcon icon={faThumbsDown}/></button>
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
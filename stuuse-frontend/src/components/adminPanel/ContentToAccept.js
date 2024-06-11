import React, {useEffect, useState} from 'react';

const ContentToAccept = () => {
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/content')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContent(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const unverifiedContent = content.filter(cont => !cont.verified);

    return (
        unverifiedContent.map(content => (
            <div className="content-card">
                <div className="event-info">
                    {content.title}, {content.address}
                </div>
                <div className="actions">
                    <button className="approve">✓</button>
                    <button className="reject">✗</button>
                </div>
            </div>
        ))
    );
}

export default ContentToAccept
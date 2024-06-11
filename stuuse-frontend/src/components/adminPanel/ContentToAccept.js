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

    const handleApprove = contentId => {
        const cont = content.find(c => c.contentId === contentId);
        if (!cont) {
            console.error('Content not found');
            return;
        }

        const updatedData = {
            ...cont,
            verified: true
        };

        const url = `http://localhost:8080/api/content/${contentId}`;
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
                    throw new Error('Failed to update content status');
                }
                return response.json();
            })
            .then(() => {
                const updatedContent = content.map(c =>
                    c.contentId === contentId ? { ...c, verified: true } : c
                );
                setContent(updatedContent);
            })
            .catch(error => {
                console.error('Error updating content:', error);
            });
    };

    const handleReject = contentId => {
        const url = `http://localhost:8080/api/content/${contentId}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete content');
                }
                setContent(content.filter(c => c.contentId !== contentId));
            })
            .catch(error => {
                console.error('Error deleting content:', error);
            });
    };

    const unverifiedContent = content.filter(cont => !cont.verified);

    return (
        unverifiedContent.map(content => (
            <div className="content-card">
                <div className="event-info">
                    {content.title}, {content.address}
                </div>
                <div className="actions">
                    <button className="approve" onClick={() => handleApprove(content.contentId)}>✓</button>
                    <button className="reject" onClick={() => handleReject(content.contentId)}>✗</button>
                </div>
            </div>
        ))
    );
}

export default ContentToAccept
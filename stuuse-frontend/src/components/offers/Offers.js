import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Offers.css';
import { faHeart, faThumbsDown } from '@fortawesome/free-solid-svg-icons';

function Offers({ typeOfContent }) {
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
                const offers = data.filter(offer => offer.typeOfContent === typeOfContent && offer.verified).map(offer => ({
                    ...offer,
                    lastRated: localStorage.getItem(`lastRated_${offer.contentId}`) || null
                }));
                setContent(offers);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setError(error.message);
                setIsLoading(false);
            });
    }, [typeOfContent]);

    const updateOffer = (id, changes) => {
        fetch(`http://localhost:8080/api/content/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(changes)
        }).then(response => response.json())
            .then(() => {
                setContent(currentContent => currentContent.map(offer => offer.contentId === id ? {...offer, ...changes, lastRated: new Date().toISOString()} : offer));
                localStorage.setItem(`lastRated_${id}`, new Date().toISOString());
                alert("Pomyślnie oceniono ofertę!");
            })
            .catch(error => console.error('Error updating offer:', error));
    };

    const handleLike = (offer) => {
        const updatedLikes = offer.likes + 1;
        updateOffer(offer.contentId, {...offer, likes: updatedLikes});
    };

    const handleDislike = (offer) => {
        const updatedDislikes = offer.dislikes + 1;
        updateOffer(offer.contentId, {...offer, dislikes: updatedDislikes});
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
        <div className="container">
            <div className="row mt-5 justify-content-center">
                {content.map((offer, index) => (
                    <div key={offer.id} className="col-md-6 col-lg-4 mb-5">
                        <div className="container">
                            <div className="row">
                                <div className="card mx-auto p-0">
                                    <img className="card-img-top" src={offer.image} alt={offer.title} />
                                    <div className="card-body rounded-bottom">
                                        <div className="card-title">
                                            <p className="offer-name">{offer.title}</p>
                                            <p className="offer-address">{offer.address}</p>
                                        </div>
                                        <p className="card-description">{offer.description}</p>
                                        <div className="card-interaction">
                                            {canRateAgain(offer.lastRated) ? (
                                                <>
                                                    <button className="button green-button"
                                                            onClick={() => handleLike(offer)}>
                                                        <FontAwesomeIcon icon={faHeart}/></button>
                                                    <p className="offer-code">{offer.discountCode}</p>
                                                    <button className="button red-button"
                                                            onClick={() => handleDislike(offer)}>
                                                        <FontAwesomeIcon icon={faThumbsDown}/></button>
                                                </>
                                            ) : (
                                                <>
                                                    <h6><FontAwesomeIcon icon={faHeart}/>: {offer.likes}</h6>
                                                    <p className="offer-code">{offer.discountCode}</p>
                                                    <h6><FontAwesomeIcon icon={faThumbsDown}/>: {offer.dislikes}</h6>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Offers;

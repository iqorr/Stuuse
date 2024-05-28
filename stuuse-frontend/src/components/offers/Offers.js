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
                const offers = data.filter(offer => offer.typeOfContent === typeOfContent);
                setContent(offers);
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
                                            <button className="button green-button">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </button>
                                            <p className="offer-code">{offer.discountCode}</p>
                                            <button className="button red-button">
                                                <FontAwesomeIcon icon={faThumbsDown} />
                                            </button>
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

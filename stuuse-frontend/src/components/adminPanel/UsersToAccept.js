import React, {useEffect, useState} from 'react';

const UsersToAccept = () => {
    const [users, setUsers] = useState([]);

    const accountTypeMapping = {
        THIRD_PARTY_COMPANY: 'Firma trzecia',
        PL_EMPLOYEE: 'Pracownik PŁ',
        ADMINISTRATOR: 'Administrator'
    };

    useEffect(() => {
        fetch('http://localhost:8080/api/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    }, []);

    const unverifiedUsers = users.filter(user => !user.verified);

    return (
        unverifiedUsers.map(user => (
            <div className="content-card">
                <div className="user-info">
                    {user.name} {user.lastname} "{accountTypeMapping[user.accType]}" {user.email}
                </div>
                <div className="actions">
                    <button className="approve">✓</button>
                    <button className="reject">✗</button>
                </div>
            </div>
        ))
    );
}

export default UsersToAccept
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

    const handleApprove = userId => {
        const user = users.find(u => u.userId === userId);
        if (!user) {
            console.error('User not found');
            return;
        }

        const updatedData = {
            ...user,
            verified: true
        };

        const url = `http://localhost:8080/api/users/${userId}`;
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
                    throw new Error('Failed to update user status');
                }
                return response.json();
            })
            .then(() => {
                const updatedUsers = users.map(u =>
                    u.userId === userId ? { ...u, verified: true } : u
                );
                setUsers(updatedUsers);
            })
            .catch(error => {
                console.error('Error updating user:', error);
            });
    };

    const handleReject = userId => {
        const url = `http://localhost:8080/api/users/${userId}`;
        fetch(url, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete user');
                }
                setUsers(users.filter(user => user.userId !== userId));
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    };

    const unverifiedUsers = users.filter(user => !user.verified);

    return (
        unverifiedUsers.map(user => (
            <div className="content-card">
                <div className="user-info">
                    {user.name} {user.lastname} "{accountTypeMapping[user.accType]}" {user.email}
                </div>
                <div className="actions">
                    <button className="approve" onClick={() => handleApprove(user.userId)}>✓</button>
                    <button className="reject" onClick={() => handleReject(user.userId)}>✗</button>
                </div>
            </div>
        ))
    );
}

export default UsersToAccept
import React from 'react';
import { Link } from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <ul>
                <li><Link to="*">Home</Link></li>
                <li><Link to="admin">AdminPanel</Link></li>
            </ul>
        </nav>
    );
}

export default Navigation;
// Path: Stuuse/stuuse-frontend/src/pages/administration-panel/Navigation.js
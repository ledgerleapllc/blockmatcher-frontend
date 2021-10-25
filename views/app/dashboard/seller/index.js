import React from 'react';
import HeaderView from './header';
import OfferTable from './offer';

const UserDashboard = () => {

    return (
        <div id="app-dashboard-page">
            <div className="c-container">
                <HeaderView />
                <OfferTable />
            </div>
        </div>
    );
}

export default UserDashboard;
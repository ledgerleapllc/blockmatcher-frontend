import React from 'react';
import HeaderView from './header';
import SaleOfferTable from './sale-offer';
import BuyOfferTable from './buy-offer';
import BatchTable from './batch';

const AdminDashboard = () => {

    return (
        <div id="app-dashboard-page">
            <div className="c-container">
                <HeaderView />
                <SaleOfferTable />
                <BuyOfferTable />
                <BatchTable />
            </div>
        </div>
    );
}

export default AdminDashboard;
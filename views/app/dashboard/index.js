import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import AdminDashboard from './admin';
import SellerDashboard from './seller';
import BuyerDashboard from './buyer';

const Dashboard = () => {

    const { authUser } = useSelector((state) => state.global);
    const goLogin = <Redirect to="/login" />;
    if (!authUser || !authUser.id) return goLogin;

    if (authUser.role === 'admin')
        return <AdminDashboard />
    else if (authUser.role === 'user') {
        if (authUser.type === 'seller')
            return <SellerDashboard />;
        else if (authUser.type === 'buyer')
            return <BuyerDashboard />;
        else
            return goLogin;

    } else return goLogin;


};

export default Dashboard;
import React from 'react';
import { Route } from 'react-router-dom';

import Header from '../components/Header/index';
import MenuHeader from '../components/MenuHeader/index';
import Footer from '../components/Footer/index';
import './styles.css'

function DefaultLayout({ component: Component, ...props }) {
    return (
        <Route
            {...props}
            render={(routerProps) => (
                <>
                    <Header currentPath={routerProps.match.path} />
                    <MenuHeader />
                    <div className="main">
                        <Component {...routerProps} />
                    </div>
                    <Footer />
                </>
            )}
        />
    );
}

export default DefaultLayout;
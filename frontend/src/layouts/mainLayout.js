import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';

const MainLayout = ({component}) => {
  return (
    <div>
      <Header />
      <div className="main">
      {component}
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
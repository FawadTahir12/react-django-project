import React from 'react';
import Header from './../components/Header';
import Footer from './../components/Footer';
const HomePageLayout = ({component}) => {
  return (
    <div className='fullHeight'>
      <Header />
      {component}
      <Footer />
    </div>
  );
};

export default HomePageLayout;
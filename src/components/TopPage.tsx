import React from 'react';
import 'components/TopPage.css';
import Image from 'Images/page_top_test.jpg';

const TopPage: React.VFC = () => {
  return (
    <div className="page-top">
      <img src={Image} className="title-image"/>
      <p className="page-title">kojikoji's Blog</p>
    </div>
  )
}

export { TopPage };

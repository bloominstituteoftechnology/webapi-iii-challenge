import React from 'react';
import {FaCertificate} from 'react-icons/fa';

import './LoaderStar.css';

const LoaderStar = (props) => {
  return (
    <section style={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', minHeight: '300px', width: '200px'}}>
      <FaCertificate style={{fontSize: '32px', animation: 'rotating 2s ease infinite' }} />
      <h2>Loading...</h2>
    </section>
  )
}

export default LoaderStar

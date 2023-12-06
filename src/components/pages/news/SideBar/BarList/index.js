import React from 'react';
import './sytle.css';

const BarList = ({ blog: { title, cover } }) => (
    <div className="barlist-wrap">
        <img src={cover} alt="cover" className="barlist-cover" />
        <p>{title}</p>
    </div>
);

export default BarList;

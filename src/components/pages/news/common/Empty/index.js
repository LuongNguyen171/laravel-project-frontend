// Display a state when the list or data is empty.
import React from 'react';
import './style.css';

const EmptyList = () => {
    return (
        <div className="emptylist-wrap">
            <img src="/assets/images/13525-empty.gif" alt="empty" />
            <h1>Không tìm thấy</h1>
        </div>
    );
};

export default EmptyList;

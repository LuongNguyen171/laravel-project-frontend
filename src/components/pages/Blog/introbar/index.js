import React from 'react';
import './style.css';

const IntroBar = () => {
    return (
        <div className="contact-bar">
            <div className="left-bar">
                <strong>Chia sẻ: </strong>
                <a className="share-fb" href="https://www.facebook.com/">
                    Facebook
                </a>
                <a className="share-ig" href="https://www.instagram.com/">
                    Instagram
                </a>
            </div>

            <div className="right-bar">
                Chuyên mục:
                <button onClick={() => (window.location.href = '/news')}>
                    Tin tức
                </button>
            </div>
        </div>
    );
};

export default IntroBar;

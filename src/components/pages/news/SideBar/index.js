import React from 'react';
import BarList from './BarList';
import './stye.css';

const SideBar = ({ blogs }) => {
    const featuredArticles = blogs.slice(0, 4);
    return (
        <div className="sidebar">
            <h3>TIN TỨC NỔI BẬT</h3>
            <div className="sidebar-wrap">
                {featuredArticles.map((blog) => (
                    <BarList blog={blog} key={blog.id} />
                ))}
            </div>
        </div>
    );
};
export default SideBar;

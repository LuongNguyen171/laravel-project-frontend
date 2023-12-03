import React from 'react';
import BarList from './BarList';
import './stye.css';

const SideBar = ({ blogs }) => (
    <div className="sidebar">
        <h3>Tin tức nổi bật</h3>
        <hr />
        <div className="sidebar-wrap">
            {blogs.map((blog) => (
                <BarList blog={blog} key={blog.id} />
            ))}
        </div>
    </div>
);
export default SideBar;

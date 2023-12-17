import React from 'react';
import './style.css';
import Chip from '../../common/Chip';
import { Link } from 'react-router-dom';

const BlogItem = ({
    blog: {
        id,
        description,
        title,
        createdAt,
        authorName,
        authorAvatar,
        category,
        cover,
    },
}) => (
    <div className="blogItem-wrap">
        <img src={cover} alt="cover" className="blogItem-cover" />
        <Chip label={category} />
        <h3>{title}</h3>
        <div className="blogItem-author">
            <img src={authorAvatar} alt="avatar" />
            <div>
                <p>
                    {authorName} - {createdAt}
                </p>
            </div>
        </div>
        <p className="blogItem-desc">{description}</p>

        <footer>
            <Link className="blogItem-link" to={`/blog/${id}`}>
                Đọc Tiếp
            </Link>
        </footer>
    </div>
);

export default BlogItem;

import React, { useEffect, useState } from 'react';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import EmptyList from '../news/common/Empty';
import { detailList } from '~/config/detail';
import IntroBar from './introbar';
import Comments from './commentSection/Comments';

const Blog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const parsedId = parseInt(id);
        let blog = detailList.find((blog) => blog.id == parsedId);
        if (blog) {
            setBlog(blog);
        }
    }, []);

    return (
        <>
            <div className="container">
                <Link className="blog-goBack" to="/news">
                    <span> &#8592;</span> <span>Trở Lại</span>
                </Link>

                <div className="show-blog">
                    {blog ? (
                        <div className="blog-wrap">
                            <header>
                                <h1>{blog.title}</h1>
                                <p className="blog-date">
                                    {blog.authorName} - {blog.createdAt}
                                </p>
                                <div className="summary">
                                    <ul>
                                        <li>
                                            <h3>Nội dung bài viết</h3>
                                        </li>
                                        <li>
                                            <a
                                                className="main-title"
                                                href="#main-title1"
                                            >
                                                {blog.subtitle1}
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#sub-title1">
                                                        {blog.sub1}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a
                                                className="main-title"
                                                href="#main-title2"
                                            >
                                                {blog.subtitle2}
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#sub-title2">
                                                        {blog.sub2}
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </header>
                            <div className="main-content">
                                <img src={blog.cover1} alt="cover" />
                                <p className="blog-desc">{blog.description}</p>

                                <h2 id="main-title1">
                                    <strong>{blog.subtitle1}</strong>
                                </h2>
                                <p className="blog-desc">{blog.descsub1}</p>
                                <h3 id="sub-title1">{blog.sub1}</h3>
                                <p className="blog-desc">{blog.detailSub1} </p>
                                <img src={blog.cover2} alt="cover" />

                                <h2 id="main-title2">
                                    <strong>{blog.subtitle2}</strong>
                                </h2>
                                <p className="blog-desc">{blog.descsub2}</p>
                                <img src={blog.cover3} alt="cover" />
                                <h3 id="sub-title2">{blog.sub2}</h3>
                                <p className="blog-desc">{blog.detailSub2}</p>
                            </div>
                        </div>
                    ) : (
                        <EmptyList />
                    )}
                </div>

                <div className="contact-bar">
                    <IntroBar />
                </div>

                <div className="comment">
                    <Comments
                        // commentsUrl="http://localhost:3000/comments"
                        currentUserId="1"
                    />
                </div>
            </div>
        </>
    );
};

export default Blog;

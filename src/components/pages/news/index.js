import classNames from 'classnames/bind';
import styles from './News.module.scss';
import SearchBar from './SearchBar';
import BlogList from './BlogList';
import { blogList } from '~/config/data';
import { useState } from 'react';
import EmptyList from './common/Empty';
import SideBar from './SideBar';

const cx = classNames.bind(styles);

function News() {
    const [blogs, setBlogs] = useState(blogList);
    const [searchKey, setSearchKey] = useState('');

    // Search Submit
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        handleSearchResults();
    };

    // Search for blogs by category
    const handleSearchResults = () => {
        const allBlogs = blogList;
        const filteredBlogs = allBlogs.filter((blog) =>
            blog.category
                .toLowerCase()
                .includes(searchKey.toLowerCase().trim()),
        );

        setBlogs(filteredBlogs);
    };

    const handleClearSearch = () => {
        setBlogs(blogList);
        setSearchKey('');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <SideBar blogs={blogs} />
                </div>
                <div className={cx('right-content')}>
                    <SearchBar
                        value={searchKey}
                        clearSearch={handleClearSearch}
                        formSubmit={handleSearchSubmit}
                        handleSearchKey={(e) => setSearchKey(e.target.value)}
                    />
                    <div className={cx('main-content')}>
                        {!blogs.length ? (
                            <EmptyList />
                        ) : (
                            <BlogList blogs={blogs} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default News;

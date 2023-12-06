import classNames from 'classnames/bind';
import styles from './News.module.scss';

const cx = classNames.bind(styles);

function News() {
    const [blogs, setBlogs] = useState(blogList);

    // lOGIC FOR SEARCHBAR
    // const [searchKey, setSearchKey] = useState('');

    // //Search Submit
    // const handleSearchSubmit = (event) => {
    //     event.preventDefault();
    //     handleSearchResults();
    // };

    // //Search for blogs by category
    // const handleSearchResults = () => {
    //     const allBlogs = blogList;
    //     const filteredBlogs = allBlogs.filter((blog) =>
    //         blog.category
    //             .toLowerCase()
    //             .includes(searchKey.toLowerCase().trim()),
    //     );

    //     setBlogs(filteredBlogs);
    // };

    // const handleClearSearch = () => {
    //     setBlogs(blogList);
    //     setSearchKey('');
    // };

    // LOGIC FOR STICKY SIDEBAR
    // const [fix, setFix] = useState(false);
    // function setFixedSidebar() {
    //     if (window.scrollY >= 500) {
    //         setFix(true);
    //     } else {
    //         setFix(false);
    //     }
    // }
    // window.addEventListener('scroll', setFixedSidebar);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('left-content')}>
                    <SideBar blogs={blogs} />
                </div>
                <div className={cx('right-content')}>
                    <a href="#">
                        <h1>TIN TỨC</h1>
                    </a>
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

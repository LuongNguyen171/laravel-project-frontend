import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import ProductShow from '~/components/Layout/comps/product';

import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from 'react-bootstrap/Pagination';
import styles from './ProductPagination.module.scss';
import { useNavigate } from 'react-router-dom';
import { convertPriceToFloat } from '~/components/Layout/comps/product/productHandleMethod';
const cx = classNames.bind(styles);

function ProductPagination({ productList }) {

    const [arrayProduct, setArrayProduct] = useState([])
    const [arrayProductOriginal, setArrayProductOriginal] = useState([])

    const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
    const [productsPerPage] = useState(8); // Số lượng sản phẩm trên mỗi trang

    // Tính toán chỉ mục bắt đầu và kết thúc cho trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = arrayProduct.slice(indexOfFirstProduct, indexOfLastProduct);
    const [activeInput, setActiveInput] = useState(null);

    const navigate = useNavigate()

    // Tạo danh sách số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(arrayProduct.length / productsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleInputChange = (inputIndex) => {
        setActiveInput(inputIndex);
    };

    useEffect(() => {
        setArrayProduct([...productList])
        setArrayProductOriginal([...productList])
    }, [productList])


    useEffect(() => {
        let arrayProductTemp = [...arrayProduct]

        switch (activeInput) {
            case 0:
            case 5:
                setArrayProduct(arrayProductOriginal)
                break;
            case 1:
            case 4:
                setArrayProduct(arrayProductTemp.reverse())
                break;
            case 2:
            case 3:
                setArrayProduct([...arrayProductTemp].sort((a, b) => {
                    const priceA = convertPriceToFloat(a.productPrice);
                    const priceB = convertPriceToFloat(b.productPrice);
                    return activeInput === 2 ? priceA - priceB : priceB - priceA;
                }));
                break;
            default:
                break;
        }

    }, [activeInput])

    return (<div className={cx('wrapper')}>
        <div className={cx('container')}>

            <div className={cx('arrange_container')}>
                <h3 className={cx('arrange')}>Sắp xếp: </h3>

                {['A-Z', 'Z-A', 'Giá tăng dần', 'Giá giảm dần', 'Hàng mới nhất', 'Hàng cũ nhất'].map((label, index) => (
                    <div className={cx('arrange_input')} key={index}>
                        <input
                            type="radio"
                            checked={index === activeInput}
                            onChange={() => handleInputChange(index)}
                        />
                        <div className={cx('input_label')}>
                            <p>{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className={cx('layout_container')}>
                {currentProducts.map((product) => (
                    <div className={cx('product')} key={product.productId}
                        onClick={() => navigate(`/detail/?productId=${product.productId}`)}>
                        <ProductShow productName={product.productName}
                            productImage={product.productImage}
                            productPrice={product.productPrice}
                            productDiscount={product.productDiscount} />

                    </div>
                ))}

            </div>

            <div className={cx('pagination_container')}>
                <Pagination size="lg">
                    <Pagination.Prev />
                    {pageNumbers.map((number) => (

                        <Pagination.Item
                            onClick={() => handlePageChange(number)}
                            key={number}
                            active={number === currentPage}
                        >{number}
                        </Pagination.Item>

                    ))}
                    <Pagination.Last />
                </Pagination>

            </div>
        </div>
    </div>);
}

export default ProductPagination;
import './ProductListPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import DataGridMain from '~/components/table';
import AddProductModal from '~/components/modal/AddProductModal';
import UpdateProductModal from '~/components/modal/UpdateProductModal';
import DeleteProductModal from '~/components/modal/DeleteProductModal';
import {
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    handleGetProductById,
} from '~/components/callAPI/product.api';

const ProductPage = () => {
    const [isAddModalOpen, setAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [productId, setProductId] = useState(null);
    const [updateProductData, setUpdateProductData] = useState({});

    useEffect(() => {
        getAllProducts();
    }, []);

    const getAllProducts = async () => {
        const response = await getProducts();
        if (response && response.status === 200) {
            setProducts(response.data);
        }
    };

    const handleAdd = async (data) => {
        const productData = {
            productName: data.productName,
            productPrice: data.price,
            styleId: 1,
            productImage: data.image,
            productStatus: data.status,
            productQuantity: data.quantity,
            productSoldQt: data.quantitySold,
            productInfor: data.description,
            productIntro: 'Giới thiệu sản phẩm',
            productDiscount: data.discount,
            productTmName: data.trademark,
        };
        try {
            const response = await addProduct(productData);
            if (response && response.status === 200) {
                await getAllProducts();
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    // useEffect(() => {
    //     console.log('updateProductData after set:', updateProductData);
    // }, [updateProductData]);

    const getUpdateProductData = async (id) => {
        try {
            const response = await handleGetProductById(id);
            setUpdateProductData(response);
        } catch (error) {
            console.log('Error getting product data: ', error);
        }
    };

    const handleEdit = async (data) => {
        try {
            const response = await updateProduct(data);
            if (response && response.status === 200) {
                await getAllProducts();
            }
        } catch (error) {
            console.log('Error: ', error);
        }
    };

    const handleDelete = async () => {
        try {
            let response = await deleteProduct(productId);
            if (response && response.status === 200) {
                await getAllProducts();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const rows = products.map((product) => ({
        id: product.productId,
        productName: product.productName,
        trademark: product.productTmName,
        price: product.productPrice,
        quantity: product.productQuantity,
        quantitySold: product.productSoldQt,
        discount: product.productDiscount + '%',
        operation: '',
    }));

    const columns = [
        {
            field: 'id',
            headerName: 'Id',
            flex: 0.3,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'productName',
            headerName: 'Tên sản phẩm',
            flex: 1.2,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'trademark',
            headerName: 'Tên thương hiệu',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'price',
            headerName: 'Giá',
            flex: 0.8,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'quantity',
            headerName: 'Số lượng',
            flex: 0.8,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'quantitySold',
            headerName: 'Đã bán',
            flex: 0.8,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'discount',
            headerName: 'Giảm giá',
            flex: 0.8,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                let text = params.value;
                return <Typography variant="h5">{text}</Typography>;
            },
        },
        {
            field: 'operation',
            headerName: 'Thao tác',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return (
                    <Typography variant="h5" fontWeight="bold">
                        {headerName}
                    </Typography>
                );
            },
            renderCell: (params) => {
                return (
                    <Box
                        style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            sx={{ mr: '30px' }}
                            onClick={() => {
                                getUpdateProductData(params.row.id);
                                setUpdateModalOpen(true);
                            }}
                        >
                            <EditIcon
                                fontSize="large"
                                sx={{ color: 'green' }}
                            />
                        </IconButton>
                        <IconButton
                            onClick={() => {
                                setProductId(params.row.id);
                                setDeleteModalOpen(true);
                            }}
                        >
                            <DeleteForeverIcon
                                fontSize="large"
                                sx={{ color: 'red' }}
                            />
                        </IconButton>
                    </Box>
                );
            },
        },
    ];

    return (
        <Box className="container" style={{ padding: '0 20px 40px 20px' }}>
            <Box
                className="card-data-header"
                style={{
                    flexDirection: 'column',
                    border: 'var(--border-color)',
                    padding: '24px 0',
                }}
            >
                <Typography variant="h3" fontWeight="bold" marginBottom="10px">
                    Quản lý sản phẩm
                </Typography>
                <Box
                    className="header-button"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: ' 16px',
                        width: '100%',
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<AddIcon fontSize="large" />}
                        disableRipple
                        onClick={() => {
                            setAddModalOpen(true);
                        }}
                    >
                        <Typography style={{ fontSize: '14px' }}>
                            Thêm
                        </Typography>
                    </Button>
                </Box>
            </Box>
            <DataGridMain rows={rows} columns={columns} />

            {isAddModalOpen && (
                <AddProductModal
                    open={isAddModalOpen}
                    onClose={() => {
                        setAddModalOpen(false);
                    }}
                    onAdd={handleAdd}
                />
            )}

            {isUpdateModalOpen && (
                <UpdateProductModal
                    open={isUpdateModalOpen}
                    onClose={() => {
                        setUpdateModalOpen(false);
                    }}
                    onEdit={handleEdit}
                    data={updateProductData}
                />
            )}

            {isDeleteModalOpen && (
                <DeleteProductModal
                    open={isDeleteModalOpen}
                    onClose={() => {
                        setProductId(null);
                        setDeleteModalOpen(false);
                    }}
                    onDelete={handleDelete}
                />
            )}
        </Box>
    );
};

export default ProductPage;

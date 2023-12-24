import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    MenuItem,
    Grid,
    Typography,
    Select,
} from '@mui/material';

const UpdateProductModal = ({ open, onClose, onEdit, data }) => {
    const [updateProductData, setUpdateProductData] = useState({
        productName: '',
        productPrice: '',
        styleId: '',
        productImage: '',
        productStatus: '',
        productQuantity: '',
        productSoldQt: '',
        productInfor: '',
        productIntro: '',
        productDiscount: '',
        productTmName: '',
        product_image: [],
        // eslint-disable-next-line
        styleId: '',
    });

    useEffect(() => {
        if (data) {
            setUpdateProductData(data);
        }
    }, [data]);

    const handleEdit = () => {
        console.log('updated product data:', updateProductData);
        onEdit(updateProductData);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle fontSize="24px">Cập nhật sản phẩm</DialogTitle>
            <DialogContent fontSize="20px">
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                                marginBottom: '-10px',
                            }}
                        >
                            Tên sản phẩm
                        </Typography>
                        <TextField
                            sx={{ marginTop: '10px', fontSize: '16px' }}
                            fullWidth
                            value={updateProductData.productName}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productName: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Giá sản phẩm
                        </Typography>
                        <TextField
                            type="number"
                            fullWidth
                            value={updateProductData.productPrice}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productPrice: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Thương hiệu
                        </Typography>
                        <TextField
                            fullWidth
                            value={updateProductData.productTmName}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productTmName: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Số lượng
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            value={updateProductData.productQuantity}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productQuantity: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Đã bán
                        </Typography>
                        <TextField
                            id="quantitySold"
                            fullWidth
                            type="number"
                            value={updateProductData.productSoldQt}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productSoldQt: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Thông tin sản phẩm
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={updateProductData.productInfor}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productInfor: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Giới thiệu sản phẩm
                        </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            value={updateProductData.productIntro}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productIntro: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Giảm giá
                        </Typography>
                        <TextField
                            fullWidth
                            type="number"
                            value={updateProductData.productDiscount}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productDiscount: e.target.value,
                                }));
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Tình trạng
                        </Typography>

                        {data.productStatus === 1 && (
                            <Select
                                fullWidth
                                defaultValue={true}
                                onChange={(e) => {
                                    setUpdateProductData((prevData) => ({
                                        ...prevData,
                                        productStatus: e.target.value,
                                    }));
                                }}
                            >
                                <MenuItem value={true}>Mới</MenuItem>
                                <MenuItem value={false}>Cũ</MenuItem>
                            </Select>
                        )}
                        {data.productStatus === 0 && (
                            <Select
                                fullWidth
                                defaultValue={false}
                                onChange={(e) => {
                                    setUpdateProductData((prevData) => ({
                                        ...prevData,
                                        productStatus: e.target.value,
                                    }));
                                }}
                            >
                                <MenuItem value={true}>Mới</MenuItem>
                                <MenuItem value={false}>Cũ</MenuItem>
                            </Select>
                        )}

                        {/* <TextField
                            select
                            fullWidth
                            value={updateProductData.productStatus}
                            onChange={(e) => {
                                setUpdateProductData((prevData) => ({
                                    ...prevData,
                                    productStatus: e.target.value,
                                }));
                            }}
                        >
                            <MenuItem value="true">Mới</MenuItem>
                            <MenuItem value="false">Cũ</MenuItem>
                        </TextField> */}
                    </Grid>
                    {/* <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Hình ảnh sán phẩm
                        </Typography>
                        <TextField
                            id="image"
                            type="file"
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                            onChange={handleImageChange}
                        />
                    </Grid>
                    {image && (
                        <Grid item xs={12}>
                            <img
                                src={image}
                                alt="Product"
                                style={{ maxWidth: '20%', maxHeight: '100px' }}
                            />
                        </Grid>
                    )} */}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                    Hủy
                </Button>
                <Button
                    onClick={handleEdit}
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                    Sửa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UpdateProductModal;

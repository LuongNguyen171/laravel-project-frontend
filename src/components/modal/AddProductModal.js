import React, { useState } from 'react';
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

const AddProductModal = ({ open, onClose, onAdd }) => {
    const [image, setImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [trademark, setTrademark] = useState('');
    const [quantity, setQuantity] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [description, setDescription] = useState('');
    const [intro, setIntro] = useState('');
    const [discount, setDiscount] = useState('');
    const [status, setStatus] = useState(true);

    const handleAdd = () => {
        onAdd({
            productName,
            price,
            trademark,
            quantity,
            quantitySold,
            description,
            intro,
            discount,
            status,
            image,
        });

        setProductName('');
        setPrice('');
        setTrademark('');
        setQuantity('');
        setQuantitySold('');
        setDescription('');
        setIntro('');
        setDiscount('');
        setStatus(true);
        setImage(null);

        onClose();
    };

    const handleCancel = () => {
        setProductName('');
        setPrice('');
        setTrademark('');
        setQuantity('');
        setQuantitySold('');
        setDescription('');
        setIntro('');
        setDiscount('');
        setStatus(true);
        setImage(null);

        onClose();
        if (!open) {
            setProductName('');
            setPrice('');
            setTrademark('');
            setQuantity('');
            setQuantitySold('');
            setDescription('');
            setIntro('');
            setDiscount('');
            setStatus(true);
            setImage(null);
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value === true);
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <DialogTitle fontSize="24px">Thêm sản phẩm mới</DialogTitle>
            <DialogContent fontSize="20px">
                <Grid container spacing={1}>
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
                            sx={{ marginTop: '10px', fontSize: '20px' }}
                            fullWidth
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
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
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
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
                            value={trademark}
                            onChange={(e) => setTrademark(e.target.value)}
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
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
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
                            value={quantitySold}
                            onChange={(e) => setQuantitySold(e.target.value)}
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
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
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
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
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
                            value={discount}
                            onChange={(e) => setDiscount(e.target.value)}
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
                        <Select
                            fullWidth
                            defaultValue={true}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value={true}>Mới</MenuItem>
                            <MenuItem value={false}>Cũ</MenuItem>
                        </Select>
                        {/* <Select fullWidth value={0}>
                            <MenuItem value={1}>Mới</MenuItem>
                            <MenuItem value={0}>Cũ</MenuItem>
                        </Select> */}
                        {/* <TextField
                            select
                            fullWidth
                            value={status.toString()}
                            defaultValue="false"
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="true">Mới</MenuItem>
                            <MenuItem value="false">Cũ</MenuItem>
                        </TextField> */}
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                            sx={{
                                fontSize: '14px',
                            }}
                        >
                            Hình ảnh sản phẩm
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
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                    Hủy
                </Button>
                <Button
                    onClick={handleAdd}
                    variant="contained"
                    color="primary"
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                    Thêm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductModal;

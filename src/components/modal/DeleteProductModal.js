import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const DeleteProductModal = ({ open, onClose, onDelete }) => {
    const handleConfirmDelete = () => {
        onDelete();
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle fontSize="22px">Xác nhận xóa sản phẩm</DialogTitle>
            <DialogContent>
                <DialogContentText fontSize="18px">
                    Bạn có chắc chắn muốn xóa sản phẩm này không?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    color="primary"
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                    Hủy
                </Button>
                <Button
                    onClick={handleConfirmDelete}
                    color="error"
                    sx={{ fontSize: '12px', fontWeight: 'bold' }}
                >
                    Xóa
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteProductModal;

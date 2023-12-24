import './UserListPage.module.scss';
import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import DataGridMain from '~/components/table';
import { getUsers } from '~/components/callAPI/user.api';
import { useNavigate } from 'react-router-dom';

const UserPage = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = async () => {
        const response = await getUsers();
        if (response) {
            setUsers(response);
        }
    };

    const rows = users.map((user) => ({
        id: user.userId,
        userName: user.userName,
        userPhoneNumber: user.userPhoneNumber,
        userAddress: user.userAddress,
        userEmail: user.userEmail,
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
            field: 'userName',
            headerName: 'Tên người dùng',
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
            field: 'userPhoneNumber',
            headerName: 'Số điện thoại',
            flex: 0.6,
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
            field: 'userAddress',
            headerName: 'Địa chỉ',
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
            field: 'userEmail',
            headerName: 'Email',
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
    ];

    return (
        <Box
            className="container"
            style={{ width: 'auto', padding: '0 20px 40px 20px' }}
        >
            <Box
                className="card-data-header"
                style={{
                    flexDirection: 'column',
                    border: 'var(--border-color)',
                    padding: '24px 0',
                }}
            >
                <Typography variant="h3" fontWeight="bold" marginBottom="10px">
                    Quản lý người dùng
                </Typography>
                <button onClick={() => navigate('/admin/productList')}>
                    Switch to Product List
                </button>
            </Box>
            <DataGridMain
                rows={rows}
                columns={columns}
                pageSize={10}
                totalRow={50}
            />
        </Box>
    );
};

export default UserPage;

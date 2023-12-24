import './BillListPage.module.scss';
import { mockDataUser } from '../../../callAPI/user.api';
import React, { useState } from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import IosShareIcon from '@mui/icons-material/IosShare';
import DataGridMain from '~/components/table';
import { useNavigate } from 'react-router-dom';

const BillList = () => {
    const navigate = useNavigate();
    const rows = [...Array(50)].map((_, idx) => ({
        id: idx + 1,
        deviceName: 'Tên thiết bị',
        typeDevice: 'Loại thiết bị',
        projectName: 'Thuộc dự án',
        deviceStatus: 'Đang hoạt động',
        quantityErr: 2,
        errRate: '5%',
        operationTime: '10:36:00',
    }));

    const columns = [
        {
            field: 'deviceName',
            headerName: 'Tên thiết bị',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontWeight: '600' }} variant="label1">
                        {text}
                    </Typography>
                );
            },
        },
        {
            field: 'typeDevice',
            headerName: 'Loại thiết bị',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontSize: '13px' }}>{text}</Typography>
                );
            },
        },
        {
            field: 'projectName',
            headerName: 'Thuộc dự án',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontSize: '13px' }}>{text}</Typography>
                );
            },
        },
        {
            field: 'deviceStatus',
            headerName: 'Đang hoạt động',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontSize: '13px' }}>{text}</Typography>
                );
            },
        },
        {
            field: 'quantityErr',
            headerName: 'Số lỗi',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontSize: '13px' }}>{text}</Typography>
                );
            },
        },
        {
            field: 'errRate',
            headerName: 'Tỷ lệ lỗi',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontSize: '13px' }}>{text}</Typography>
                );
            },
        },
        {
            field: 'operationTime',
            headerName: 'Thời gian hoạt động',
            flex: 1,
            sortable: false,
            headerClassName: 'custom-header',
            renderHeader(params) {
                let headerName = params.colDef.headerName;
                return <Typography variant="h6">{headerName}</Typography>;
            },
            renderCell: (params) => {
                let text = params.value;
                return (
                    <Typography sx={{ fontSize: '13px' }}>{text}</Typography>
                );
            },
        },
    ];

    const menuItemDevice = [
        { id: 1, projectName: 'A' },
        { id: 2, projectName: 'B' },
        { id: 3, projectName: 'C' },
    ];

    const [project, setProject] = useState('');
    const [labelHidden, setLabelHidden] = useState(false);

    const handleChange = (event) => {
        setProject(event.target.value);
        setLabelHidden(true);
    };

    return (
        <Box className="container" style={{ padding: '0px 32px' }}>
            <Box
                className="card-data-header"
                style={{
                    flexDirection: 'column',
                    border: 'var(--border-color)',
                    padding: '24px 0',
                }}
            >
                <Box
                    className="header-button"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: ' 16px',
                        width: '100%',
                    }}
                >
                    <Box
                        component="div"
                        style={{
                            width: 250,
                            flex: '1',
                            backgroundColor: 'var( --white)',
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            borderRadius: '6px',
                        }}
                    >

                        <FormControl fullWidth size="small">
                            <InputLabel
                                style={{
                                    display: labelHidden ? 'none' : 'flex',
                                    transform: 'translate(16px, 43%)',
                                    position: 'absolute',
                                    color: 'var(--text-primary)',
                                }}
                                id="demo-simple-select-label"
                            >
                                <Typography
                                    variant="body2"
                                    style={{
                                        overflow: 'hidden',
                                        color: ' var(--text-primary)',
                                        textOverflow: 'ellipsis',
                                        whitespace: 'nowrap',
                                    }}
                                >
                                    Tất cả dự án
                                </Typography>
                            </InputLabel>
                            <Select
                                value={project}
                                onChange={handleChange}
                                labelId="demo-simple-select-label"
                                id="report-simple-select"
                            >
                                {menuItemDevice.map((item) => (
                                    <MenuItem
                                        key={item.id}
                                        value={item.projectName}
                                    >
                                        <Typography sx={{ fontSize: '13px' }}>
                                            {' '}
                                            Dự án {item.projectName}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<IosShareIcon />}
                        disableRipple
                    >
                        <Typography variant="button1">Xuất Excel</Typography>
                    </Button>
                </Box>
            </Box>
            <DataGridMain rows={rows} columns={columns} />
        </Box>
    );
};
export default BillList;

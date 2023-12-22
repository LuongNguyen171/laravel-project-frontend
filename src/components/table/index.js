import './Table.module.scss';

import { Card, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

import Pagination from '@mui/material/Pagination';
import useWindowDimensions from '../../hook/handleWindowDimensions';
// const rows = [
//   { id: 1, col1: "Hello", col2: "World" },
//   { id: 2, col1: "DataGridPro", col2: "is Awesome" },
//   { id: 3, col1: "MUI", col2: "is Amazing" },
// ];

// const columns = [
//   { field: "col1", headerName: "Column 1", width: 150, sortable: false },
//   { field: "col2", headerName: "Column 2", width: 150, sortable: false },
// ];
// const pageSizeTable = Math.floor((window.innerHeight - (218 + 200)) / 28);

const DataGridMain = ({
    totalRow = 99,
    // page = 1,
    pageSize = 10,
    rows,
    columns,
}) => {
    const [page, setPage] = useState(1);
    const [tableheight, setTableHeight] = useState(800);
    const windowDimensions = useWindowDimensions();

    const getHeaderHeight = () => {
        const root = document.documentElement;
        const computedStyle = getComputedStyle(root);
        const heightHeader = computedStyle
            .getPropertyValue('--height-header')
            .trim();

        const numericHeight = parseFloat(heightHeader);

        return numericHeight;
    };

    useEffect(() => {
        if (
            windowDimensions.height != null &&
            windowDimensions.width != null &&
            windowDimensions.width > 1200
        ) {
            setTableHeight(windowDimensions.height - (getHeaderHeight() + 132));
        } else if (
            windowDimensions.height != null &&
            windowDimensions.width != null &&
            windowDimensions.width <= 1200
        ) {
            setTableHeight(windowDimensions.height - (getHeaderHeight() + 188));
        }
    }, [windowDimensions]);
    // console.log("windowDimensions: ", windowDimensions);

    const totalPage = Math.ceil(totalRow / pageSize);
    const labelRowPageper = () => {
        let to = 0,
            from = 0;
        if (totalRow < 1) {
            return `${to} - ${from} Trong số ${totalRow}`;
        }
        if (page === 1 && totalRow > 0) {
            return `${1} - ${pageSize} Trong số ${totalRow}`;
        }
        if (totalRow / page <= pageSize) {
            to = pageSize * (page - 1) + 1;
            from = totalRow;
            return `${to} - ${from} Trong số ${totalRow}`;
        }
        to = (page - 1) * pageSize + 1;
        from = pageSize * page;
        return `${to} - ${from} Trong số ${totalRow}`;
    };
    const handleChangePage = (e, value) => {
        setPage(value);
    };

    return (
        <Card
            elevation={0}
            className="card-data-grid-layout"
            sx={{ height: `${tableheight}px !important` }}
        >
            <DataGrid
                rowHeight={56}
                rows={rows}
                columns={columns}
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                hideFooter
                hideFooterPagination
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                            page: 0,
                        },
                    },
                }}
            />
            <Stack
                direction={'row'}
                mt={'10px'}
                alignItems={'center'}
                justifyContent={'end'}
            >
                <Typography variant="body3"> {labelRowPageper()}</Typography>
                <Pagination
                    count={totalPage}
                    page={page}
                    onChange={handleChangePage}
                    shape="rounded"
                    color="primary"
                />
            </Stack>
        </Card>
    );
};
export default DataGridMain;

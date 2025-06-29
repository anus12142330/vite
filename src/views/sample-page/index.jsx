import { useEffect, useState, useMemo } from 'react';
import {
  Box, Button, Grid, TextField, Typography, InputAdornment
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import axios from 'axios';
import MainCard from 'ui-component/cards/MainCard';
import { DataGrid } from '@mui/x-data-grid';
import moment from 'moment';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import IconButton from '@mui/material/IconButton';

export default function SamplePage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [startDate, setStartDate] = useState(dayjs().subtract(6, 'month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [searchText, setSearchText] = useState('');
  const [pageSize, setPageSize] = useState(25);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user?.id) setCustomerId(user.id);
      } catch (err) {
        console.error('Invalid user in localStorage:', err);
      }
    }
  }, []);

  const fetchTransactions = async () => {
    if (!customerId) return;
    setLoading(true);
    try {
      const response = await axios.get('/api/post/trans', {
        params: {
          start_date: startDate.format('YYYY-MM-DD'),
          end_date: endDate.format('YYYY-MM-DD'),
          customer_id: customerId
        }
      });

      if (Array.isArray(response.data)) {
        const formatted = response.data.map((row, index) => ({
          ...row,
          id: row.id || index + 1
        }));
        setTransactions(formatted);
      } else {
        setTransactions([]);
        console.warn('Unexpected API format:', response.data);
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customerId) fetchTransactions();
  }, [customerId]);

  const handleFilter = () => fetchTransactions();

  const filteredTransactions = useMemo(() => {
    const lower = searchText.toLowerCase();
    return transactions.filter((txn) =>
      Object.values(txn).some(
        (val) =>
          val &&
          val.toString().toLowerCase().includes(lower)
      )
    );
  }, [transactions, searchText]);

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, row) => sum + (Number(row.amount) || 0), 0);
  }, [filteredTransactions]);

  const columns = [  
    {
      field: 'date',
      headerName: 'Date',
      flex: 1,
      renderCell: (params) => {
        const rawDate = params.row?.date;
        const parsed = moment(rawDate, ['DD-MMM-YYYY', 'YYYY-MM-DD']);
        return parsed.isValid() ? parsed.format('DD-MMM-YYYY') : '';
      }
    },
    { field: 'ref', headerName: 'Ref No', flex: 1 },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'description', headerName: 'Description', flex: 2 },
    {
      field: 'foreign_amount',
      headerName: 'Foreign Amount',
      flex: 1,
      renderCell: (params) => {
        const val = Number(params.row.foreign_amount);
        const currency = params.row.currency || '';
        return isNaN(val)
          ? ''
          : `${val.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })} ${currency}`;
      }
    },
    {
      field: 'amount',
      headerName: 'Amount(AED)',
      flex: 1,
      renderCell: (params) => {
        const val = Number(params.row.amount);
        return isNaN(val)
          ? ''
          : val.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            });
      }
    },
  {
  field: 'pdf',
  headerName: 'Attachment',
  flex: 0.5,
  sortable: false,
  renderCell: (params) => {
    let path = params.row?.path;
    if (!path) return null;

    // Remove specific folder prefix from the path
    const basePath = 'uploads/emailattachments/';
    if (path.startsWith(basePath)) {
      path = path.substring(basePath.length);
    }

    // Encode path segments safely
    const encodedPath = path
      .split('/')
      .map(encodeURIComponent)
      .join('/');

    const proxyUrl = `/aps/${encodedPath}`;

    return (
      <IconButton
        component="a"
        href={proxyUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        <AttachFileIcon color="primary" sx={{ fontSize: 18 }} />
      </IconButton>
    );
  }
}
  ];

  return (
    <MainCard
      title={
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>Transaction List</Grid>
          <Grid item>
            <Typography variant="h5">
              Total Amount(AED): {totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Typography>
          </Grid>
        </Grid>
      }
    >
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(val) => setStartDate(val)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(val) => setEndDate(val)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Button variant="contained" fullWidth onClick={handleFilter}>
              Filter
            </Button>
          </Grid>
        </LocalizationProvider>

        <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <TextField
            label="Search All"
            variant="outlined"
            size="small"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            sx={{ width: 300 }}
          />
        </Grid>
      </Grid>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredTransactions}
          columns={columns}
          getRowId={(row) => row.id}
          pageSize={pageSize}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
          rowsPerPageOptions={[25, 50, 100, filteredTransactions.length]}
          pagination
          loading={loading}
        />
      </Box>
    </MainCard>
  );
}

// Ledger.js
import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  Grid,
  Pagination,
  Stack,
  FormControl,
  InputLabel,
} from "@mui/material";

const Ledger = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ✅ Memoize transactions so eslint warning is gone
  const transactions = useMemo(
    () => [
      {
        userType: "User",
        username: "SAICHTATRA CHEMICAL INDUSTRIES",
        mobile: "7350442016",
        email: "mukundraut2222@gmail.com",
        date: "2025-09-13 14:31:29",
        transactionId: "YESWARI100998",
        remarks: "Order id.:ORD100000260’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹1508.61",
        balance: "₹525.89",
      },
      {
        userType: "User",
        username: "SAICHTATRA CHEMICAL INDUSTRIES",
        mobile: "7350442016",
        email: "mukundraut2222@gmail.com",
        date: "2025-09-11 12:55:49",
        transactionId: "YESWARI100997",
        remarks: "Order id.:ORD100000259’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹998.38",
        balance: "₹2034.50",
      },
      {
        userType: "User",
        username: "Vikas pawar",
        mobile: "8424859060",
        email: "vikas.vp161@gmail.com",
        date: "2025-09-10 15:41:53",
        transactionId: "YESWARI100993",
        remarks: "Order id.:ORD100000257’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹341.11",
        balance: "₹317.78",
      },
      {
        userType: "User",
        username: "SAICHTATRA CHEMICAL INDUSTRIES",
        mobile: "7350442016",
        email: "mukundraut2222@gmail.com",
        date: "2025-09-13 14:31:29",
        transactionId: "YESWARI100998",
        remarks: "Order id.:ORD100000260’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹1508.61",
        balance: "₹525.89",
      },     {
        userType: "User",
        username: "Vikas pawar",
        mobile: "8424859060",
        email: "vikas.vp161@gmail.com",
        date: "2025-09-10 15:41:53",
        transactionId: "YESWARI100993",
        remarks: "Order id.:ORD100000257’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹341.11",
        balance: "₹317.78",
      },     {
        userType: "User",
        username: "Vikas pawar",
        mobile: "8424859060",
        email: "vikas.vp161@gmail.com",
        date: "2025-09-10 15:41:53",
        transactionId: "YESWARI100993",
        remarks: "Order id.:ORD100000257’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹341.11",
        balance: "₹317.78",
      },     {
        userType: "User",
        username: "Vikas pawar",
        mobile: "8424859060",
        email: "vikas.vp161@gmail.com",
        date: "2025-09-10 15:41:53",
        transactionId: "YESWARI100993",
        remarks: "Order id.:ORD100000257’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹341.11",
        balance: "₹317.78",
      },     {
        userType: "User",
        username: "Vikas pawar",
        mobile: "8424859060",
        email: "vikas.vp161@gmail.com",
        date: "2025-09-10 15:41:53",
        transactionId: "YESWARI100993",
        remarks: "Order id.:ORD100000257’s new order placed",
        type: "Debit",
        credit: "₹0",
        debit: "₹341.11",
        balance: "₹317.78",
      },
    ],
    []
  );

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    if (!selectedUser) return transactions;
    if (selectedUser === "saichatra") {
      return transactions.filter((t) => t.username.includes("SAICHTATRA"));
    }
    if (selectedUser === "vikas") {
      return transactions.filter((t) => t.username.includes("Vikas"));
    }
    return transactions;
  }, [selectedUser, transactions]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTransactions.slice(start, start + rowsPerPage);
  }, [filteredTransactions, currentPage]);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Export CSV
  const handleExport = () => {
    const headers = [
      "User Type",
      "Username",
      "Mobile",
      "Email",
      "Date",
      "Transaction Id",
      "Remarks",
      "Type",
      "Credit",
      "Debit",
      "Balance",
    ];

    const rows = filteredTransactions.map((t) => [
      t.userType,
      t.username,
      t.mobile,
      t.email,
      t.date,
      t.transactionId,
      t.remarks,
      t.type,
      t.credit,
      t.debit,
      t.balance,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "ledger_export.csv";
    link.click();
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f6f1", p: 2 }}>
      <Paper sx={{ maxWidth: "100%", mx: "auto", p: 3 }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ledger
        </Typography>

        {/* Filters */}
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          sx={{ bgcolor: "#f4ede4", p: 2, borderRadius: 2, mb: 3 }}
        >
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Choose User</InputLabel>
              <Select
                value={selectedUser}
                onChange={(e) => {
                  setSelectedUser(e.target.value);
                  setCurrentPage(1); // reset to page 1
                }}
                label="Choose User"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="saichatra">
                  SAICHTATRA CHEMICAL INDUSTRIES
                </MenuItem>
                <MenuItem value="vikas">Vikas pawar</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={12}
            md="auto"
            display="flex"
            justifyContent={{ xs: "flex-start", md: "flex-end" }}
            gap={2}
          >
            <Button
              variant="contained"
              color="success"
              onClick={() => setCurrentPage(1)}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={handleExport}
              endIcon={<span>⬇</span>}
            >
              Export
            </Button>
          </Grid>
        </Grid>

        {/* Table */}
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead sx={{ bgcolor: "#f0f0f0" }}>
              <TableRow>
                <TableCell>User Type</TableCell>
                <TableCell>User Details</TableCell>
                <TableCell>Date & Time</TableCell>
                <TableCell>Transaction Id</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Transaction Type</TableCell>
                <TableCell>Credit</TableCell>
                <TableCell>Debit</TableCell>
                <TableCell>Balance</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedTransactions.map((txn, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{txn.userType}</TableCell>
                  <TableCell>
                    <Typography fontWeight="bold">{txn.username}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Mobile: {txn.mobile}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Email: {txn.email}
                    </Typography>
                  </TableCell>
                  <TableCell>{txn.date}</TableCell>
                  <TableCell>{txn.transactionId}</TableCell>
                  <TableCell>{txn.remarks}</TableCell>
                  <TableCell>{txn.type}</TableCell>
                  <TableCell>{txn.credit}</TableCell>
                  <TableCell>{txn.debit}</TableCell>
                  <TableCell>{txn.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Stack direction="row" justifyContent="flex-end" mt={3}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            shape="rounded"
            siblingCount={1}
            boundaryCount={1}
          />
        </Stack>
      </Paper>
    </Box>
  );
};

export default Ledger;

// MoneyRequests.js
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";

const initialRequests = [
  {
    id: 1,
    userType: "Users",
    userName: "FANNASHQ.ALLB2BC",
    details: {
      name: "fannashq.",
      mob: "7798422277",
      email: "naziyadhamiya@gmail.com",
    },
    date: "2025-09-18",
    amount: 500,
    transactionId: "T25062318021610382455",
    status: "Pending",
  },
  {
    id: 2,
    userType: "Users",
    userName: "SAICHHATRA6B2BC",
    details: {
      name: "SAICHHATRA CHEMICAL INDUSTRIES",
      mob: "7350442016",
      email: "mukundraut2222@gmail.com",
    },
    date: "2025-09-11",
    amount: 2000,
    transactionId: "T2509111235396875137780",
    status: "Pending",
  },
  {
    id: 3,
    userType: "Users",
    userName: "VIKASPALLB2BC",
    details: {
      name: "Vikas pawar",
      mob: "8424859060",
      email: "vikas.vp616@gmail.com",
    },
    date: "2025-09-10",
    amount: 1000,
    transactionId: "3563368970",
    status: "Pending",
  },{
    id: 4,
    userType: "Branches",
    userName: "YEDESHWARI-10003",
    details: {
      name: "shiftguru",
      mob: "9325959190",
      email: "shiftguru.com@gmail.com",
    },
    date: "2025-09-05",
    amount: 7500,
    transactionId: "0000000000",
    status: "Pending",
  },{
    id: 4,
    userType: "Branches",
    userName: "YEDESHWARI-10003",
    details: {
      name: "shiftguru",
      mob: "9325959190",
      email: "shiftguru.com@gmail.com",
    },
    date: "2025-09-05",
    amount: 7500,
    transactionId: "0000000000",
    status: "Pending",
  },{
    id: 4,
    userType: "Branches",
    userName: "YEDESHWARI-10003",
    details: {
      name: "shiftguru",
      mob: "9325959190",
      email: "shiftguru.com@gmail.com",
    },
    date: "2025-09-05",
    amount: 7500,
    transactionId: "0000000000",
    status: "Pending",
  },{
    id: 4,
    userType: "Branches",
    userName: "YEDESHWARI-10003",
    details: {
      name: "shiftguru",
      mob: "9325959190",
      email: "shiftguru.com@gmail.com",
    },
    date: "2025-09-05",
    amount: 7500,
    transactionId: "0000000000",
    status: "Pending",
  },
 
];

const MoneyRequests = () => {
  const [requests, setRequests] = useState(initialRequests);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const totalPages = 12; // Example

  const handleApprove = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Approved" } : req
      )
    );
  };

  const handleReject = (id) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "Rejected" } : req
      )
    );
  };

  // Paginated rows
  const paginatedRequests = requests.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb", p: { xs: 2, sm: 4 } }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Add Money Requests
        </Typography>
        <Avatar sx={{ bgcolor: "primary.main" }}>U</Avatar>
      </Box>

      {/* Card */}
      <Card>
        <CardContent>
          <Typography
            variant="h6"
            gutterBottom
            sx={{ borderBottom: "1px solid #e0e0e0", pb: 1 }}
          >
            All Requests
          </Typography>

          {/* Table */}
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {[
                    "User Type",
                    "User Name",
                    "User Details",
                    "Date",
                    "Amount",
                    "Transaction Id",
                    "Action",
                  ].map((head) => (
                    <TableCell key={head} sx={{ fontWeight: "bold" }}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedRequests.map((req) => (
                  <TableRow key={req.id} hover>
                    <TableCell>{req.userType}</TableCell>
                    <TableCell>{req.userName}</TableCell>
                    <TableCell>
                      {req.details.name}
                      <br />
                      Mob: {req.details.mob}
                      <br />
                      Email: {req.details.email}
                    </TableCell>
                    <TableCell>{req.date}</TableCell>
                    <TableCell>₹{req.amount}</TableCell>
                    <TableCell>{req.transactionId}</TableCell>
                    <TableCell>
                      {req.status === "Pending" && (
                        <Box sx={{ display: "flex", gap: 1 }}>
                          <Button
                            variant="outlined"
                            color="error"
                            size="small"
                            startIcon={<CloseIcon />}
                            onClick={() => handleReject(req.id)}
                          >
                            Reject
                          </Button>
                          <Button
                            variant="contained"
                            color="success"
                            size="small"
                            startIcon={<CheckCircleIcon />}
                            onClick={() => handleApprove(req.id)}
                          >
                            Approve
                          </Button>
                        </Box>
                      )}
                      {req.status === "Approved" && (
                        <Typography
                          color="success.main"
                          fontWeight="medium"
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                        >
                          Approved <CheckCircleIcon fontSize="small" />
                        </Typography>
                      )}
                      {req.status === "Rejected" && (
                        <Typography color="error.main" fontWeight="medium">
                          Rejected
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              mt: 3,
            }}
          >
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
              color="primary"
              shape="rounded"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MoneyRequests;

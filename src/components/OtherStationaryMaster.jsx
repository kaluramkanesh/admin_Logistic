// OtherStationaryMaster.js
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Divider,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const STATIONARY_NAMES = ["Credit", "Debit", "Invoice", "Voucher"];

function getPrefixFor(name, sequenceNumber) {
  const firstThree = name.substring(0, 3).toUpperCase();
  const seq = String(sequenceNumber).padStart(3, "0");
  return `${firstThree}${seq}`;
}

export default function OtherStationaryMaster() {
  const [selectedName, setSelectedName] = useState("");
  const [counters, setCounters] = useState({});
  const [entries, setEntries] = useState([]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Delete confirmation dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const savedCounters =
      JSON.parse(localStorage.getItem("other-stationary-counters")) || {};
    const savedEntries =
      JSON.parse(localStorage.getItem("other-stationary-entries")) || [];
    setCounters(savedCounters);
    setEntries(savedEntries);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "other-stationary-counters",
      JSON.stringify(counters)
    );
  }, [counters]);

  useEffect(() => {
    localStorage.setItem("other-stationary-entries", JSON.stringify(entries));
  }, [entries]);

  const nextPrefix = useMemo(() => {
    if (!selectedName) return "";
    const next = (counters[selectedName] ?? 0) + 1;
    return getPrefixFor(selectedName, next);
  }, [selectedName, counters]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!selectedName) return;

    const currentCount = (counters[selectedName] ?? 0) + 1;
    const prefix = getPrefixFor(selectedName, currentCount);

    const newEntry = {
      id: `${selectedName}-${currentCount}-${Date.now()}`,
      name: selectedName,
      prefix,
      createdAt: Date.now(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    setCounters((prev) => ({ ...prev, [selectedName]: currentCount }));
  }

  function handleClearAll() {
    if (!window.confirm("Clear all entries and counters?")) return;
    setCounters({});
    setEntries([]);
  }

  // Delete (only dialog, does not remove row)
  function handleDeleteClick() {
    setDeleteDialogOpen(true);
  }
  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);
  };
  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f6f1", p: { xs: 2, sm: 4 } }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Other Stationary Master
        </Typography>
        <Button variant="outlined" color="error" onClick={handleClearAll}>
          Clear All
        </Button>
      </Box>

      {/* Card */}
      <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 2 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Other Stationaries
        </Typography>

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Stationary</InputLabel>
                <Select
                  value={selectedName}
                  onChange={(e) => setSelectedName(e.target.value)}
                  label="Stationary"
                >
                  <MenuItem value="">
                    <em>Choose one</em>
                  </MenuItem>
                  {STATIONARY_NAMES.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                label="Prefix"
                value={nextPrefix}
                fullWidth
                size="small"
                InputProps={{ readOnly: true }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  height: "40px",
                  bgcolor: "purple",
                  "&:hover": { bgcolor: "darkviolet" },
                }}
                disabled={!selectedName}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Divider */}
        <Divider sx={{ my: 3 }} />

        {/* Table */}
        <TableContainer component={Paper} variant="outlined">
          <Table>
            <TableHead sx={{ bgcolor: "#f5f5f5" }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Prefix</TableCell>
                <TableCell align="right">Created</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No entries yet. Select a stationary and submit to add.
                  </TableCell>
                </TableRow>
              ) : (
                entries
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.prefix}</TableCell>
                      <TableCell align="right">
                        {new Date(row.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton color="primary">
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={handleDeleteClick}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
              )}
            </TableBody>
          </Table>
          {/* Pagination */}
          <TablePagination
            component="div"
            count={entries.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </TableContainer>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this entry?  
              (Note: In this demo, nothing will actually be deleted.)
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteCancel} color="primary">
              Cancel
            </Button>
            <Button
              onClick={handleDeleteConfirm}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Counter Summary */}
        <Grid container spacing={2} mt={3}>
          {STATIONARY_NAMES.map((name) => (
            <Grid item xs={12} sm={6} md={3} key={name}>
              <Paper sx={{ p: 2, textAlign: "center" }} variant="outlined">
                <Typography variant="subtitle2" fontWeight="bold">
                  {name}
                </Typography>
                <Typography variant="body2">
                  Next: {getPrefixFor(name, (counters[name] ?? 0) + 1)}
                </Typography>
                <Typography
                  variant="caption"
                  display="block"
                  color="text.secondary"
                >
                  Count: {counters[name] ?? 0}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Box>
  );
}

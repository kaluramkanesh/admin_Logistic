
import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { toggleDialog, toggleStatus, updateUser ,  deleteUser,} from "../../../redux/ApiUserRedux/apiUsersSlice";
import UpdateUserDialog from "../ApiUser/UpdateUserDialog";

const ApiUserTable = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.apiUsers);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = (id) => {
  dispatch(deleteUser(id));
  handleMenuClose();
};


  const handleUpdateClick = () => {
    setOpenUpdateDialog(true);
    handleMenuClose();
  };

  return (
    <Box>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <Typography variant="h4">API Users</Typography>
          <Typography fontSize={15}>
            Add or Update new API user, reset their password or make user active
            or Inactive
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ bgcolor: "#6C5CE7" }}
          onClick={() => dispatch(toggleDialog())}
        >
          + Add New API User
        </Button>
      </Box>

      {/* Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>User Details</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((u) => (
            <TableRow key={u.id}>
              <TableCell>{u.email}</TableCell>
              <TableCell>xxxxxxxxx</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color: u.status === "ACTIVE" ? "green" : "orange",
                    fontWeight: 600,
                  }}
                >
                  {u.status}
                </Typography>
              </TableCell>
              <TableCell>
                <Switch
                  checked={u.status === "ACTIVE"}
                  onChange={() => dispatch(toggleStatus(u.id))}
                />
                <IconButton onClick={(e) => handleMenuOpen(e, u)}>
                  <MoreVertIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* 3-dot menu */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={handleUpdateClick}>Update User</MenuItem>
        <MenuItem onClick={handleMenuClose}>Edit User</MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>Delete User</MenuItem> */}
        {/* <MenuItem onClick={handleMenuClose}>Delete User</MenuItem> */}

  <MenuItem onClick={() => handleDelete(selectedUser.id)}>Delete User</MenuItem>

      </Menu>

      {/* Update User Dialog */}
      <UpdateUserDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        user={selectedUser}
        onSave={(updatedUser) => {
          dispatch(updateUser(updatedUser));
          setOpenUpdateDialog(false);
        }}
      />

      {/* Footer Note */}
      <Box mt={2} p={2} sx={{ bgcolor: "#fff8e1", borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          • To understand the API integration process click on{" "}
          <a href="#">API integration Process</a> <br />
          • To check out the API documentation click on{" "}
          <a href="#">API Documentation</a> <br />
          • Maximum of 25 users can be Active at a time.
        </Typography>
      </Box>
    </Box>
  );
};

export default ApiUserTable;

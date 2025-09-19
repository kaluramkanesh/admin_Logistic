import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  Box,
  Select,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Chip,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleDialog,
  addUser,
  updateUser,
} from "../../../redux/ApiUserRedux/apiUsersSlice";
import { useState, useEffect } from "react";

const AddUserDialog = () => {
  const dispatch = useDispatch();
  const { openDialog, editUser } = useSelector((state) => state.apiUsers);

  const [form, setForm] = useState({
    email: "",
    modules: [],
    buyerAccess: "Not Allowed",
    allowedIPs: [],
  });

  const [inputIP, setInputIP] = useState("");
  const [error, setError] = useState("");
  const [selectedModules, setSelectedModules] = useState([]);

  const modules = [
    "Orders(create, update)",
    "Settings",
    "Shipments",
    "Listings",
    "Courier",
  ];

  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  useEffect(() => {
    if (editUser) {
      setForm(editUser);
      setSelectedModules(editUser.modules || []);
    } else {
      setForm({
        email: "",
        modules: [],
        buyerAccess: "Not Allowed",
        allowedIPs: [],
      });
      setSelectedModules([]);
    }
  }, [editUser]);

  const handleClose = () => {
    dispatch(toggleDialog());
  };

  const handleModuleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedModules(typeof value === "string" ? value.split(",") : value);
  };

  const handleAddIP = () => {
    if (!inputIP) return;
    if (!ipRegex.test(inputIP)) {
      setError("Enter a valid IPv4 address (e.g., 192.168.0.1)");
      return;
    }
    if (form.allowedIPs.includes(inputIP)) {
      setError("IP already added");
      return;
    }
    setForm({ ...form, allowedIPs: [...form.allowedIPs, inputIP] });
    setInputIP("");
    setError("");
  };

  const handleDeleteIP = (ip) => {
    setForm({ ...form, allowedIPs: form.allowedIPs.filter((item) => item !== ip) });
  };

  const handleSubmit = () => {
    if (!form.email.trim()) return;

    const payload = {
      ...form,
      modules: selectedModules,
    };

    if (editUser) {
      dispatch(updateUser(payload));
    } else {
      dispatch(
        addUser({
          id: Date.now(),
          password: "xxxxxxxxx",
          status: "ACTIVE",
          ...payload,
        })
      );
    }

    handleClose();
  };

  return (
    <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>{editUser ? "Edit User" : "Add New User"}</DialogTitle>
      <DialogContent>
        {/* Email */}
        <TextField
          fullWidth
          margin="normal"
          label="Email ID"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        {/* Modules */}
        <Box mb={3}>
          <Typography variant="subtitle1">Select Modules to Access</Typography>
          <Select
            multiple
            fullWidth
            value={selectedModules}
            onChange={handleModuleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
          >
            {modules.map((m) => (
              <MenuItem key={m} value={m}>
                <Checkbox checked={selectedModules.indexOf(m) > -1} />
                <ListItemText primary={m} />
              </MenuItem>
            ))}
          </Select>

          
        </Box>

        {/* Allowed IPs */}
        <Box mb={3}>
          <Typography variant="subtitle1">Allowed IPs</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {form.allowedIPs.map((ip, index) => (
              <Chip
                key={index}
                label={ip}
                onDelete={() => handleDeleteIP(ip)}
                sx={{
                  bgcolor: ipRegex.test(ip) ? "primary.light" : "error.light",
                  color: ipRegex.test(ip) ? "black" : "red",
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" spacing={2}>
            <TextField
              fullWidth
              label="Enter IP Address"
              value={inputIP}
              onChange={(e) => setInputIP(e.target.value)}
              error={!!error}
              helperText={error}
            />
            <Button variant="contained" onClick={handleAddIP}>
              Add
            </Button>
          </Stack>
        </Box>

        {/* Buyer Detail Access */}
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>
            Buyer Detail Access
          </Typography>
          <RadioGroup
            row
            value={form.buyerAccess}
            onChange={(e) => setForm({ ...form, buyerAccess: e.target.value })}
          >
            <FormControlLabel value="Allowed" control={<Radio />} label="Allowed" />
            <FormControlLabel
              value="Not Allowed"
              control={<Radio />}
              label="Not Allowed"
            />
          </RadioGroup>
        </Box>

        {/* Info Note */}
        {!editUser && (
          <Box mt={2} p={1.5} sx={{ bgcolor: "#fff8e1", borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary">
              ⚠️ To start using our external API’s, enter an email ID (different
              from registered email ID), and click <b>Create User</b>.
            </Typography>
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!form.email}
        >
          {editUser ? "Update User" : "Create User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddUserDialog;

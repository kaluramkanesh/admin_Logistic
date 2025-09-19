import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Select,
  MenuItem,
  ListItemText,
  OutlinedInput,
  Box,
  Chip,
  Stack,
} from "@mui/material";

const UpdateUserDialog = ({ open, onClose, user, onSave }) => {
  const [email, setEmail] = useState("");
  const [buyerAccess, setBuyerAccess] = useState("Not Allowed");
  const [password, setPassword] = useState("");
  const [allowedIPs, setAllowedIPs] = useState([]); // ARRAY
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

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setBuyerAccess(user.buyerAccess || "Not Allowed");
      setAllowedIPs(user.allowedIPs || []); // expects array
      setPassword("");
      setSelectedModules(user.modules || []);
    }
  }, [user]);

  const ipRegex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

  const handleAddIP = () => {
    if (!inputIP) return;
    if (!ipRegex.test(inputIP)) {
      setError("Enter a valid IPv4 address (e.g., 192.168.0.1)");
      return;
    }
    if (allowedIPs.includes(inputIP)) {
      setError("IP already added");
      return;
    }
    setAllowedIPs([...allowedIPs, inputIP]);
    setInputIP("");
    setError("");
  };

  const handleDeleteIP = (ip) => {
    setAllowedIPs(allowedIPs.filter((item) => item !== ip));
  };

  const handleModuleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedModules(typeof value === "string" ? value.split(",") : value);
  };

  const handleSave = () => {
    if (allowedIPs.length === 0) {
      setError("At least one IP must be added");
      return;
    }

    const updatedUser = {
      ...user,
      email,
      buyerAccess,
      allowedIPs, // array of IPs
      password: password || user.password,
      modules: selectedModules,
    };
    onSave(updatedUser);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent dividers>
        {/* Email */}
        <TextField
          fullWidth
          label="Email ID"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 3 }}
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

        {/* Buyer Detail Access */}
        <Box mb={3}>
          <Typography variant="subtitle1">Buyer Detail Access</Typography>
          <RadioGroup
            row
            value={buyerAccess}
            onChange={(e) => setBuyerAccess(e.target.value)}
          >
            <FormControlLabel value="Allowed" control={<Radio />} label="Allowed" />
            <FormControlLabel value="Not Allowed" control={<Radio />} label="Not Allowed" />
          </RadioGroup>
        </Box>

        {/* Allowed IPs */}
        <Box mb={3}>
          <Typography variant="subtitle1">Allowed IPs</Typography>

          <Stack direction="row" spacing={1} flexWrap="wrap" mb={2}>
            {allowedIPs.map((ip, index) => (
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

        {/* Update Password */}
        <TextField
          fullWidth
          label="Update Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          sx={{ bgcolor: "#6C5CE7" }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUserDialog;

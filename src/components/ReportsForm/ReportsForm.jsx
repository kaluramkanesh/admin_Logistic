import React from "react";
import {
  Box,
  Typography,
  Switch,
  TextField,
  Button,
  Grid,
  Paper,
  FormControlLabel,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePhoneVisibility,
  setField,
  saveReportSettings,
} from "../../features/Reports/reportSlice";

const ReportsForm = () => {
  const dispatch = useDispatch();
  const {
    enablePhoneVisibility,
    businessEmail,
    businessContact,
    operationEmail,
    operationContact,
    loading,
    error,
    success,
  } = useSelector((state) => state.reports);

  const handleChange = (e) => {
    dispatch(setField({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = () => {
    dispatch(
      saveReportSettings({
        enablePhoneVisibility,
        businessEmail,
        businessContact,
        operationEmail,
        operationContact,
      })
    );
  };

  return (
    <Paper sx={{ p: { xs: 2, md: 4 }, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Reports
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        Communications related to business or operations will be sent to the
        email ids & contact numbers provided below.
      </Typography>

      <Box
        sx={{
          p: 2,
          bgcolor: "#f9f9f9",
          borderRadius: 2,
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography fontWeight="bold">
            Enable visibility of Phone number
          </Typography>
          <Typography variant="body2" color="text.secondary">
            To protect your data, phone numbers in reports are encrypted by
            default. Enable this setting to show them without encryption.
          </Typography>
        </Box>
        <FormControlLabel
          control={
            <Switch
              checked={enablePhoneVisibility}
              onChange={() => dispatch(togglePhoneVisibility())}
            />
          }
          label={enablePhoneVisibility ? "ENABLED" : "DISABLED"}
        />
      </Box>

      {/* Business Related Communication */}
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        For Business Related Communication
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Id"
            name="businessEmail"
            value={businessEmail}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contact Number"
            name="businessContact"
            value={businessContact}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Operation Related Communication */}
      <Typography variant="subtitle1" fontWeight="bold" mb={1}>
        For Operation Related Communication
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Email Id"
            name="operationEmail"
            value={operationEmail}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Contact Number"
            name="operationContact"
            value={operationContact}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">Settings saved successfully!</Alert>}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Save"}
      </Button>
    </Paper>
  );
};

export default ReportsForm;

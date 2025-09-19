// BankMaster.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import qrCodeImage from "../assets/qrCodes.jpeg"; // replace with your QR

const BankMaster = () => {
  const [bankDetails, setBankDetails] = useState({
    qrCode: null,
    upiId: "9527062715-2@ybl",
    bankName: "State Bank of India",
    accountHolder: "Yogesh Mengade",
    accountNumber: "37783396199",
    ifscCode: "SBIN0020627",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSave = () => {
    alert("Bank details saved!");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f6f1", p: 3 }}>
      <Paper
        elevation={3}
        sx={{ maxWidth: 1000, mx: "auto", p: { xs: 3, sm: 5 }, borderRadius: 2 }}
      >
        {/* Title */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Bank Master
        </Typography>

        {/* Section Heading */}
        <Box mb={3}>
          <Typography variant="subtitle1" fontWeight="600" gutterBottom>
            Edit Bank Details
          </Typography>
          <Box sx={{ borderBottom: "1px solid #ccc" }} />
        </Box>

        {/* Main Layout */}
        <Grid container spacing={4}  display="flex">
          {/* QR Code */}
          <Grid
            item
            xs={12}
            md={4}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box>
              <img
                src={
                  bankDetails.qrCode
                    ? URL.createObjectURL(bankDetails.qrCode)
                    : qrCodeImage
                }
                alt="QR Code"
                style={{ width: 250, height: 250, border: "1px solid #ccc", borderRadius: 8 }}
              />
            </Box>
        

          {/* Form */}
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth 
                                  style={{ width: 250, height: 60, marginLeft:"70px", border: "1px solid #ccc", borderRadius: 8,margin:"5px" }}

                >
                  Upload QR Code
                  <input
                    type="file"
                    hidden
                    name="qrCode"
                    onChange={handleChange}
                  />
                </Button> 
                 </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="UPI ID"
                  name="upiId"
                  value={bankDetails.upiId}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"             style={{ width: 250, height: 60,  borderRadius: 8,margin:"5px" }}
                  />
                  </Grid>
              </Grid>
   <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Bank Name"
                  name="bankName"
                  value={bankDetails.bankName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"              style={{ width: 250, height: 60,marginLeft:"70px", borderRadius: 8,margin:"5px" }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account Holder"
                  name="accountHolder"
                  value={bankDetails.accountHolder}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"              style={{ width: 250, height: 60,  borderRadius: 8,margin:"5px" }}
                />
              </Grid></Grid>
   <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account Number"
                  name="accountNumber"
                  value={bankDetails.accountNumber}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"              style={{ width: 250, height: 60, marginLeft:"70px", borderRadius: 8,margin:"5px" }}
                  />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="IFSC Code"
                  name="ifscCode"
                  value={bankDetails.ifscCode}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"              style={{ width: 250, height: 60,  borderRadius: 8,margin:"5px" }}
                />
              </Grid>
                  </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box mt={5} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleSave}
            variant="contained"
            color="warning"
            sx={{ textTransform: "none", px: 4, py: 1.5 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default BankMaster;

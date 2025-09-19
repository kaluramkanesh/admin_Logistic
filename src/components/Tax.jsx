// TaxRateMaster.js
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  Avatar,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";

const TaxRateMaster = () => {
  const [taxes, setTaxes] = useState({
    IGST: 18,
    SGST: 9,
    CGST: 9,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaxes({ ...taxes, [name]: value });
  };

  const handleSave = () => {
    console.log("Saved Taxes:", taxes);
    alert("Changes Saved!");
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9f6f1", p: { xs: 2, sm: 4 } }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h5" fontWeight="bold">
          Tax Rate Master
        </Typography>
        <Avatar sx={{ bgcolor: "grey.400" }}>U</Avatar>
      </Box>

      {/* Card */}
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 2,
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight="600"
          gutterBottom
          sx={{ borderBottom: "1px solid #ddd", pb: 1, mb: 3 }}
        >
          Update All Charges
        </Typography>

        <Grid container spacing={3}>
          {/* IGST */}
          <Grid item xs={12} md={4}>
            <TextField
              label="IGST"
              type="number"
              name="IGST"
              value={taxes.IGST}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* SGST */}
          <Grid item xs={12} md={4}>
            <TextField
              label="SGST"
              type="number"
              name="SGST"
              value={taxes.SGST}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* CGST */}
          <Grid item xs={12} md={4}>
            <TextField
              label="CGST"
              type="number"
              name="CGST"
              value={taxes.CGST}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
        </Grid>

        {/* Save Button */}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            onClick={handleSave}
            variant="contained"
            color="warning"
            startIcon={<SaveIcon />}
            sx={{ textTransform: "none", px: 4, py: 1.2 }}
          >
            Save Changes
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaxRateMaster;

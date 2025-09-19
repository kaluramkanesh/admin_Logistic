import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Grid,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
  Box,
  Typography,
  Paper,
  InputAdornment,
} from "@mui/material";
import { updateField, submitForm } from "../../features/LogisticsForm/formSlice";
import { styled } from "@mui/system";


// Custom styled component to match the image's aesthetic
const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    height: 40,
    fontSize: "0.8rem",
    borderRadius: 4,
    "& fieldset": {
      borderColor: "#d3d3d3",
    },
    "&:hover fieldset": {
      borderColor: "#a9a9a9",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#1976d2",
    },
  },
  "& .MuiInputLabel-root": {
    fontSize: "0.8rem",
    transform: "translate(14px, 10px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
  },
  "& .MuiInputAdornment-root p": {
    fontSize: "0.8rem",
    color: "#666",
  },
});

const dropdownOptions = {
  agents: ["partner A", "partner B", "partner C"],
  partyTypes: ["%", "Count"],
  branches: ["Mumbai", "Delhi", "Bangalore"],
  freightTypes: ["Prepaid", "Collect"],
  tdsOptions: ["Yes", "No"],
  gstTypes: ["Regular", "Composition"],
  taxesPaidBy: ["Sender", "Receiver", "Third Party"],
  threePL: ["None", "3PL-A", "3PL-B"],
  deliveryTypes: ["Normal", "Express", "Same Day"],
  states: ["Maharashtra", "Karnataka", "Delhi"],
};

const LogisticsForm = () => {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateField({ name, value }));
  };

  const handleToggle = (name) => (e) => {
    dispatch(updateField({ name, value: e.target.checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitForm(data));
  };

  const v = (key) => (data && data[key] !== undefined ? data[key] : "");

  return (
    <Paper elevation={1} sx={{ p: 4, width: 1400, ml: "50px",}}>
      <Typography variant="h6" gutterBottom sx={{ color: "#555", mb: 3 }}>
      Master Distributor Form     
       </Typography>
<hr></hr>
      <form onSubmit={handleSubmit}>
         <Grid container spacing={4}>
          {/* Row 1 */}
         <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, width: 500, ml:"50px" }}>
            <StyledTextField fullWidth variant="outlined" label="Company Name" name="companyName" value={v("companyName")} onChange={handleChange}   sx={{ width: "450px" }}   // yahan apni required width dal do

 
/>

          </Grid>
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, width: 300, mr:"50px" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter Contact Person Name" name="contactPerson" value={v("contactPerson")} onChange={handleChange}   sx={{ width: "350px" }}   // yahan apni required width dal do
 />
          </Grid>
          

          {/* Row 2 */}
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, width: 250, }}>
            <StyledTextField fullWidth variant="outlined" label="Enter Address" name="address" value={v("address")} onChange={handleChange}   sx={{ width: "300px" }}   // yahan apni required width dal do
/>
          </Grid>
          
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, width: 450, ml:"50px" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter Mobile No." name="mobile" value={v("mobile")} onChange={handleChange}  sx={{ width: "450px" }}   // yahan apni required width dal do
 />
          </Grid>
           <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, width: 340, mr:"10px" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter PAN" name="pan" value={v("pan")} onChange={handleChange}   sx={{ width: "350px" }}   // yahan apni required width dal do
 />
          </Grid>

           <Grid item xs={12} sm={4} md={4} sx={{ p: 2, width: 400, mr:"20px" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter Phone No." name="phone" value={v("phone")} onChange={handleChange}   sx={{ width: "300px" }}   // yahan apni required width dal do
 />
          </Grid>
          
<Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
            <StyledTextField select fullWidth variant="outlined" label="Choose Agent" name="bookingAgent" value={v("bookingAgent")} onChange={handleChange} SelectProps={{ displayEmpty: true } }  sx={{ width: "300px" }}   // yahan apni required width dal do
>
              <MenuItem value="">Choose Agent</MenuItem>
              {dropdownOptions.agents.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </StyledTextField>
          </Grid>
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
            <StyledTextField select fullWidth variant="outlined" label="Enter COD Charge" name="partyType" value={v("partyType")} onChange={handleChange} SelectProps={{ displayEmpty: true }}  sx={{ width: "300px" }}   // yahan apni required width dal do
>
              <MenuItem value="">Enter COD Charge</MenuItem>
              {dropdownOptions.partyTypes.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </StyledTextField>
          </Grid>
       
          {/* Row 4 */}
         
    <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500,mr:"20px"}}>
            <StyledTextField fullWidth variant="outlined" label="Enter GST No." name="gstNo" value={v("gstNo")} onChange={handleChange}   sx={{ width: "450px" }}   // yahan apni required width dal do
 />
          </Grid> 
   <Grid item xs={12} sm={4} md={4} sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter Email" name="email" value={v("email")} onChange={handleChange}   sx={{ width: "300px" }}   // yahan apni required width dal do
 />
          </Grid>
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500, ml:"20px"}}>
            <StyledTextField select fullWidth variant="outlined" label="GST Type" name="gstType" value={v("gstType")} onChange={handleChange} SelectProps={{ displayEmpty: true }}   sx={{ width: "350px" }}   // yahan apni required width dal do
>
              <MenuItem value="">GST Type</MenuItem>
              {dropdownOptions.gstTypes.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </StyledTextField>
          </Grid>
          
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
            <StyledTextField select fullWidth variant="outlined" label="Choose one" name="taxesPaidBy" value={v("taxesPaidBy")} onChange={handleChange} SelectProps={{ displayEmpty: true }}   sx={{ width: "300px" }}   // yahan apni required width dal do
>
              <MenuItem value="">Choose one</MenuItem>              {dropdownOptions.taxesPaidBy.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </StyledTextField>
          </Grid>
      
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500, ml:"20px" }}>
            <StyledTextField select fullWidth variant="outlined" label="Choose 3PL" name="threePl" value={v("threePl")} onChange={handleChange} SelectProps={{ displayEmpty: true }}   sx={{ width: "350px" }}   // yahan apni required width dal do
>
              <MenuItem value="">Choose 3PL</MenuItem>
              {dropdownOptions.threePL.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </StyledTextField>
          </Grid>

          {/* Row 7 */}
          <Grid item xs={12} sm={4} md={4} sx={{ p: 2, maxWidth: 500, mx: "auto" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter min. charge weight" name="minChargeWeight" value={v("minChargeWeight")} onChange={handleChange}    sx={{ width: "300px" }}   // yahan apni required width dal do
/>
          </Grid>
         
          <Grid item xs={12} sm={4} md={4}  sx={{ p: 2, maxWidth: 500, ml:"18px" }}>
            <StyledTextField select fullWidth variant="outlined" label="Choose delivery type" name="deliveryType" value={v("deliveryType")} onChange={handleChange} SelectProps={{ displayEmpty: true }}   sx={{ width: "350px" }}   // yahan apni required width dal do
>
              <MenuItem value="">Choose delivery type</MenuItem>
              {dropdownOptions.deliveryTypes.map((opt) => (
                <MenuItem key={opt} value={opt}>{opt}</MenuItem>
              ))}
            </StyledTextField>
          </Grid>

          {/* Row 8 */}
       
       

          {/* Row 9 - FOV & Handling */}
          <Grid item xs={12} sm={4} md={4} sx={{  maxWidth: 500, ml:"14px" }}>
            <Box >
              <StyledTextField fullWidth variant="outlined" label="Enter FOV Surcharge Minimum" name="fovMin" value={v("fovMin")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Enter FOV Surcharge in %</InputAdornment> }}    sx={{ width: "454px" }}   // yahan apni required width dal do
 />                   

</Box>
</Grid>
          <Grid item xs={12} sm={4} md={4} sx={{  width: 150, ml:"70px" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter AWB Charge" name="awbCharge" value={v("awbCharge")} onChange={handleChange}   sx={{ width: "160px" }}   // yahan apni required width dal do
 />
          </Grid>

           <Grid item xs={12} sm={4} md={4} sx={{  width: 50,mr:"50px" }}>
            <Box >
              <StyledTextField fullWidth variant="outlined" label=" Damrage Min." name="damageMin " value={v("damageMin")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }}   sx={{ width: "170px" }}   // yahan apni required width dal do
/>
             


            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ maxWidth: 500, ml:"120px" }}>
            <Box >
              <StyledTextField fullWidth variant="outlined" label="Enter Handeling Charge" name="handlingCharge" value={v("handlingCharge")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }}    sx={{ width: "300px" }}   // yahan apni required width dal do
 />
           
            </Box>
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ p: 2, maxWidth: 500, mr:"20px" }}>
        
              <StyledTextField fullWidth variant="outlined" label="Enter Damrage Surcharge" name="damageMin Surcharge" value={v("damageMin")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }}   sx={{ width: "450px" }}   // yahan apni required width dal do
/>
             


          
          </Grid>
            

          {/* Row 10 - ODA & Packaging */}
          <Grid item xs={12} sm={4} md={4} sx={{ p: 2, width: 360,ml:"20px" }}>
            <Box >
              <StyledTextField fullWidth variant="outlined" label="ODA Min." name="odaMin" value={v("odaMin")} onChange={handleChange}  sx={{ width: "355px" }}   // yahan apni required width dal do
 />
            </Box>
          </Grid>

  <Grid item xs={12} sm={4} md={4} sx={{ p: 2, maxWidth: 500, ml:"35px"}}>
            <Box >
              <StyledTextField fullWidth variant="outlined" label="Enter ODA Surcharge" name="odaSurcharge" value={v("odaSurcharge")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }}  sx={{ width: "310px" }}   // yahan apni required width dal do
 />
 </Box>
</Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ p: 2, width: 500, mr:"20px" }}>
            <Box display="flex" gap={2}>
              <StyledTextField fullWidth variant="outlined" label="Enter Packaging Surcharge" name="packagingSurcharge" value={v("packagingSurcharge")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }} sx={{ width: "450px" }}   // yahan apni required width dal do
/>
            </Box>
          </Grid>
                 <Grid item xs={12} sm={4} md={4} sx={{ p:2, width: 150, ml:"1px" }}>
            <StyledTextField fullWidth variant="outlined" label="App Min." name="appMin" value={v("appMin")} onChange={handleChange}   sx={{ width: "160px" }}   // yahan apni required width dal do
 />
          </Grid>

           <Grid item xs={12} sm={4} md={4} sx={{ p:2, width: 100,ml:"7px" }}>
            <Box >
              <StyledTextField fullWidth variant="outlined" label=" Damrage Min." name="damageMin " value={v("damageMin")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }}   sx={{ width: "170px" }}   // yahan apni required width dal do
/></Box>
</Grid>
         
        
              <Grid item xs={12} sm={4} md={4} sx={{ p: 2, width: 350, ml:"103px" }}>
            <StyledTextField fullWidth variant="outlined" label="Pickup Charge" name="specialDelivery" value={v("specialDelivery")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Kg</InputAdornment> }}   sx={{ width: "310px" }}   // yahan apni required width dal do
 />
          </Grid>
          <Grid item xs={12} sm={4} md={4} sx={{ p: 2, width: 500, ml:"1px" }}>
            <StyledTextField fullWidth variant="outlined" label="Enter Special Delivery / Appointment Surcharge" name="specialDelivery" value={v("specialDelivery")} onChange={handleChange} InputProps={{ endAdornment: <InputAdornment position="end">Fixed</InputAdornment> }}   sx={{ width: "450px" }}   // yahan apni required width dal do
 />
          </Grid>
          
          <br>
          </br>
          <Grid item xs={12} sm={6} md={4} />

          {/* Toggles */}
          <Grid item xs={12} sm={4} md={4} sx={{ mt:"50px", width: 800, ml:"1px" }}>
            <Box display="flex" alignItems="center" gap={3} mt={2}>
              <FormControlLabel
                control={<Switch checked={!!v("printIGST")} onChange={handleToggle("printIGST")} />}
                label="Point IGST on Bill"
              />
              <FormControlLabel
                control={<Switch checked={!!v("codEnable")} onChange={handleToggle("codEnable")} />}
                label="COD Enable"
              />
              <FormControlLabel
                control={<Switch checked={!!v("userwiseCharge")} onChange={handleToggle("userwiseCharge")} />}
                label="Create distrinutor"
              />
               <FormControlLabel
                control={<Switch checked={!!v("userwiseCharge")} onChange={handleToggle("userwiseCharge")} />}
                label="Create User "
              />
            </Box>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}  sm={4} md={4} sx={{ p: 2, width: 500, ml:"1px" ,mt:"50px" }}>
            <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
              {status === "failed" && <Typography color="error">Error: {error}</Typography>}
              <Button type="submit" variant="contained" disabled={status === "loading"} sx={{ bgcolor: "#1976d2", "&:hover": { bgcolor: "#1565c0" }, borderRadius: 1 }}>
                {status === "loading" ? "Submitting..." : "Submit "}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default LogisticsForm;
// import React from "react";
// import {
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   Switch,
//   Button,
//   Divider,
//   List,
//   ListItem,
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleSetting, submitShipmentSettings } from "../features/shipmentSlice";

// const ShipmentFeatures = () => {
//   const dispatch = useDispatch();
//   const shipment = useSelector((state) => state.shipment);

//   const handleToggle = (key, value) => {
//     dispatch(toggleSetting({ key, value }));
//   };

//   const handleSubmit = () => {
//     dispatch(submitShipmentSettings(shipment));
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: "auto" }}>
//       <Typography variant="h5" gutterBottom>
//         Shipment Features
//       </Typography>

//       {/* Split Shipment */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Split Shipment</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             When an order that contains multiple products is fulfilled in separate shipments,
//             that is called split shipment. The shipments often get delivered on different days.
//           </Typography>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Typography>Enable Split Shipment</Typography>
//             <Switch
//               checked={shipment.splitShipment}
//               onChange={(e) => handleToggle("splitShipment", e.target.checked)}
//             />
//           </Box>
//         </CardContent>
//       </Card>

//       {/* Direct Ship */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Direct Ship Settings</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Direct Ship allows you to automate the shipping process. With a single click you will
//             be able to assign courier, schedule pick and download label.
//           </Typography>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Typography>Enable Direct Ship Settings</Typography>
//             <Switch
//               checked={shipment.directShip}
//               onChange={(e) => handleToggle("directShip", e.target.checked)}
//             />
//           </Box>

//           {shipment.directShip && (
//             <List sx={{ mt: 2 }}>
//               <ListItem>Automatic courier selection based on your chosen courier priority.</ListItem>
//               <ListItem>Pickup will be scheduled automatically for the next day.</ListItem>
//               <ListItem>Shipment labels will be downloaded automatically.</ListItem>
//             </List>
//           )}
//         </CardContent>
//       </Card>

//       {/* Order Verification */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h6">Order Verification</Typography>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Enable order verification which allows you to call the buyer or mark the order as
//             verified before assigning a courier.
//           </Typography>
//           <Box display="flex" alignItems="center" justifyContent="space-between">
//             <Typography>Enable Order Verification</Typography>
//             <Switch
//               checked={shipment.orderVerification}
//               onChange={(e) => handleToggle("orderVerification", e.target.checked)}
//             />
//           </Box>

//           {shipment.orderVerification && (
//             <Box sx={{ mt: 2, pl: 2 }}>
//               <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
//                 <Typography>Verify COD orders</Typography>
//                 <Switch
//                   checked={shipment.verifyCOD}
//                   onChange={(e) => handleToggle("verifyCOD", e.target.checked)}
//                 />
//               </Box>
//               <Box display="flex" alignItems="center" justifyContent="space-between">
//                 <Typography>Verify Prepaid orders</Typography>
//                 <Switch
//                   checked={shipment.verifyPrepaid}
//                   onChange={(e) => handleToggle("verifyPrepaid", e.target.checked)}
//                 />
//               </Box>
//             </Box>
//           )}
//         </CardContent>
//       </Card>

//       <Divider sx={{ my: 3 }} />

//       {/* Submit */}
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//         disabled={shipment.status === "loading"}
//       >
//         {shipment.status === "loading" ? "Saving..." : "Save Settings"}
//       </Button>
//     </Box>
//   );
// };

// export default ShipmentFeatures;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Switch,
  Button,
  Divider,
  List,
  ListItem,
  Collapse,
  Link,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSetting, submitShipmentSettings } from "../features/shipmentSlice";

const ShipmentFeatures = () => {
  const dispatch = useDispatch();
  const shipment = useSelector((state) => state.shipment);

  // Local expand state for "How does it work?"
  const [showSplitInfo, setShowSplitInfo] = useState(false);
  const [showVerificationInfo, setShowVerificationInfo] = useState(false);

  const handleToggle = (key, value) => {
    dispatch(toggleSetting({ key, value }));
  };

  const handleSubmit = () => {
    dispatch(submitShipmentSettings(shipment));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Shipment Features
      </Typography>

      {/* Split Shipment */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Split Shipment</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            When an order that contains multiple products is fulfilled in separate shipments,
            that is called split shipment. The shipments often get delivered on different days.
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Enable Split Shipment</Typography>
            <Switch
              checked={shipment.splitShipment}
              onChange={(e) => handleToggle("splitShipment", e.target.checked)}
            />
          </Box>

          {/* Expandable info */}
          <Box mt={1}>
            <Link component="button" onClick={() => setShowSplitInfo(!showSplitInfo)}>
              How does it work?
            </Link>
            <Collapse in={showSplitInfo}>
              <Box sx={{ bgcolor: "#fff8e1", p: 2, borderRadius: 1, mt: 1 }}>
                <Typography variant="body2">
                  Split shipment allows you to send multiple items of the same order in
                  different packages. Customers may receive them on different days depending
                  on courier allocation.
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </CardContent>
      </Card>

      {/* Direct Ship */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Direct Ship Settings</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Direct Ship allows you to automate the shipping process. With a single click you will
            be able to assign courier, schedule pick and download label.
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Enable Direct Ship Settings</Typography>
            <Switch
              checked={shipment.directShip}
              onChange={(e) => handleToggle("directShip", e.target.checked)}
            />
          </Box>

          {shipment.directShip && (
            <List sx={{ mt: 2 }}>
              <ListItem>Automatic courier selection based on your chosen courier priority.</ListItem>
              <ListItem>Pickup will be scheduled automatically for the next day.</ListItem>
              <ListItem>Shipment labels will be downloaded automatically.</ListItem>
            </List>
          )}
        </CardContent>
      </Card>

      {/* Order Verification */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6">Order Verification</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enable order verification which allows you to call the buyer or mark the order as
            verified before assigning a courier.
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography>Enable Order Verification</Typography>
            <Switch
              checked={shipment.orderVerification}
              onChange={(e) => handleToggle("orderVerification", e.target.checked)}
            />
          </Box>

          {shipment.orderVerification && (
            <Box sx={{ mt: 2, pl: 2 }}>
              <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography>Verify COD orders</Typography>
                <Switch
                  checked={shipment.verifyCOD}
                  onChange={(e) => handleToggle("verifyCOD", e.target.checked)}
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Typography>Verify Prepaid orders</Typography>
                <Switch
                  checked={shipment.verifyPrepaid}
                  onChange={(e) => handleToggle("verifyPrepaid", e.target.checked)}
                />
              </Box>
            </Box>
          )}

          {/* Expandable info */}
          <Box mt={1}>
            <Link component="button" onClick={() => setShowVerificationInfo(!showVerificationInfo)}>
              How does it work?
            </Link>
            <Collapse in={showVerificationInfo}>
              <Box sx={{ bgcolor: "#fff8e1", p: 2, borderRadius: 1, mt: 1 }}>
                <Typography variant="body2">
                  Order verification ensures that buyers are contacted before order dispatch,
                  reducing fake orders and returns. You can apply this for COD or prepaid orders.
                </Typography>
              </Box>
            </Collapse>
          </Box>
        </CardContent>
      </Card>

      <Divider sx={{ my: 3 }} />

      {/* Submit */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={shipment.status === "loading"}
      >
        {shipment.status === "loading" ? "Saving..." : "Save Settings"}
      </Button>
    </Box>
  );
};

export default ShipmentFeatures;

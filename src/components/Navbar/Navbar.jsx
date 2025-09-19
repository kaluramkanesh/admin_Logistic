import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navItems = [
    { label: "LogisticsForm", path: "/" },
     { label: "ApiUsersPage", path: "/ApiUsersPage" },
  { label: "MoneyRequests", path: "/MoneyRequests" },
    { label: "ReportsForm", path: "/ReportsForm" },

  { label: "Ledger", path: "/Ledger" },
  { label: "BankMaster", path: "/BankMaster" },
  { label: "TaxRateMaster", path: "/TaxRateMaster" },
  { label: "OtherStationaryMaster", path: "/OtherStationaryMaster" },
    { label: "ShipmentFeatures", path: "/ShipmentFeatures" },
];

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: "linear-gradient(to right, #6a11cb, #2575fc)",
          px: 2,
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/* Brand */}
          <Typography
            variant="h5"
            sx={{ fontFamily: "Comforter, cursive", fontWeight: 600 }}
          >
            SpectacledCoder
          </Typography>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
            {navItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                to={item.path}
                sx={{
                  color: "white",
                  textTransform: "none",
                  position: "relative",
                  fontSize: "0.9rem",
                  "&::after": {
                    content: '""',
                    display: "block",
                    width: 0,
                    height: "2px",
                    backgroundColor: "#fff",
                    transition: "width 0.3s",
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>

          {/* Mobile Toggler */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" }, color: "#fff" }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "70%",
            backgroundColor: "#fff",
            p: 2,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontFamily: "Comforter, cursive", color: "#333" }}
          >
            SpectacledCoder
          </Typography>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              onClick={() => setOpen(false)}
              sx={{
                fontSize: "1.5rem",
                color: "#333",
              }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;

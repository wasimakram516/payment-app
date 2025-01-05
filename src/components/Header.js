import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({ cartCount, onCartClick }) => (
  <AppBar
    position="fixed"
    sx={{
      backgroundColor: "#2a5d67", // Dark teal
      boxShadow: "none",
      backdropFilter: "blur(10px)", // Modern translucent effect
    }}
  >
    <Toolbar>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        BellaSpesa
      </Typography>
      <IconButton color="inherit">
        <SearchIcon />
      </IconButton>
      {/* Cart Icon */}
      <IconButton color="inherit" onClick={onCartClick}>
        <Badge
          badgeContent={cartCount}
          color="error"
          sx={{
            "& .MuiBadge-badge": {
              top: 8,
              right: 8,
              border: "2px solid white",
              padding: "0 4px",
            },
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default Header;

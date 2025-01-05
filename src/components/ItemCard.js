import React from "react";
import { Card, CardContent, CardMedia, Typography, Button, Box } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac"; // Laptop icon
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"; // Add to cart icon

const ItemCard = ({ item, onAddToCart }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      position: "relative", // Ensure proper positioning of the icon
      borderRadius: 3,
      border: "1px solid rgba(0, 0, 0, 0.1)", // Subtle border
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Light shadow
      transition: "transform 0.2s, box-shadow 0.2s",
      "&:hover": {
        transform: "scale(1.03)", // Slight zoom
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
      },
    }}
  >
    {/* Laptop Icon */}
    <Box sx={{ position: "absolute", top: 8, left: 8 }}>
      <LaptopMacIcon color="primary" sx={{ fontSize: 30 }} />
    </Box>

    <CardMedia
      component="img"
      height="140"
      image={item.image}
      alt={item.name}
      sx={{ objectFit: "cover" }}
    />
    <CardContent sx={{ flexGrow: 1, textAlign: "left" }}>
      <Typography
        variant="h6"
        component="div"
        sx={{ fontWeight: 600, color: "text.primary" }}
      >
        {item.name}
      </Typography>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ marginBottom: 1 }}
      >
        {item.description}
      </Typography>
      <Typography variant="subtitle1" color="text.primary">
        Price: €{item.price}
      </Typography>
    </CardContent>
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: 1 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => onAddToCart(item)}
        startIcon={<AddShoppingCartIcon />} // Icon in button
        sx={{
          flexGrow: 1,
          borderRadius: 6,
          padding: "0.6rem",
        }}
      >
        Add to Cart
      </Button>
    </Box>
  </Card>
);

export default ItemCard;

import React from "react";
import { Button, Typography, Box } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";

const Checkout = ({ total, onGooglePay }) => (
  <Box
    sx={{
      padding: 2,
      border: "1px solid #ddd",
      borderRadius: 2,
      marginTop: 2,
      textAlign: "center",
    }}
  >
    <Typography variant="h5" gutterBottom>
      Checkout
    </Typography>
    <Typography variant="h6" gutterBottom>
      Total: €{total}
    </Typography>
    <Button
      variant="contained"
      color="success"
      size="large"
      onClick={onGooglePay}
      startIcon={<PaymentIcon />}
      sx={{
        marginTop: 1,
        padding: "0.7em 2em",
        fontSize: "1rem",
        fontWeight: "bold",
      }}
    >
      Pay Now
    </Button>
  </Box>
);

export default Checkout;

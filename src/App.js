import React, { useState } from "react";
import Header from "./components/Header";
import ItemCard from "./components/ItemCard";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import items from "./data/items";
import {
  Grid,
  Typography,
  Box,
  Drawer,
  IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const App = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const handleGooglePay = () => {
    if (!window.google) {
      alert("Google Pay is not available in this environment.");
      return;
    }

    const paymentsClient = new window.google.payments.api.PaymentsClient({
      environment: "TEST", // Change to "PRODUCTION" for live transactions
    });

    const paymentDataRequest = {
      apiVersion: 2,
      apiVersionMinor: 0,
      allowedPaymentMethods: [
        {
          type: "CARD",
          parameters: {
            allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
            allowedCardNetworks: ["VISA", "MASTERCARD", "AMEX", "DISCOVER", "JCB"],
          },
          tokenizationSpecification: {
            type: "DIRECT",
            parameters: {
              protocolVersion: "ECv2",
              publicKey: `LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0NCk1JSUJJakFOQmdrcWhraUc5dzBCQVFFRkFBT0NBUThBTUlJQkNnS0NBUUVBdk5KQm1vVEhwSDRPRTZMcU10VE4NCnVaSWVUYWJISlVjZW80QXBuRExQL2NBdnpyMGlHUkROVlUrMDdrQWtxZjBIWjFRZUVBV2cySk5rVHkwUlplK0INCmQ1S0VHOTVqTEhUTDRFWFBBQkdBVGNHb0F4bnpRaC9DbGtRNFBjOUlVeGVndk4wR09zVFdvRWVEL0t0dXpNY3MNCjV1NjRTblRVcXNKdVkrZ0xJZGN5NC9nY0JIb1lBakV2MXpwcUx5WTR3ZmJFV01IYWJuQzI2L0JmanV1anY0dS8NCkx5WDRCcGU1TC8rVDRjcmhGc1g3Rk1zcm1WRlV2QWpiR2VOOC9aTldnSTE4MnBrelJJd2puSlBzUW1nOHFOOTINCllvQzZkRTF2Y3ZqTXBreHlocjFvcDlBNnBYQVhKZ0JBYlA1aDAvVC83ZDIyMHpkUHNiMXI4VkZFc3Rscjdqa1gNCnV3SURBUUFCDQotLS0tLUVORCBQVUJMSUMgS0VZLS0tLS0NCg==`,
            },
          },
        },
      ],
      merchantInfo: {
        merchantId: "BCR2DN4T262IJFAX", // Your Google Pay Merchant ID
        merchantName: "BellaSpesa", // Replace with your business name
      },
      transactionInfo: {
        totalPriceStatus: "FINAL",
        totalPrice: calculateTotal(),
        currencyCode: "EUR", // Replace with your currency code
        countryCode: "IT", // Replace with your country code
      },
    };

    paymentsClient
      .isReadyToPay({ apiVersion: 2, apiVersionMinor: 0, allowedPaymentMethods: paymentDataRequest.allowedPaymentMethods })
      .then((response) => {
        if (response.result) {
          paymentsClient
            .loadPaymentData(paymentDataRequest)
            .then((paymentData) => {
              console.log("Payment Successful:", paymentData);
              alert("Payment Successful!");
              const token = paymentData.paymentMethodData.tokenizationData.token;
              console.log("Payment Token:", token);
            })
            .catch((err) => {
              console.error("Payment failed:", err);
            });
        } else {
          alert("Google Pay is not available.");
        }
      })
      .catch((err) => {
        console.error("Error checking readiness:", err);
      });
  };

  return (
    <Box>
      <Header cartCount={cart.length} onCartClick={() => setIsCartOpen(true)} />

      {/* Item Grid */}
      <Box sx={{ marginTop: "120px", padding: "0 2rem" }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "text.primary", marginBottom: "1rem" }}
        >
          Shop
        </Typography>
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={item.id}
              sx={{
                display: "flex",
                alignItems: "stretch", // Ensures consistent card height
              }}
            >
              <ItemCard item={item} onAddToCart={addToCart} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Cart Drawer */}
      <Drawer
        anchor="right"
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "400px",
            backgroundColor: "background.paper",
            marginTop: "64px", // Adjust for the header height
            height: "calc(100% - 64px)", // Prevent overlap with the header
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <Box
          sx={{
            padding: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ color: "text.primary" }}>
            Your Cart
          </Typography>
          <IconButton
            color="error"
            onClick={() => setIsCartOpen(false)}
            sx={{
              borderRadius: 1,
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 2 }}>
          <Cart cart={cart} onRemoveFromCart={removeFromCart} />
        </Box>
        <Box sx={{ padding: 2 }}>
          {cart.length > 0 && (
            <Checkout
              total={calculateTotal()}
              onGooglePay={handleGooglePay}
            />
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default App;

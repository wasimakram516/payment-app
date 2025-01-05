import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = ({ cart, onRemoveFromCart }) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <div>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <>
          <List>
            {cart.map((item, index) => (
              <div key={index}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onRemoveFromCart(index)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: €${item.price}`}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
          <Typography variant="h6" sx={{ marginTop: 2, textAlign: "right" }}>
            Total: €{calculateTotal()}
          </Typography>
        </>
      )}
    </div>
  );
};

export default Cart;

import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/products/Action";
import { GetProducts } from "../../services/products";

const Form = ({ editProduct, productToEdit, handleEditClose }) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [items, setItems] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (productToEdit) {
      setProduct(productToEdit);
    }
  }, [productToEdit]);

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const getProducts = async () => {
    try {
      const res = await GetProducts();
      setItems(res?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productToEdit) {
      setProduct({});
      editProduct(product);
      handleEditClose();
    } else {
      product.id = items.length + 1;

      dispatch(addProduct(product));
    }
    setProduct({ id: "", name: "", description: "", price: "", category: "" });
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Name"
        name="name"
        value={product.name}
        onChange={(e) => handleChange(product.id, e)}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={product.description}
        onChange={(e) => handleChange(product.id, e)}
        required
      />
      <TextField
        label="Price"
        name="price"
        value={product.price}
        onChange={(e) => handleChange(product.id, e)}
        required
      />
      <TextField
        label="Category"
        name="category"
        value={product.category}
        onChange={(e) => handleChange(product.id, e)}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {productToEdit ? "Update Product" : "Add Product"}
      </Button>
    </Box>
  );
};

export default Form;

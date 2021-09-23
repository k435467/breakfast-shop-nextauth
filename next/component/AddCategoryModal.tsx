import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "../lib/axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 12,
  p: 4,
};

interface AddCategoryModalProps {
  open: boolean;
  handleClose: () => void;
}

export default function AddCategoryModal(props: AddCategoryModalProps) {
  const { open, handleClose } = props;
  const [menuCategory, setMenuCategory] = useState({
    title: "",
    menuItems: [],
  });

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuCategory({ ...menuCategory, [name]: value });
  };

  const handleAdd = () => {
    console.log(menuCategory);
    axios.post("http://localhost:8080/menucategory", menuCategory).then(() => {
      console.log("OK!");
    });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="addcategorymodal-title"
      aria-describedby="addcategorymodal-description"
    >
      <Box sx={style}>
        <Typography
          id="addcategorymodal-title"
          variant="h6"
          component="h2"
          sx={{ pb: 1 }}
        >
          Add Category
        </Typography>
        <TextField
          onChange={handleTitleInputChange}
          fullWidth
          variant="standard"
          label="Title"
          name="title"
        />
        <Box display="flex" justifyContent="end" sx={{ pt: 2.5 }}>
          <Button variant="contained" color="success" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

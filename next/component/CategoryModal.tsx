import { Box, Typography, Modal, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import axios from "../lib/axios";
import IMenuCategory from "../lib/model/IMenuCategory";

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

interface CategoryModalProps {
  open: boolean;
  handleClose: () => void;
  activeCategory: IMenuCategory;
  edit?: boolean;
  del?: boolean;
  refreshMenu: () => void;
}

export default function CategoryModal(props: CategoryModalProps) {
  const { open, handleClose, activeCategory, edit, del, refreshMenu } = props;
  const [menuCategory, setMenuCategory] = useState({
    title: "",
    menuItems: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuCategory({ ...menuCategory, [name]: value });
  };

  const refresh = () => {
    refreshMenu();
    handleClose();
  };

  const handleAdd = () => {
    axios.post("http://localhost:8080/menucategory", menuCategory).then(() => {
      refresh();
    });
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:8080/menucategory/" + activeCategory.id, menuCategory)
      .then(() => {
        refresh();
      });
  };

  const handleDelete = () => {
    axios.delete("http://localhost:8080/menucategory/" + activeCategory.id).then(() => {
      refresh();
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
          {del ? "Delete " : edit ? "Edit " : "Add "}Category
        </Typography>
        <TextField
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          label="Title"
          name="title"
          defaultValue={activeCategory.title}
          disabled={del}
        />
        <Box display="flex" justifyContent="end" sx={{ pt: 2.5 }}>
          <Button
            variant="contained"
            color={del ? "error" : edit ? "warning" : "success"}
            onClick={() => {
              del ? handleDelete() : edit ? handleUpdate() : handleAdd();
            }}
          >
            {del ? "Confirm" : edit ? "Confirm" : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

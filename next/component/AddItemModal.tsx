import {
  Box,
  Typography,
  Modal,
  TextField,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React, { useState } from "react";
import axios from "../lib/axios";
import IMenu from "../lib/model/IMenu";

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

interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
  menu: IMenu[];
}

export default function AddItemModal(props: AddItemModalProps) {
  const { open, handleClose, menu } = props;
  const [category, setCategory] = useState<string>("");
  const [menuItem, setMenuItem] = useState({
    title: "",
    price: 1000,
    menuCategoryId: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
    setMenuItem({ ...menuItem, menuCategoryId: parseInt(e.target.value) });
  };

  const handleAdd = () => {
    axios.post("http://localhost:8080/menuitem", menuItem).then(() => {
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
          Add Item
        </Typography>
        <TextField
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          label="Title"
          name="title"
          sx={{ my: 1 }}
        />
        <TextField
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          label="Price"
          name="price"
          sx={{ my: 1 }}
        />
        <FormControl fullWidth variant="standard" sx={{ my: 1 }}>
          <InputLabel id="select-category-label">Category</InputLabel>
          <Select
            labelId="select-category-label"
            id="select-category"
            value={category}
            onChange={handleSelectChange}
            label="Category"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {menu.map((cate) => {
              return (
                <MenuItem key={cate.id} value={cate.id}>
                  {cate.title}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box display="flex" justifyContent="end" sx={{ pt: 2.5 }}>
          <Button variant="contained" color="success" onClick={handleAdd}>
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

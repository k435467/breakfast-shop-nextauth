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
import React, { useEffect, useState } from "react";
import axios from "../lib/axios";
import IMenu from "../lib/model/IMenu";
import IMenuItem from "../lib/model/IMenuItem";

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
  activeItem: IMenuItem;
  edit?: boolean;
  del?: boolean;
}

export default function ItemModal(props: AddItemModalProps) {
  const { open, handleClose, menu, activeItem, edit, del } = props;
  const [category, setCategory] = useState<string>("");
  const [menuItem, setMenuItem] = useState({
    title: "",
    price: 1000,
    categoryId: 0,
  });

  useEffect(() => {
    if (activeItem.categoryId) {
      setCategory(activeItem.categoryId.toString());
    }
    setMenuItem({
      title: activeItem.title,
      price: activeItem.price,
      categoryId: activeItem.categoryId ?? 0,
    });
  }, [activeItem]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setMenuItem({ ...menuItem, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    setCategory(e.target.value);
    setMenuItem({ ...menuItem, categoryId: parseInt(e.target.value) });
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:8080/menuitem", {
        title: menuItem.title,
        price: menuItem.price,
        menuCategoryId: category,
      })
      .then(() => {
        console.log("OK!");
      });
  };

  const handleUpdate = () => {
    axios
      .put("http://localhost:8080/menuitem/" + activeItem.id, {
        title: menuItem.title,
        price: menuItem.price,
        menuCategoryId: category,
      })
      .then(() => {
        console.log("OK!");
      });
  };

  const handleDelete = () => {
    axios.delete("http://localhost:8080/menuitem/" + activeItem.id).then(() => {
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
          {del ? "Delete " : edit ? "Edit " : "Add "}Item
        </Typography>
        <TextField
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          label="Title"
          name="title"
          sx={{ my: 1 }}
          defaultValue={activeItem.title}
          disabled={del}
        />
        <TextField
          onChange={handleInputChange}
          fullWidth
          variant="standard"
          label="Price"
          name="price"
          sx={{ my: 1 }}
          defaultValue={edit ? activeItem.price : del ? activeItem.price : ""}
          disabled={del}
        />
        <FormControl fullWidth variant="standard" sx={{ my: 1 }}>
          <InputLabel id="select-category-label">Category</InputLabel>
          <Select
            labelId="select-category-label"
            id="select-category"
            value={category}
            defaultValue={
              edit
                ? activeItem.categoryId?.toString()
                : del
                ? activeItem.categoryId?.toString()
                : ""
            }
            onChange={handleSelectChange}
            label="Category"
            disabled={del}
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
          <Button
            variant="contained"
            color="success"
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

import {
  Container,
  Button,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/client";
import IMenu from "../lib/model/IMenu";
import { useState } from "react";
import CategoryModal from "../component/CategoryModal";
import AddItemModal from "../component/AddItemModal";
import IMenuCategory from "../lib/model/IMenuCategory";
import axios from "../lib/axios";

const Home: NextPage<{ menu: IMenu[] }> = ({ menu }) => {
  const [session, loading] = useSession();

  // add category
  const [activeCategory, setActiveCategory] = useState<IMenuCategory>({
    id: 0,
    title: "",
  });
  const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
  const handleOpenAddCategoryModal = () => {
    setActiveCategory({ id: 0, title: "" });
    setOpenAddCategoryModal(true);
  };
  const handleCloseAddCategoryModal = () => setOpenAddCategoryModal(false);

  // add item
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const handleOpenAddItemModal = () => setOpenAddItemModal(true);
  const handleCloseAddItemModal = () => setOpenAddItemModal(false);

  // edit category
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const handleOpenEditCategoryModal = (category: IMenuCategory) => {
    setActiveCategory({ id: category.id, title: category.title });
    setOpenEditCategoryModal(true);
  };
  const handleCloseEditCategoryModal = () => setOpenEditCategoryModal(false);

  const handleDeleteCategory = (id: string) => {
    axios.delete("http://localhost:8080/menucategory/" + id).then(() => {
      console.log("OK!");
    });
  };

  return (
    <>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        {!session && (
          <>
            Not signed in <br />
            <Button variant="contained" onClick={() => signIn()}>
              Sign in
            </Button>
          </>
        )}
        {session && (
          <>
            Signed in as {session.user?.email} <br />
            <Button
              variant="outlined"
              color="error"
              sx={{ m: 0.5 }}
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </>
        )}
        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            color="success"
            sx={{ m: 0.5 }}
            onClick={handleOpenAddCategoryModal}
          >
            Add Category
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ m: 0.5 }}
            onClick={handleOpenAddItemModal}
          >
            Add Item
          </Button>
        </Box>
        <AddItemModal
          open={openAddItemModal}
          handleClose={handleCloseAddItemModal}
          menu={menu}
        />
        <CategoryModal
          open={openAddCategoryModal}
          handleClose={handleCloseAddCategoryModal}
          activeCategory={activeCategory}
        />
        <CategoryModal
          open={openEditCategoryModal}
          handleClose={handleCloseEditCategoryModal}
          activeCategory={activeCategory}
          edit
        />
        <div>
          {menu.map((category) => {
            return (
              <Accordion key={category.id}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${category.id}a-content`}
                  id={`panel${category.id}a-header`}
                >
                  <Typography variant="h6">{category.title}</Typography>
                  <IconButton
                    onClick={() => handleOpenEditCategoryModal(category)}
                    sx={{ ml: 1 }}
                  >
                    <EditIcon color="secondary" />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteCategory(category.id.toString())}
                  >
                    <DeleteOutlineRoundedIcon color="error" />
                  </IconButton>
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {category.menuItems.map((item) => {
                      return (
                        <ListItem key={item.id}>
                          <ListItemText
                            primary={item.title}
                            style={{ wordBreak: "keep-all" }}
                          ></ListItemText>
                          <ListItemSecondaryAction>
                            <Typography>{item.price}</Typography>
                          </ListItemSecondaryAction>
                        </ListItem>
                      );
                    })}
                  </List>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch("http://localhost:8080/menucategory");
  const data: IMenu[] = await res.json();

  return {
    props: {
      menu: data,
    },
  };
};

export default Home;

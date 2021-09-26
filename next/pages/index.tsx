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
import { useEffect, useState } from "react";
import CategoryModal from "../component/CategoryModal";
import ItemModal from "../component/ItemModal";
import IMenuCategory from "../lib/model/IMenuCategory";
import axios from "../lib/axios";
import IMenuItem from "../lib/model/IMenuItem";
import { AxiosResponse } from "axios";

const Home: NextPage = () => {
  const [session, loading] = useSession();

  const [menu, setMenu] = useState<IMenu[]>([]);
  const refreshMenu = () => {
    axios.get("http://localhost:8080/menucategory").then((res: AxiosResponse) => {
      setMenu(res.data);
    });
  };
  useEffect(() => {
    refreshMenu();
  }, []);

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

  // edit category
  const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
  const handleOpenEditCategoryModal = (category: IMenuCategory) => {
    setActiveCategory({ id: category.id, title: category.title });
    setOpenEditCategoryModal(true);
  };
  const handleCloseEditCategoryModal = () => setOpenEditCategoryModal(false);

  // delete category
  const [openDelCategoryModal, setOpenDelCategoryModal] = useState(false);
  const handleOpenDelCategoryModal = (category: IMenuCategory) => {
    setActiveCategory({ id: category.id, title: category.title });
    setOpenDelCategoryModal(true);
  };
  const handleCloseDelCategoryModal = () => setOpenDelCategoryModal(false);

  // add item
  const [activeItem, setActiveItem] = useState<IMenuItem>({
    id: 0,
    title: "",
    price: 1000,
  });
  const [openAddItemModal, setOpenAddItemModal] = useState(false);
  const handleOpenAddItemModal = () => {
    setActiveItem({ id: 0, title: "", price: 1000 });
    setOpenAddItemModal(true);
  };
  const handleCloseAddItemModal = () => setOpenAddItemModal(false);

  // edit item
  const [openEditItemModal, setOpenEditItemModal] = useState(false);
  const handleOpenEditItemModal = (item: IMenuItem) => {
    setActiveItem({
      id: item.id,
      title: item.title,
      price: item.price,
      categoryId: item.categoryId,
    });
    setOpenEditItemModal(true);
  };
  const handleCloseEditItemModal = () => setOpenEditItemModal(false);

  // delete item
  const [openDelItemModal, setOpenDelItemModal] = useState(false);
  const handleOpenDelItemModal = (item: IMenuItem) => {
    setActiveItem({
      id: item.id,
      title: item.title,
      price: item.price,
      categoryId: item.categoryId,
    });
    setOpenDelItemModal(true);
  };
  const handleCloseDelItemModal = () => setOpenDelItemModal(false);

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
        <ItemModal
          open={openAddItemModal}
          handleClose={handleCloseAddItemModal}
          menu={menu}
          activeItem={activeItem}
          refreshMenu={refreshMenu}
        />
        <ItemModal
          open={openEditItemModal}
          handleClose={handleCloseEditItemModal}
          menu={menu}
          activeItem={activeItem}
          edit
          refreshMenu={refreshMenu}
        />
        <ItemModal
          open={openDelItemModal}
          handleClose={handleCloseDelItemModal}
          menu={menu}
          activeItem={activeItem}
          del
          refreshMenu={refreshMenu}
        />
        <CategoryModal
          open={openAddCategoryModal}
          handleClose={handleCloseAddCategoryModal}
          activeCategory={activeCategory}
          refreshMenu={refreshMenu}
        />
        <CategoryModal
          open={openEditCategoryModal}
          handleClose={handleCloseEditCategoryModal}
          activeCategory={activeCategory}
          edit
          refreshMenu={refreshMenu}
        />
        <CategoryModal
          open={openDelCategoryModal}
          handleClose={handleCloseDelCategoryModal}
          activeCategory={activeCategory}
          del
          refreshMenu={refreshMenu}
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
                    <EditIcon color="warning" />
                  </IconButton>
                  <IconButton onClick={() => handleOpenDelCategoryModal(category)}>
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
                            <div>
                              <Typography component="span">{item.price}</Typography>
                              <IconButton
                                onClick={() =>
                                  handleOpenEditItemModal({
                                    ...item,
                                    categoryId: category.id,
                                  })
                                }
                              >
                                <EditIcon color="warning" />
                              </IconButton>
                              <IconButton
                                onClick={() =>
                                  handleOpenDelItemModal({
                                    ...item,
                                    categoryId: category.id,
                                  })
                                }
                              >
                                <DeleteOutlineRoundedIcon color="error" />
                              </IconButton>
                            </div>
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

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("http://localhost:8080/menucategory");
//   const data: IMenu[] = await res.json();

//   return {
//     props: {
//       menu: data,
//     },
//   };
// };

export default Home;

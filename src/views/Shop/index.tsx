import { useEffect } from "react";
import { Box, Container, Grid } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import ShopTable from "../../sections/shop/ShopTable";

const Home = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="xl">
        <ShopTable />
      </Container>
    </Box>
  );
};

export default Home;

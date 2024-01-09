import { useMemo } from "react";
import { Box, Container, Grid } from "@mui/material";
import { groupBy } from "lodash";
import OverviewBudget from "../../sections/overview/OverviewBudget";
import OverviewTotalCustomers from "../../sections/overview/OverviewTotalCustomers";
import OverviewOrdersProgress from "../../sections/overview/OverviewOrders";
import OverviewRateAverage from "../../sections/overview/OverviewRateAverage";
import OverviewTraffic from "../../sections/overview/OverviewTraffic";

import { useAppDispatch, useAppSelector } from "../../utils/store";
import arrayKeyCount from "../../utils/arrayKeyCount";
import { selectProducts } from "../../store/productsSlice";

const Home = () => {
  const products = useAppSelector(selectProducts);
  const productsByCat = arrayKeyCount(products, "category");

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,

        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: "100%" }}
              value="$24k"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewOrdersProgress sx={{ height: "100%" }} value={75.5} />
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <OverviewRateAverage sx={{ height: "100%" }} value="$15k" />
          </Grid>
          <Grid item xs={12} sm={6} lg={6}>
            <OverviewTraffic
              chartSeries={Object.values(productsByCat).map((v) =>
                Math.ceil((v / products.length) * 100),
              )}
              labels={Object.keys(productsByCat)}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;

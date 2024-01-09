import CurrencyDollarIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import {
  Avatar,
  Card,
  CardContent,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../utils/store";
import { selectProductsRateAvg } from "../../store/productsSlice";

interface OverviewTotalProfitProps {
  value: number;
  sx: object;
}

const OverviewTotalProfit = (props: OverviewTotalProfitProps) => {
  const { value, sx } = props || {};
  const rateAvg = useAppSelector(selectProductsRateAvg);

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              میانگین امتیاز
            </Typography>
            <Typography variant="h4">{rateAvg.toFixed(2)}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>
              <CurrencyDollarIcon />
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default OverviewTotalProfit;

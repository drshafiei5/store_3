import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import ShoppingBagIcon from "@heroicons/react/24/solid/ShoppingBagIcon";

import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "داشبورد",
    path: "/",
    external: false,
    disabled: false,
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "فروشگاه",
    path: "/shop",
    external: false,
    disabled: false,
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
];

import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import BookIcon from "@heroicons/react/24/solid/BookOpenIcon";
import BoxIcon from "@heroicons/react/24/solid/ArchiveBoxIcon";
import CartIcon from "@heroicons/react/24/solid/ShoppingCartIcon";
import MoneyIcon from "@heroicons/react/24/solid/CurrencyDollarIcon";
import NoteIcon from "@heroicons/react/24/solid/BanknotesIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import { SvgIcon } from "@mui/material";

export const items = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Action Log",
    path: "/log",
    icon: (
      <SvgIcon fontSize="small">
        <ClockIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Supplier",
    path: "/supplier",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Products",
    path: "/products",
    icon: (
      <SvgIcon fontSize="small">
        <BoxIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Category",
    path: "/category",
    icon: (
      <SvgIcon fontSize="small">
        <BoxIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Report",
    dropdowns: [
      {
        title: "Purchasing Report",
        path: "/purchasing-report",
        icon: (
          <SvgIcon fontSize="small">
            <CartIcon />
          </SvgIcon>
        ),
      },
      {
        title: "Stock Out Report",
        path: "/stock-out-report",
        icon: (
          <SvgIcon fontSize="small">
            <NoteIcon />
          </SvgIcon>
        ),
      },
    ],
    icon: (
      <SvgIcon fontSize="small">
        <BookIcon />
      </SvgIcon>
    ),
  },
];

export const inputItems = [
  {
    title: "Stock Out",
    path: "/stock-out",
    icon: (
      <SvgIcon fontSize="small">
        <MoneyIcon />
      </SvgIcon>
    ),
  },
];

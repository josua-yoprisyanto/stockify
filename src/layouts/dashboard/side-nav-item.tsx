import NextLink from "next/link";
import PropTypes from "prop-types";
import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";

interface DropdownItem {
  title: string;
  path: string;
  icon?: React.ReactNode;
}

interface SideNavItemProps {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon?: React.ReactNode;
  path?: string;
  title: string;
  haveDropdown?: boolean;
  dropdowns?: DropdownItem[];
  pathname?: string; // Making pathname optional
}

export const SideNavItem = (props: SideNavItemProps) => {
  const {
    active = false,
    disabled,
    external,
    icon,
    path,
    title,
    haveDropdown,
    dropdowns,
    pathname,
  } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const linkProps = path
    ? external
      ? {
          component: "a",
          href: path,
          target: "_blank",
        }
      : {
          component: NextLink,
          href: path,
        }
    : {};

  const DropdownComponent = ({ dropdown }) => {
    const dropdownLinkProps = dropdown.path
      ? external
        ? {
            component: "a",
            href: dropdown.path,
            target: "_blank",
          }
        : {
            component: NextLink,
            href: dropdown.path,
          }
      : {};

    let activeTab = dropdown.path === pathname;

    return (
      <ButtonBase
        sx={{
          mx: 2,
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(activeTab && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        {...dropdownLinkProps}
      >
        {dropdown.icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.400",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(activeTab && {
                color: "primary.main",
              }),
            }}
          >
            {dropdown.icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "neutral.400",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(activeTab && {
              color: "common.white",
            }),
            ...(disabled && {
              color: "neutral.500",
            }),
          }}
        >
          {dropdown.title}
        </Box>
      </ButtonBase>
    );
  };

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          ...(active && {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          }),
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        onClick={() => (haveDropdown ? setShowDropdown(!showDropdown) : "")}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              color: "neutral.400",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              ...(active && {
                color: "primary.main",
              }),
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: "neutral.400",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(active && {
              color: "common.white",
            }),
            ...(disabled && {
              color: "neutral.500",
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>

      {haveDropdown &&
        showDropdown &&
        dropdowns.map((dropdown, index) => <DropdownComponent dropdown={dropdown} key={index} />)}
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
};

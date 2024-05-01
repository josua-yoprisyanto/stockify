import React, { useState } from "react";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { Card, InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange: any;
}

export const SearchBar = (props: SearchBarProps) => {
  const { placeholder, value, onChange } = props;
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e) => {
    onChange(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        fullWidth
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => handleInputChange(e)}
        startAdornment={
          <InputAdornment position="start">
            <SvgIcon color="action" fontSize="small">
              <MagnifyingGlassIcon />
            </SvgIcon>
          </InputAdornment>
        }
      />
    </Card>
  );
};

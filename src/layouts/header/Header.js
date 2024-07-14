import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Person } from "@mui/icons-material";

const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "##1976d2" }}
      elevation={0}
    >
      <Toolbar>
        <Typography
          component={Link}
          sx={{ textDecoration: "none", color: "white" }}
          variant="h5"
          fontFamily="cursive"
        >
          Product Finder
        </Typography>

        <Box flexGrow={1} />
        <Link to="/">
          <Button sx={{ textDecoration: "none", color: "white" }}>Home</Button>
        </Link>

        <Link to="/form">
          <Button sx={{ textDecoration: "none", color: "white", ml: 5 }}>
            Create
          </Button>
        </Link>

        <Typography
          component={Link}
          sx={{ textDecoration: "none", color: "white", ml: 5 }}
        >
          LOGIN
        </Typography>

        <IconButton size="large" color="inherit" sx={{ ml: 2 }}>
          <Person />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

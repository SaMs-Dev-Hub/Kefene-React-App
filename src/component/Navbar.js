import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";

import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [logout, setLogout] = useState();
  useEffect(() => {
    if (localStorage.getItem("authenticated") === "true") {
      setLogout(true);
    } else {
      setLogout(false);
    }
    if (window.location.pathname === "/") {
      setLogout(false);
    }
  }, []);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const onLogout = () => {
    localStorage.setItem("authenticated", false);
    setLogout(false);
  };

  return (
    <AppBar position="static" color="transparent">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            sx={{
              height: 30,
              width: 30,
              maxHeight: { xs: 233, md: 167 },
              maxWidth: { xs: 350, md: 250 },
            }}
            alt="The house from the offer."
            src="https://edu-web-fundamentals.web.app/static/media/logo.58169365.png"
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 3,
              ml: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 500,
              fontSize: 30,
              color: "Black",
              textDecoration: "none",
            }}
          >
            Kafene
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Orders</Typography>
                <br />
                <Typography textAlign="center">Products</Typography>
                <br />
                <Typography textAlign="center">Users</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",

              textDecoration: "none",
            }}
          >
            Kafene
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Link to={"/orders"} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: "Black",
                  textDecoration: "none",
                }}
              >
                Orders
              </Button>
            </Link>
            <Link to={"/products"} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: "Black",
                  textDecoration: "none",
                }}
              >
                Products
              </Button>
            </Link>
            <Link to={"/users"} style={{ textDecoration: "none" }}>
              <Button
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  display: "block",
                  color: "Black",
                  textDecoration: "none",
                }}
              >
                Users
              </Button>
            </Link>
          </Box>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Box sx={{ flexGrow: 0 }}>
              {logout && (
                <Typography textAlign="center">
                  <Button onClick={onLogout} variant="contained">
                    Logout
                  </Button>
                </Typography>
              )}
            </Box>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;

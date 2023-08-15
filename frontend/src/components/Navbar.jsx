import * as React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faUser,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

const pages = ["Sign Up"];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <img
              src={LOGO}
              alt="logo"
              width={180}
              className="mr-4"
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Box>

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
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  component={Link}
                  to={`/${page.toLowerCase().replace(" ", "")}`}
                  onClick={handleCloseNavMenu}
                >
                  <Typography variant="body1">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <img
              src={LOGO}
              alt="logo"
              width={150}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`/${page.toLowerCase().replace(" ", "")}`}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  fontSize: "1rem",
                  fontWeight: 600,
                }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    backgroundColor: "#FFFFFF",
                    width: { xs: "2rem", md: "2.5rem" },
                    height: { xs: "2rem", md: "2.5rem" },
                  }}
                >
                  <PersonIcon
                    sx={{
                      color: "#262626",
                      fontSize: { xs: "1.5rem", md: "2rem" },
                    }}
                  />
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem>
                <Link
                  to="#"
                  style={{
                    textDecoration: "none",
                    color: "#262626",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />
                  My Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="#"
                  style={{
                    textDecoration: "none",
                    color: "#262626",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faShoppingCart} // Use the shopping cart icon
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />
                  Cart
                </Link>
              </MenuItem>
              <MenuItem>
                <Link
                  to="#"
                  style={{
                    textDecoration: "none",
                    color: "#5A5A5A",
                    fontSize: "1.2rem",
                    fontWeight: "500",
                    fontFamily: "Poppins",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faRightFromBracket}
                    style={{
                      marginRight: "0.5rem",
                    }}
                  />
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

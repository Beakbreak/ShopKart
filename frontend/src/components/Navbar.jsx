import * as React from "react";
import { Link } from "react-router-dom";
import LOGO from "../assets/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { styled, Button, Typography } from "@mui/material";
import helpIcon from "../assets/helpIcon.svg";
import googleIcon from "../assets/googleIcon.svg";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { AuthProvider } from "../hooks/AuthContext";

const HelpButton = styled(Box)`
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const GoogleButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 1rem;
  text-transform: none;
  border: 4px solid rgba(66, 133, 244, 0.1);
  border-radius: 8px;

  &:hover {
    border: 4px solid rgba(66, 133, 244, 0.1);
    background-color: #fff;
  }
`;

const ProfileContainer = styled(Box)`
  display: flex;
  align-items: center;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.15);
  }
`;

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function Navbar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, validateToken } = React.useContext(AuthProvider);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#fff",
        padding: "0.5rem 1rem 0 1rem",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-decoration-none">
              <img src={LOGO} alt="logo" width={180} />
            </Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
            }}
          >
            <HelpButton display={{ xs: "none", md: "flex" }}>
              <img
                src={helpIcon}
                alt="help"
                style={{ width: "1rem", height: "1rem" }}
              />
              <Typography variant="body1" color="rgba(0, 0, 0, 0.5)">
                Help
              </Typography>
            </HelpButton>

            {!user.isAuthenticated ? (
              <GoogleButton
                variant="outlined"
                onClick={() => {
                  window.location.href = new URL(
                    "/api/v1/auth/google",
                    BACKEND_URL
                  ).href;
                }}
              >
                <img
                  src={googleIcon}
                  alt="google"
                  style={{ width: "1rem", height: "1rem" }}
                />
                <Typography
                  variant="body1"
                  color="rgba(0, 0, 0, 0.5)"
                  sx={{ display: { xs: "none", md: "block" } }}
                >
                  Login with Google
                </Typography>
              </GoogleButton>
            ) : (
              <Box sx={{ flexGrow: 0 }}>
                <ProfileContainer
                  sx={{
                    cursor: "pointer",
                    border: {
                      xs: "none",
                      md: "1px solid rgba(0, 0, 0, 0.5)",
                    },
                  }}
                >
                  <Avatar
                    alt={user.userData?.name}
                    src={user.userData?.profilePicture}
                    onClick={handleOpenUserMenu}
                    sx={{
                      width: { xs: "2rem", md: "1.5rem" },
                      height: { xs: "2rem", md: "1.5rem" },
                      marginLeft: { xs: "0", md: "0.5rem" },
                    }}
                  />
                  <Typography
                    variant="body1"
                    color="rgba(0, 0, 0, 0.5)"
                    padding="0.5rem 1rem"
                    textTransform="none"
                    sx={{ display: { xs: "none", md: "block" } }}
                  >
                    Hi! {user.userData?.name}
                  </Typography>
                </ProfileContainer>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem>
                    <Link
                      to="/cart"
                      style={{
                        textDecoration: "none",
                        color: "#262626",
                        fontSize: "1.2rem",
                        fontWeight: "500",
                        fontFamily: "Poppins",
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faShoppingCart}
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
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

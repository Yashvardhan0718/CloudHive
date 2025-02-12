import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import CloudHive from "../assets/light.png";
import MUISwitch from "../components/MUISwitch";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeAllFileData } from "../redux/actions/fileActions";
import { logOutUser } from "../redux/actions/userActions";
import { getUserAsync } from "../redux/actions/userActions";
import { getAllFiles } from "../redux/actions/fileActions";
import { useEffect } from "react";
const pages = [["Home", "/"]];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    logOutUser()(dispatch);
    dispatch(removeAllFileData());
    handleCloseUserMenu();
    navigate("/login");
  };
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const navigateToAccountPage = () => {
    navigate("/account");
    handleCloseUserMenu();
  };

  useEffect(() => {
    console.log("dispatch");
    if (localStorage.getItem("token")) {
      getUserAsync()(dispatch);
      getAllFiles()(dispatch);
    }
  }, [dispatch]);

  return (
    <AppBar position="static" sx={{ backgroundColor: "#6c63ff" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box mr={3} sx={{ display: { xs: "none", md: "flex" } }}>
            <img style={{ height: "50px" }} src={CloudHive} />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="menu"
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
              {pages.map(([name, to]) => (
                <MenuItem key={name} onClick={handleCloseNavMenu}>
                  <Link
                    to={to}
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    {name}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,

              display: { xs: "flex", md: "none" },
            }}
          >
            <img style={{ height: "50px" }} src={CloudHive} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map(([name, to]) => (
              <Link
                key={name}
                onClick={handleCloseNavMenu}
                to={to}
                style={{
                  color: "white",
                  textDecoration: "none",
                  marginRight: "20px",
                }}
              >
                {name}
              </Link>
            ))}
          </Box>
          <MUISwitch />
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" />
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
              <MenuItem key="Account" onClick={navigateToAccountPage}>
                <Typography textAlign="center">Account</Typography>
              </MenuItem>
              <MenuItem key="Logout" onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;

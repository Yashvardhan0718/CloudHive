import { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { Paper, Box, Tooltip, IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import { RootReducer } from "../redux/store";
import { yellow, green, blue } from "@mui/material/colors";
import AccountModel from "../components/AccountModel";

export default function InsetDividers() {
  const [open, setOpen] = useState<boolean>(false);
  const [type, setType] = useState<"name" | "password">("name");

  const { user, loading } = useSelector((state: RootReducer) => state.auth);
  if (user === null && loading) {
    return (
      <Box sx={{ textAlign: "center", marginTop: "20%" }}>
        <CircularProgress size={80} />
      </Box>
    );
  }

  const name = user?.name;
  const email = user?.email;
  const handleClose = () => setOpen(false);
  const handleOpen = (update: "name" | "password") => {
    setType(update);
    setOpen(true);
  };

  return (
    <Box>
      <Paper
        sx={{ marginX: { xs: "10%", sm: "20%", md: "30%" }, marginY: "10%" }}
      >
        <Box>
          <List
            sx={{
              bgcolor: "background.paper",
            }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[500] }} variant="rounded">
                  <AccessibilityNewIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Name" secondary={name} />

              <Tooltip title="Edit">
                <IconButton onClick={() => handleOpen("name")}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: yellow[500] }} variant="rounded">
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Email" secondary={email} />
              <LockIcon />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                  <PasswordIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Password" secondary="******" />
              <Tooltip title="Edit">
                <IconButton onClick={() => handleOpen("password")}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          </List>
        </Box>
      </Paper>
      <AccountModel open={open} handleClose={handleClose} type={type} />
    </Box>
  );
}

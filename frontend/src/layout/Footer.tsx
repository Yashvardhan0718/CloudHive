import React from "react";
import { Box, Typography, Tooltip, Grid } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center",
        paddingY: 0.5,
        position: "fixed",
        bottom: 0,
        width: "100%",
      }}
    >
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <Tooltip title="GitHub">
            <a
              href="https://github.com/SomnathKar000"
              target="_blank"
              rel="noreferrer"
            >
              <GitHubIcon
                sx={{
                  fontSize: "1.5rem",
                  color: "white",
                }}
              />
            </a>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="LinkedIn">
            <a
              href="https://www.linkedin.com/in/somnath-kar-aa73aa1a3/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon sx={{ fontSize: "1.5rem", color: "#0072b1" }} />
            </a>
          </Tooltip>
        </Grid>
      </Grid>

      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Somnath Kar. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

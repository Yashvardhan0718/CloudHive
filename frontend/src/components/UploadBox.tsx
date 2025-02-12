import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { Tooltip, Button, useTheme } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../redux/actions/fileActions";
import { createAlert } from "../redux/actions/alertActions";
import { RootReducer } from "../redux/store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  textAlign: "center",
};

const UploadContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
});

const VisuallyHiddenInput = styled("input")({
  display: "none",
});

export default function SpeedDialWithModal() {
  const [open, setOpen] = React.useState(false);
  const [fileSelected, setFileSelected] = React.useState(false);
  const [file, setFile] = React.useState({} as File);
  const loading = useSelector(
    (state: RootReducer) => state.file.loading.UPLOAD_FILE
  );
  const dispatch = useDispatch();
  const theme = useTheme();

  const handleOpen = () => {
    setOpen(true);
    setFileSelected(false);
  };

  const handleClose = () => setOpen(false);

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      dispatch(
        createAlert({ message: "File Selected SuccessFully", type: "success" })
      );
      setFileSelected(true);
    }
  };

  const handleFileUpload = () => {
    uploadFile(file.name, file.type, file)(dispatch);
  };

  return (
    <Container>
      <Box
        sx={{
          position: "fixed",
          bottom: "70px",
          right: "50px",
          color: theme.palette.text.primary,
        }}
      >
        <SpeedDial
          onClick={handleOpen}
          ariaLabel="SpeedDial basic example"
          icon={<SpeedDialIcon />}
        ></SpeedDial>
      </Box>

      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            bgcolor: theme.palette.background.paper,
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            sx={{
              color: theme.palette.text.primary,
            }}
          >
            Upload Your File
          </Typography>
          <UploadContainer>
            <label htmlFor="file-upload">
              <Tooltip title="Select your file">
                <CloudUploadIcon fontSize="large" />
              </Tooltip>
            </label>
            <Box sx={{ display: "flex", gap: "16px" }}>
              <LoadingButton
                onClick={handleFileUpload}
                loading={loading}
                variant="contained"
                color="primary"
                size="large"
                disabled={!fileSelected || loading}
              >
                Upload
              </LoadingButton>
              <Button
                disabled={loading}
                variant="contained"
                color="error"
                size="large"
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
            <VisuallyHiddenInput
              id="file-upload"
              type="file"
              onChange={handleSelect}
              disabled={loading}
            />
          </UploadContainer>
        </Box>
      </Modal>
    </Container>
  );
}

import react, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, TextField, Grid } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions/userActions";
import { createAlert } from "../redux/actions/alertActions";
import { RootReducer } from "../redux/store";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface BasicModelProps {
  open: boolean;
  type: "name" | "password";
  handleClose: () => void;
}

const BasicModal: react.FC<BasicModelProps> = ({ open, handleClose, type }) => {
  const [updateData, setUpdateData] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootReducer) => state.auth);
  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(updateData, currentPassword);
    if (type === "name" && updateData.length < 3) {
      dispatch(
        createAlert({
          message: "Name must be at least 3 characters long",
          type: "info",
        })
      );
      return;
    } else if (type === "password" && updateData.length < 5) {
      dispatch(
        createAlert({
          message: "Password must be at least 5 characters long",
          type: "info",
        })
      );

      return;
    } else if (currentPassword.length < 5) {
      dispatch(
        createAlert({
          message: "Password must be at least 5 characters long",
          type: "info",
        })
      );
      return;
    }
    updateUser(type, updateData, currentPassword)(dispatch);
  };
  return (
    <div>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style}>
          <Typography
            textAlign="center"
            id="modal-modal-title"
            variant="h6"
            component="h2"
            mb={3}
          >
            UPDATE {type.toUpperCase()}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                value={updateData}
                variant="outlined"
                label={`Enter New ${type}`}
                fullWidth
                onChange={(e) => setUpdateData(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Enter Current Password"
                variant="outlined"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Box
            gap={5}
            sx={{ mt: 3, display: "flex", justifyContent: "center" }}
          >
            <LoadingButton
              variant="contained"
              color="success"
              type="submit"
              loading={loading}
              onClick={handleSubmit}
            >
              Submit
            </LoadingButton>
            <Button
              disabled={loading}
              variant="contained"
              color="error"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;

import React, { useRef, useEffect } from "react";
import { Box, Typography, TextField, FormControl } from "@mui/material";
import { Link } from "react-router-dom";
import CloudHive from "../assets/light.png";
import { validate } from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import { createAlert } from "../redux/actions/alertActions";
import { useNavigate } from "react-router-dom";
import { RootReducer } from "../redux/store";
import { loginAsync } from "../redux/actions/userActions";
import LoadingButton from "@mui/lab/LoadingButton";

const Login = () => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordref = useRef<HTMLInputElement | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(
    (state: RootReducer) => state.auth
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordref.current?.value;
    if (email === undefined || password === undefined) {
      dispatch(createAlert({ message: "Invalid info", type: "info" }));
      return;
    }
    if (!validate(email)) {
      dispatch(createAlert({ message: "Invalid email", type: "info" }));
      return;
    }
    if (password.trim().length < 5) {
      dispatch(createAlert({ message: "Invalid password", type: "info" }));
      return;
    }
    loginAsync({ email, password })(dispatch);
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <Box>
      <FormControl
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          gap: 4,
        }}
        onSubmit={handleSubmit}
        component={"form"}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img style={{ height: "60px" }} src={CloudHive} />
        </Box>
        <TextField
          inputRef={emailRef}
          type="email"
          required
          label="Email"
          fullWidth
        />
        <TextField inputRef={passwordref} required label="Password" fullWidth />
        <LoadingButton
          loading={loading}
          type="submit"
          size="large"
          variant="contained"
          sx={{
            backgroundColor: "#6c63ff",
            "&:hover": { backgroundColor: "#5a50d3" },
          }}
        >
          Submit
        </LoadingButton>
        <Typography textAlign="center" variant="subtitle1" gutterBottom>
          DON'T HAVE AN ACCOUNT?{" "}
          <Link
            style={{ textDecoration: "none", color: "#6c63ff" }}
            to="/sign-up"
          >
            REGISTER
          </Link>
        </Typography>
      </FormControl>
    </Box>
  );
};

export default Login;

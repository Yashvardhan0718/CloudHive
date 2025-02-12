import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Box, FormControl, Typography, TextField } from "@mui/material";
import CloudHive from "../assets/light.png";
import { validate } from "email-validator";
import { useDispatch, useSelector } from "react-redux";
import { signupUserAsync } from "../redux/actions/userActions";
import { createAlert } from "../redux/actions/alertActions";
import { RootReducer } from "../redux/store";
import { useNavigate } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";

const SignUp = () => {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const confirmPasswordref = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useSelector(
    (state: RootReducer) => state.auth
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordref.current?.value;
    if (
      name === undefined ||
      email === undefined ||
      password === undefined ||
      confirmPassword === undefined
    ) {
      dispatch(createAlert({ message: "Invalid info", type: "info" }));
      return;
    }
    if (name.trim().length < 3) {
      dispatch(createAlert({ message: "Invalid name", type: "info" }));
      return;
    }
    if (!validate(email)) {
      dispatch(createAlert({ message: "Invalid email", type: "info" }));
      return;
    }
    if (password.trim().length < 5) {
      dispatch(
        createAlert({
          message: "Password must contain at least 5 characters",
          type: "info",
        })
      );
      return;
    }
    if (password !== confirmPassword) {
      dispatch(
        createAlert({ message: "Passwords do not match", type: "info" })
      );
    }
    await signupUserAsync({ name, email, password })(dispatch);
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
          bgcolor: "Background.paper",
          width: 400,
          boxShadow: 24,
          p: 4,
          mt: 3,
          gap: 3,
        }}
        onSubmit={handleSubmit}
        component="form"
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
        <TextField label="Name" required inputRef={nameRef} />
        <TextField label="Email" type="email" required inputRef={emailRef} />
        <TextField label="Password" required inputRef={passwordRef} />
        <TextField
          label="Confirm Password"
          type="password"
          required
          inputRef={confirmPasswordref}
        />
        <LoadingButton
          variant="contained"
          type="submit"
          loading={loading}
          size="large"
          sx={{
            backgroundColor: "#6c63ff",
            "&:hover": { backgroundColor: "#5a50d3" },
          }}
        >
          Submit
        </LoadingButton>
        <Typography textAlign="center" variant="subtitle1" gutterBottom>
          ALREADY HAVE AN ACOUNT{" "}
          <Link
            style={{ textDecoration: "none", color: "#6c63ff" }}
            to="/login"
          >
            LOGIN
          </Link>
        </Typography>
      </FormControl>
    </Box>
  );
};

export default SignUp;

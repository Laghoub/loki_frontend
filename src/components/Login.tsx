import { useState } from "react";
import * as React from "react";
import reactLogo from "./assets/react.svg";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../App.css";
import logo from "../assets/logo.jpg";
import { BorderColor } from "@mui/icons-material";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8081/api/authenticate",
        formData
      );

      // Si l'authentification réussit, vous pouvez rediriger l'utilisateur vers la page d'accueil
      // ou effectuer d'autres actions, par exemple, stocker le jeton JWT.
      console.log("Authentification réussie : ", response.data.id_token);
      localStorage.setItem("token", response.data.id_token);

      // Effacez les données du formulaire après une connexion réussie
      setFormData({ username: "", password: "" });
      localStorage.setItem("connected", "true");

      // Redirigez l'utilisateur vers la page d'accueil (remplacez /home par l'URL de votre choix)
      window.location.href = "/";
    } catch (error) {
      // Si l'authentification échoue, affichez un message d'erreur
      console.error("Erreur d'authentification : ", error);
      setError("The login informations are incorrect.");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Votre Image"
          style={{ width: "80px", height: "80px" }}
        />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error && <div style={{ color: "red" }}>{error}</div>}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="username"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: "#98d648" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ color: "#186049" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" sx={{ color: "#186049" }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;

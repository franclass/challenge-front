import React, { useState} from "react";
import { Button, TextField, Typography, Container } from "@mui/material";
import Logo from "@assets/logoColor.svg";
import style from "./Login.module.scss";
import useSession from "@hooks/useSession";
import { ISessionContext } from "@interfaces/general.interfaces";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useSession() as ISessionContext;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login({ email, password });
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={style.paper}>
        <div>
          <img src={Logo} alt="Logo" />
        </div>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={style.form} onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={style.loginInput}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={style.loginInput}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={style.submit}
            style={{ backgroundColor: "#CA4145", marginTop: "20px" }}
          >
            Sign In
          </Button>
        </form>
      </div>
    </Container>
  );
}

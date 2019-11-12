import React, { createRef, useState, useRef, useEffect } from "react";
import Head from "next/head";
import ReCAPTCHA from "react-google-recaptcha";
import {
  makeStyles,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  Typography,
  Button
} from "@material-ui/core";
import axios from "axios";
import { window } from "browser-monads";
import nprogress from "nprogress";
import { Hero, Snackbar } from "../components";
import { KEYWORDS } from "../constants";
import styles from "../styles/pages/contact";

const useStyles = makeStyles(styles);
const ReCAPTCHARef = createRef();
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export default () => {
  const inputLabel = useRef(null);
  const [labelWidth, setLabelWidth] = useState(0);
  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    subject: " ",
    message: ""
  });

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleChange = e => {
    e.persist();
    setInputs(inputs => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    nprogress.start();

    await ReCAPTCHARef.current.execute();
    await axios
      .post(
        "/api/contact",
        {
          ...inputs
        },
        config
      )
      .then(res => {
        nprogress.done();
        setOpen(true);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      })
      .catch(error => console.log(error));
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  const { name, email, subject, message } = inputs;
  const isValidated =
    name.length > 0 &&
    email.length > 0 &&
    subject.length > 3 &&
    message.length > 0;

  return (
    <>
      <Head>
        <title>Contacto | Daniel Esteves - Desarrollador Web Frontend</title>
        <meta
          name="description"
          content="Contacto de Daniel Esteves. Escríbeme para ejecutar tus más deseados proyectos de la mano de un profesional en el desarrollo web frontend. Responderé todas tus inquietudes lo más rápido posible."
          key="description"
        />
        <meta
          name="keywords"
          content={`Contacto, contacto de daniel esteves, contacto de danestves, ${KEYWORDS}`}
          key="keywords"
        />
        <meta
          property="og:title"
          content="Contacto | Daniel Esteves - Desarrollador Web Frontend"
          key="og:title"
        />
        <meta
          property="og:description"
          content="Contacto de Daniel Esteves. Escríbeme para ejecutar tus más deseados proyectos de la mano de un profesional en el desarrollo web frontend. Responderé todas tus inquietudes lo más rápido posible."
          key="og:description"
        />
        <meta
          name="twitter:title"
          content="Contacto | Daniel Esteves - Desarrollador Web Frontend"
          key="twitter:title"
        />
        <meta
          name="twitter:description"
          content="Contacto de Daniel Esteves. Escríbeme para ejecutar tus más deseados proyectos de la mano de un profesional en el desarrollo web frontend. Responderé todas tus inquietudes lo más rápido posible."
          key="twitter:description"
        />
        <meta
          name="twitter:image:alt"
          content="Contacto | Daniel Esteves - Desarrollador Web Frontend"
          key="twitter:image:alt"
        />
      </Head>
      <Hero img="/static/contact.jpg" title="Contacto" />
      <Snackbar
        open={open}
        handleClose={handleClose}
        message="Su mensaje ha sido enviado con éxito."
        variant="success"
      />
      <div className="container">
        <Grid container justify="center" spacing={2}>
          <Grid item xs={12}>
            <form
              name="contact"
              onSubmit={handleSubmit}
              className={classes.form}
            >
              <TextField
                label="Nombre"
                name="name"
                autoComplete="name"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />

              <TextField
                label="Correo"
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                required
              />

              <FormControl
                variant="outlined"
                className={classes.formControl}
                margin="normal"
                fullWidth
                required
              >
                <InputLabel ref={inputLabel} htmlFor="subject">
                  Asunto
                </InputLabel>
                <Select
                  value={inputs.subject}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      labelWidth={labelWidth}
                      name="subject"
                      id="subject"
                    />
                  }
                  required
                >
                  <MenuItem value=" " disabled selected>
                    <span
                      className={classes.defaultValueSelect}
                      id="helperSelect"
                    >
                      Ninguno
                    </span>
                  </MenuItem>
                  <MenuItem value="Actualización de sitio">
                    Actualización de sitio
                  </MenuItem>
                  <MenuItem value="Consulta">Consulta</MenuItem>
                  <MenuItem value="Cotización">Cotización</MenuItem>
                  <MenuItem value="Desarrollo de sitio">
                    Desarrollo de sitio
                  </MenuItem>
                  <MenuItem value="Desarrollo de tema en WordPress">
                    Desarrollo de tema en WordPress
                  </MenuItem>
                  <MenuItem value="Desarrollo de sitio con Gatsby">
                    Desarrollo de sitio con Gatsby
                  </MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Mensaje"
                name="message"
                multiline
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                fullWidth
                rows="4"
                required
              />
              <Typography
                variant="caption"
                component="small"
                className={classes.helperGoogle}
                id="helperGoogle"
              >
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
                and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </Typography>

              <ReCAPTCHA
                sitekey={process.env.RECAPTCHA_SITEKEY}
                size="invisible"
                ref={ReCAPTCHARef}
              />

              <div className={classes.actionButtons}>
                <Button variant="outlined" color="primary" type="reset">
                  Limpiar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!isValidated}
                >
                  Enviar
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
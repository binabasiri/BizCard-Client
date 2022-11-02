import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import './SignUp.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        BizCard
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    // marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passError, setPassError] = useState(false);
  const [confirmPassError, setConfirmPassError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, registerError, userInfo } = userLogin;

  const emailField = useRef();
  const passwordField = useRef();

  useEffect(() => {
    if (userInfo && userInfo.token) {
      history.push('/dashboard');
    }
  }, [userInfo, history]);

  const validateEmailAndPass = () => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(email)) {
      setEmailError(true);
    }

    if (password.length < 6) {
      setPassError(true);
    }

    return !emailError && !passError;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (validateEmailAndPass() && !confirmPassError) {
      dispatch(registerUser(email, password));
    }
  };

  return (
    <div className="SignUp__container">
      <Container component="main" maxWidth="xs" className="signInForm">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate onSubmit={submitHandler}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  error={emailError}
                  helperText={emailError ? 'Please enter a valid email' : ''}
                  ref={emailField}
                  onChange={(e) => {
                    setEmailError(false);
                    setEmail(e.target.value);
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  error={passError}
                  helperText={
                    passError ? 'Password must be at least 6 characters' : ''
                  }
                  ref={passwordField}
                  onChange={(e) => {
                    setPassError(false);
                    setPassword(e.target.value);
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={confirmPassword}
                  error={confirmPassError}
                  helperText={confirmPassError ? 'Passwords do not match ' : ''}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (password === e.target.value || e.target.value === '') {
                      setConfirmPassError(false);
                    } else {
                      setConfirmPassError(true);
                    }
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            {registerError && (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                style={{ marginBottom: '.5rem' }}
              >
                <Alert
                  severity="error"
                  variant="outlined"
                  style={{ backgroundColor: '#ff000012' }}
                >
                  <AlertTitle>Error</AlertTitle>
                  {registerError}
                </Alert>
              </Grid>
            )}
            {loading && (
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <CircularProgress></CircularProgress>
              </Grid>
            )}
            <Grid container justify="center">
              <Grid item>
                <Button
                  variant="text"
                  color="primary"
                  component={RouterLink}
                  to="/signin"
                >
                  Already have an account? Sign In
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}

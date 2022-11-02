import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { useLocation, useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';

import LogoPic from '../static/images/logo.png';
import './Header.css';

const useStyles = makeStyles((theme) => ({
  shadowRoot: {
    boxShadow:
      'rgba(0, 0, 0, 0.0) 0px 3px 3px -2px, rgba(0, 0, 0, 0.07) 0px 3px 4px 0px, rgba(0, 0, 0, 0.12) 0px 1px 8px 0px',
  },
  root: {
    flexGrow: 1,
    paddingTop: '7px',
    position: 'fixed',
    top: '0%',
    display: 'flex',
    width: '100vw',
    zIndex: '100',

    [theme.breakpoints.down('xl')]: {
      background:
        'linear-gradient(90deg,rgba(86, 182, 220, 1) 9%,rgba(49, 233, 129, 1) 100%)',
    },
  },

  appBar: {
    background: 'transparent',
    [theme.breakpoints.down('xl')]: {
      background:
        'linear-gradient(90deg,rgba(86, 182, 220, 1) 9%,rgba(49, 233, 129, 1) 100%)',
    },
    boxShadow: 'none',
    color: '#3d3d3d',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },

  button: {
    textTransform: 'none',
  },
}));

function Header() {
  const classes = useStyles();
  const location = useLocation();

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const history = useHistory();
  const logOutHandler = () => {
    dispatch(logoutUser());
    history.push('/signin');
  };

  if (location.pathname !== '/:cardUrlId') {
    return (
      <div
        className={`${classes.root} ${
          (location.pathname === '/dashboard' ||
            location.pathname === '/cards/new') &&
          classes.shadowRoot
        }`}
      >
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            {/* <Typography variant="h6" className={classes.title}>
							OneLink
						</Typography> */}
            <Box flexGrow={1}>
              <Link to="/">
                <img src={LogoPic} alt="Logo" className={'Header__logo'} />
              </Link>
            </Box>
            {userInfo && (
              <>
                <Button
                  color="inherit"
                  className={classes.button}
                  style={{ marginRight: '1rem' }}
                  component={Link}
                  to={'/dashboard'}
                >
                  Dashboard
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  onClick={logOutHandler}
                >
                  Log Out
                </Button>
              </>
            )}
            {!userInfo && (
              <>
                <Button
                  color="inherit"
                  className={classes.button}
                  style={{ marginRight: '1rem' }}
                  component={Link}
                  to={'/signin'}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  component={Link}
                  to={'/signup'}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return null;
  }
}

export default Header;

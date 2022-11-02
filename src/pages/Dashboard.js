import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Link as routerLink, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DashboardCard from '../components/DashboardCard';
import {
  getUserDetail,
  getUserCards,
  deleteFromUserCards,
} from '../actions/userActions';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '4rem',
    paddingTop: '1rem',
    paddingLeft: '2rem',
  },

  dashboardPage: {
    flexGrow: 1,
    background:
      'linear-gradient(90deg, rgba(14, 174, 223, 1) 9%, rgba(255, 12, 160, 1) 100%)',
    minHeight: '100vh',
  },
}));

function Dashboard() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [deleteCardId, setDeleteCardId] = useState('');
  const [snackBarError, setSnackBarError] = useState(false);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetail = useSelector((state) => state.userDetail);
  const { user } = userDetail;
  const detailLoading = userDetail.loading;
  const userDetailError = userDetail.error;
  const userCards = useSelector((state) => state.userCards);
  const cards = useSelector((state) => state.userCards.cards);
  const userCardsLoading = userCards.loading;
  const userCardsError = userCards.GETerror;
  const deleteError = userCards.DELETEerror;

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin');
    } else {
      if (!user) {
        dispatch(getUserDetail());
      }
    }
  }, [userInfo, history, dispatch, user]);

  useEffect(() => {
    if (user) {
      if (!cards) {
        dispatch(getUserCards(user.cards));
      }
    }
  }, [dispatch, user, cards]);

  const renderCards = (cards) => {
    return cards.map((card, i) => {
      const { name, title, views, picture, urlId, _id } = card;
      return (
        <DashboardCard
          key={i}
          name={name}
          title={title}
          views={views}
          picture={picture}
          urlId={urlId}
          id={_id}
          handleDeleteCard={handleDeleteCard}
        />
      );
    });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
    setSnackBarError(false);
  };

  const handleDeleteCard = (cardId) => {
    setDeleteCardId(cardId);
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteFromUserCards(deleteCardId));
    setDialogOpen(false);
    if (deleteError) {
      setSnackBarError(true);
    } else {
      setSnackBarOpen(true);
    }
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classes.dashboardPage}
    >
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="success">
          Card Deleted Successfuly
        </Alert>
      </Snackbar>
      <Snackbar
        open={snackBarError}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert onClose={handleSnackBarClose} severity="error">
          {deleteError}
        </Alert>
      </Snackbar>
      <Dialog
        PaperProps={{
          style: {
            minWidth: '300px',
            minHeight: '200px',
          },
        }}
        open={dialogOpen}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {userCardsLoading && (
          <CircularProgress
            style={{ color: '#3f6eb5', margin: 'auto' }}
          ></CircularProgress>
        )}

        {!userCardsLoading && (
          <>
            <DialogTitle id="alert-dialog-slide-title">
              {'Delete This Card?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to delete this card?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={handleConfirmDelete}>
                Yes
              </Button>
              <Button onClick={handleDialogClose} color="primary">
                No
              </Button>
            </DialogActions>
          </>
        )}
        {deleteError && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>check it out!</strong>
          </Alert>
        )}
      </Dialog>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        className={classes.root}
      >
        <Typography
          variant="h3"
          style={{
            fontWeight: '200',
            color: '#115293',
            borderBottom: '2px solid #f500578c',
          }}
        >
          Dashboard
        </Typography>
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: '1.2rem 0 2rem 0', minHeight: '50vh' }}
      >
        {cards &&
          cards.length !== 0 &&
          !detailLoading &&
          !userCardsLoading &&
          renderCards(cards)}
        {(detailLoading || userCardsLoading) && <CircularProgress />}
        {(userDetailError || userCardsError) && (
          <Alert
            severity="error"
            variant="outlined"
            style={{ backgroundColor: '#ff000012' }}
          >
            <AlertTitle>Error</AlertTitle>
            {userDetailError || userCardsError}
          </Alert>
        )}
        {!detailLoading && !userCardsLoading && (!cards || cards.length === 0) && (
          <Alert severity="info">
            You don't have any cards yet.
            <br />
            Please add cards by pressing the button below!
          </Alert>
        )}
      </Grid>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        style={{ padding: '2rem' }}
      >
        <Button
          variant="contained"
          color="primary"
          component={routerLink}
          to={'/cards/new'}
          size="large"
        >
          Add New Card
        </Button>
      </Grid>
    </Grid>
  );
}

export default Dashboard;

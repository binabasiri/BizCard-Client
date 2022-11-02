import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCardInfo } from '../actions/cardActions';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import TelegramIcon from '@material-ui/icons/Telegram';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LinkIcon from '@material-ui/icons/Link';
import NavigationIcon from '@material-ui/icons/Navigation';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// import avatarImage from "../static/images/avatar2.jpg";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CustomButton from '../components/CustomButton';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 320,
    minWidth: 320,
    borderRadius: 10,
    marginBottom: '.5rem',
    backgroundColor: 'white',
  },
  large: {
    marginLeft: '.5rem',
    width: 100,
    height: 100,
    marginBottom: '.5rem',
  },
  firstCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-begin',
    alignItems: 'center',
    paddingBottom: '.5rem',
    width: '100%',
    paddingTop: '.5rem',
  },

  nameTitle: {
    paddingLeft: '1rem',
    alignSelf: 'flex-end',
  },
});

const socialMediaIcons = createMuiTheme({
  palette: {
    primary: {
      main: '#0088cc',
    },
    secondary: {
      main: '#4B7F52',
      contrastText: '#fff',
    },

    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

  typography: {
    button: {
      textTransform: 'none',
    },

    fontFamily: [
      '"Poppins"',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

function OnelinkCard({ match }) {
  const classes = useStyles();
  const cardInfo = useSelector((state) => state.cardInfo.card);
  // const loading = useSelector((state) => state.cardInfo.loading);
  const error = useSelector((state) => state.cardInfo.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCardInfo(match.params.cardUrlId));
  }, [dispatch, match.params.cardUrlId]);

  // console.log(cardInfo);
  // console.log(match.params.cardUrlId);
  if (cardInfo.name) {
    const contactSection =
      cardInfo.whatsApp ||
      cardInfo.telegramId ||
      cardInfo.contactNumber ||
      cardInfo.email;

    const socialMediaSection =
      cardInfo.instagram ||
      cardInfo.twitter ||
      cardInfo.youtibe ||
      cardInfo.linkedIn;

    const linksSection = cardInfo.links.length > 0;
    const locationSection = cardInfo.locationAddress || cardInfo.locationLink;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{
          backgroundColor: '#f7f7f7',
          minHeight: '100vh',
          paddingTop: '1rem',
        }}
      >
        <Box className={classes.root} boxShadow={3} padding={1} margin={2}>
          <div className={classes.firstCard}>
            <Avatar src={cardInfo.picture} className={classes.large} />
            <div className={classes.nameTitle}>
              <Typography
                variant="h5"
                style={{ fontWeight: '500', marginBottom: '.3rem' }}
              >
                {cardInfo.name}
              </Typography>
              <Typography
                variant="h6"
                style={{ marginBottom: '.5rem', fontWeight: '300' }}
              >
                {cardInfo.title}
              </Typography>
            </div>
          </div>

          <Typography
            variant="body1"
            style={{ marginBottom: '.7rem', padding: '0 .5rem' }}
          >
            {cardInfo.description}
          </Typography>
        </Box>
        {contactSection && (
          <Box className={classes.root} boxShadow={3} padding={1} margin={2}>
            <Typography
              variant="h6"
              style={{
                fontWeight: '700',
                flexGrow: '1',
                marginRight: 'auto',
                marginLeft: '.5rem',
                marginBottom: '.2rem',
              }}
            >
              Contact
            </Typography>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
              style={{ marginBottom: '.9rem' }}
            >
              <ThemeProvider theme={socialMediaIcons}>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  startIcon={<WhatsAppIcon />}
                  style={{
                    margin: '.3rem',
                    textDecoration: 'none',
                    color: 'white',
                  }}
                  component={Link}
                  href={`https://wa.me/${cardInfo.whatsApp}`}
                >
                  WhatsApp
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<TelegramIcon />}
                  style={{
                    margin: '.3rem',
                    textDecoration: 'none',
                    color: 'white',
                  }}
                  component={Link}
                  href={`https://t.me/${cardInfo.telegramId}`}
                >
                  Telegram
                </Button>
              </ThemeProvider>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              xs={12}
              style={{ margin: '.2rem auto .9rem .5rem' }}
            >
              <Link
                href={`tel:${cardInfo.contactNumber}`}
                color="textPrimary"
                style={{ display: 'flex' }}
              >
                <PhoneIcon style={{ marginRight: '.5rem' }}></PhoneIcon>
                <Typography variant="body1">
                  {cardInfo.contactNumber}
                </Typography>
              </Link>
            </Grid>
            <Grid
              item
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              xs={12}
              style={{ margin: '0 auto .8rem .5rem' }}
            >
              <Link
                href={`mailto:${cardInfo.email}`}
                color="textPrimary"
                style={{ display: 'flex' }}
              >
                <MailIcon style={{ marginRight: '.5rem' }}></MailIcon>
                <Typography variant="body1">{cardInfo.email}</Typography>
              </Link>
            </Grid>
          </Box>
        )}
        {socialMediaSection && (
          <Box className={classes.root} boxShadow={3} padding={1} margin={2}>
            <Typography
              variant="h6"
              style={{
                fontWeight: '700',
                flexGrow: '1',
                marginRight: 'auto',
                marginLeft: '.5rem',
                marginBottom: '.2rem',
              }}
            >
              Socia Media
            </Typography>
            <Grid
              item
              container
              direction="row"
              justify="center"
              alignItems="center"
              xs={12}
              style={{ marginBottom: '.5rem' }}
            >
              {cardInfo.instagram && (
                <CustomButton
                  color="#E1306C"
                  href={`https://www.instagram.com/${cardInfo.instagram}`}
                >
                  <InstagramIcon fontSize="large" />
                </CustomButton>
              )}
              {cardInfo.twitter && (
                <CustomButton
                  color="#00acee"
                  href={`https://twitter.com/${cardInfo.twitter}`}
                >
                  <TwitterIcon fontSize="large" />
                </CustomButton>
              )}
              {cardInfo.youtube && (
                <CustomButton color="#FF0000" href={cardInfo.youtube}>
                  <YouTubeIcon fontSize="large" />
                </CustomButton>
              )}
              {cardInfo.linkedIn && (
                <CustomButton color="#0e76a8" href={cardInfo.linkedIn}>
                  <LinkedInIcon fontSize="large" />
                </CustomButton>
              )}
            </Grid>
          </Box>
        )}
        {linksSection && (
          <Box className={classes.root} boxShadow={3} padding={1} margin={2}>
            <Typography
              variant="h6"
              style={{
                fontWeight: '700',
                flexGrow: '1',
                marginRight: 'auto',
                marginLeft: '.5rem',
                marginBottom: '.5rem',
              }}
            >
              Links
            </Typography>
            {cardInfo.links.map((link, i) => {
              return (
                <Grid
                  key={i}
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  xs={12}
                  style={{ margin: '0 auto .6rem .5rem' }}
                >
                  <Button
                    variant="text"
                    color="default"
                    href={link.url}
                    startIcon={<LinkIcon />}
                  >
                    {link.name}
                  </Button>
                </Grid>
              );
            })}
          </Box>
        )}
        {locationSection && (
          <Box
            className={classes.root}
            boxShadow={3}
            padding={1}
            margin={2}
            style={{ marginBottom: '2rem' }}
          >
            <Typography
              variant="h6"
              style={{
                fontWeight: '700',
                flexGrow: '1',
                marginRight: 'auto',
                marginLeft: '.5rem',
                marginBottom: '.5rem',
              }}
            >
              Location
            </Typography>
            {cardInfo.locationAddress && (
              <Typography
                variant="body1"
                style={{
                  marginBottom: '.7rem',
                  padding: '0 .5rem',
                  marginRight: 'auto',
                }}
              >
                {cardInfo.locationAddress}
              </Typography>
            )}

            {cardInfo.locationLink && (
              <Grid
                item
                container
                direction="row"
                justify="center"
                alignItems="center"
                xs={12}
                style={{ marginBottom: '.9rem', marginTop: '.5rem' }}
              >
                <Button
                  variant="contained"
                  color="default"
                  href={cardInfo.locationLink}
                  startIcon={<NavigationIcon />}
                >
                  {'Navigate To Address'}
                </Button>
              </Grid>
            )}
          </Box>
        )}
        <Box my={1}>
          <Typography variant="body2" color="textSecondary" align="center">
            {'Created by '}
            <Link color="primary" href="https://one--link.herokuapp.com/">
              BizCard
            </Link>{' '}
          </Typography>
        </Box>
      </Grid>
    );
  } else if (error) {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ backgroundColor: '#f7f7f7', height: '100vh' }}
      >
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      </Grid>
    );
  } else {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ backgroundColor: '#f7f7f7', height: '100vh' }}
      >
        <CircularProgress></CircularProgress>
      </Grid>
    );
  }
}

export default OnelinkCard;

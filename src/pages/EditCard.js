import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Alert, AlertTitle } from '@material-ui/lab';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import TwitterIcon from '@material-ui/icons/Twitter';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import DeleteIcon from '@material-ui/icons/Delete';
import LinkIcon from '@material-ui/icons/Link';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import {
  getUserDetail,
  getUserCards,
  editFromUserCards,
} from '../actions/userActions';
import Dialog from '@material-ui/core/Dialog';
import axios from 'axios';
import { Avatar } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '6rem',
    paddingTop: '1rem',
    paddingLeft: '2rem',
    marginBottom: '2rem',
  },

  dashboardPage: {
    flexGrow: 1,
    background:
      'linear-gradient(90deg,rgba(86, 182, 220, 1) 9%,rgba(49, 233, 129, 1) 100%)',
    minHeight: '100vh',
  },
}));

function EditCard({ match }) {
  const history = useHistory();
  const classes = useStyles();

  const error = useSelector((state) => state.userCards.EDITerror);
  const userInfo = useSelector((state) => state.userLogin.userInfo);
  const userDetail = useSelector((state) => state.userDetail);
  const cards = useSelector((state) => state.userCards.cards);

  const { user } = userDetail;
  const [cardToEdit, setcardToEdit] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [urlId, setUrlId] = useState('');
  const [urlIdError, setUrlIdError] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [whatsApp, setWhatsApp] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [email, setEmail] = useState('');
  const [twitter, setTwitter] = useState('');
  const [instagram, setInstagram] = useState('');
  const [youtube, setYoutube] = useState('');
  const [linkedIn, setLinkedIn] = useState('');
  const [locationAddress, setLocationAddress] = useState('');
  const [locationLink, setLocationLink] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [linkDescription, setLinkDescription] = useState('');
  const [links, setLinks] = useState([]);
  const [linkError, setLinkError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [locationLinkError, setLocationLinkError] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (cards && cards.length > 0) {
      const selectedCard = cards.find((card) => {
        return card._id === match.params.cardid;
      });

      setcardToEdit(selectedCard);
    }

    return () => {
      setcardToEdit({});
    };
  }, [cards, match.params.cardid]);

  useEffect(() => {
    const setOldValues = () => {
      const {
        urlId,
        name,
        title,
        picture,
        whatsApp,
        telegramId,
        contactNumber,
        instagram,
        twitter,
        youtube,
        linkedIn,
        links,
        description,
        email,
        locationAddress,
        locationLink,
      } = cardToEdit;
      setUrlId(urlId);
      setName(name);
      setTitle(title);
      setImage(picture ? picture : '');
      setWhatsApp(whatsApp ? whatsApp : '');
      setTelegramId(telegramId ? telegramId : '');
      setContactNumber(contactNumber ? contactNumber : '');
      setInstagram(instagram ? instagram : '');
      setTwitter(twitter ? twitter : '');
      setYoutube(youtube ? youtube : '');
      setLinkedIn(linkedIn ? linkedIn : '');
      setLinks(links ? links : []);
      setDescription(description ? description : '');
      setEmail(email ? email : '');
      setLocationAddress(locationAddress ? locationAddress : '');
      setLocationLink(locationLink ? locationLink : '');
    };

    if (cardToEdit && cardToEdit.name) {
      setOldValues();
    }
  }, [cardToEdit]);

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
      if (!cards || cards.length === 0) {
        dispatch(getUserCards(user.cards));
      }
    }
  }, [dispatch, user, cards]);

  useEffect(() => {
    const checkUrlId = async () => {
      if (urlId && urlId !== cardToEdit.urlId) {
        let expression = /^[A-Za-z_-][A-Za-z0-9_-]*$/gi;
        let regex = new RegExp(expression);
        if (regex.test(urlId)) {
          const response = await axios.get(`/api/cards/idexists/${urlId}`);
          setUrlIdError(
            response.data.result
              ? 'This URL already exists please choose a different one'
              : ''
          );
        } else {
          setUrlIdError(
            'You can only use letters, numbers, - and _ for your Card URL'
          );
        }
      }
    };

    checkUrlId();
  }, [urlId, cardToEdit.urlId]);

  const renderLinks = () => {
    return links.map((link, i) => {
      return (
        <div key={i}>
          <Button
            variant="text"
            color="default"
            href={link.url}
            style={{ marginRight: '.7rem' }}
            startIcon={<LinkIcon />}
          >
            {link.name}
          </Button>
          <IconButton
            aria-label="delete link"
            onClick={() => {
              handleDeleteLink(link.url);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      );
    });
  };

  const handleDeleteLink = (linkUrl) => {
    const newLinks = links.filter((link) => {
      return link.url !== linkUrl;
    });

    setLinks(newLinks);
  };

  const handleAddLink = () => {
    let expression =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    let regex = new RegExp(expression);
    if (regex.test(linkUrl) && linkDescription) {
      const link = {
        url: linkUrl,
        name: linkDescription,
      };
      setLinks([...links, link]);
      setLinkUrl('');
      setLinkDescription('');
      return;
    }

    if (!regex.test(linkUrl)) {
      setLinkError(true);
    }

    if (!linkDescription) {
      setDescriptionError(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && title && !urlIdError) {
      const formData = {
        owner: cardToEdit.owner,
        urlId,
        picture: image,
        name,
        title,
        whatsApp,
        telegramId,
        contactNumber,
        instagram,
        twitter,
        youtube,
        linkedIn,
        links,
        description,
        email,
        locationAddress,
        locationLink,
      };
      setLoading(true);
      setDialogOpen(true);
      await dispatch(editFromUserCards(formData, cardToEdit._id));
      setLoading(false);
      if (!error) {
        setTimeout(() => {
          history.push('/dashboard');
        }, 1800);
      }
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <Grid
      container
      justify="flex-start"
      alignItems="center"
      direction="column"
      className={classes.dashboardPage}
    >
      <Dialog
        PaperProps={{
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minWidth: '300px',
            minHeight: '100px',
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        }}
        open={dialogOpen}
        // TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        {loading && (
          <CircularProgress style={{ color: '#3f6eb5' }}></CircularProgress>
        )}

        {!loading && !error && (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Changes saved successfuly —{' '}
            <strong>
              check it out in your{' '}
              <Link style={{ color: 'inherit' }} to="/dashboard">
                dashboard!
              </Link>
            </strong>
          </Alert>
        )}

        {error && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
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
          Create New Card
        </Typography>
      </Grid>
      <Grid container direction="row" justify="center" alignItems="center">
        <Avatar
          src={image}
          style={{
            boxShadow: '0 0 25px rgb(0 0 0 / 22%)',
            color: '#3f51b5',
            background:
              'linear-gradient(90deg,rgba(86, 182, 220, 1) 9%,rgba(49, 233, 129, 1) 100%)',
            marginRight: '1.5rem',
            width: 100,
            height: 100,
            marginBottom: '.5rem',
          }}
        />
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          onChange={handleUpload}
          multiple
          type="file"
        />
        <label htmlFor="raised-button-file">
          <Button
            startIcon={<CloudUploadIcon />}
            variant="outlined"
            color="primary"
            component="span"
            className={classes.button}
          >
            Upload
          </Button>
        </label>
        {uploading && (
          <CircularProgress style={{ marginLeft: '1.5rem' }}></CircularProgress>
        )}
      </Grid>

      <form
        onSubmit={handleSubmit}
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          overflowY: 'hidden',
        }}
      >
        <Grid
          spacing={3}
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ padding: '1.2rem 1rem 2rem 1rem', maxWidth: '90vw' }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              value={name}
              helperText={"Enter your name or your company's name"}
              onChange={(e) => {
                setName(e.target.value);
              }}
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={title}
              helperText="For example, Web Developer or Lawyer"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              variant="outlined"
              required
              fullWidth
              name="title"
              label="Title"
              type="title"
              id="title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={description}
              helperText={'A brief description about you or your business'}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="description"
              label="Description"
              type="text"
              id="description"
              multiline
              rows={2}
              rowsMax={4}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={urlId}
              error={Boolean(urlIdError)}
              helperText={
                urlIdError
                  ? urlIdError
                  : `Your card would be available at: one.link/card/${
                      urlId ? urlId : 'CardURL'
                    }`
              }
              onChange={(e) => {
                setUrlId(e.target.value.toLocaleLowerCase());
              }}
              variant="outlined"
              required
              fullWidth
              name="urlId"
              label="Card URL"
              type="urlId"
              id="urlId"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="h4"
              style={{
                fontWeight: '400',
                flexGrow: '1',
                marginTop: '1.4rem',
                marginRight: 'auto',
                marginLeft: '.5rem',
              }}
            >
              Contact Info
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              value={contactNumber}
              onChange={(e) => {
                setContactNumber(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="contactNumber"
              label="Contact Number"
              id="contactNumber"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={whatsApp}
              helperText="Enter your whatsapp number with country extension for example for Canada: 16476751234"
              onChange={(e) => {
                setWhatsApp(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="whatsapp"
              label="WhatsApp Number"
              type="whatsapp"
              id="whatsapp"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              helperText="Enter only your telegram Id (without @)"
              value={telegramId}
              onChange={(e) => {
                setTelegramId(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="telegramId"
              label="Telegram ID"
              type="telegramId"
              id="telegramId"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="h4"
              style={{
                fontWeight: '400',
                flexGrow: '1',
                marginTop: '1.4rem',
                marginRight: 'auto',
                marginLeft: '.5rem',
              }}
            >
              Social Media
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={instagram}
              helperText={'Enter your Instagram account username'}
              onChange={(e) => {
                setInstagram(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="instagram"
              label={
                <Box direction="row" display="flex">
                  <div>Instagram</div>
                  <InstagramIcon
                    style={{
                      fontSize: '1.1rem',
                      paddingLeft: '.5rem',
                      marginRight: '-.55rem',
                    }}
                  />
                </Box>
              }
              id="instagram"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={youtube}
              helperText={'Enter your youtube account URL'}
              onChange={(e) => {
                setYoutube(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="youtube"
              label={
                <Box direction="row" display="flex">
                  <div>Youtube</div>
                  <YouTubeIcon
                    style={{
                      fontSize: '1.1rem',
                      paddingLeft: '.5rem',
                      marginRight: '-.55rem',
                    }}
                  />
                </Box>
              }
              id="youtube"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={twitter}
              helperText={'Enter your twitter account username (without @)'}
              onChange={(e) => {
                setTwitter(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="twitter"
              label={
                <Box direction="row" display="flex">
                  <div>Twitter</div>
                  <TwitterIcon
                    style={{
                      fontSize: '1.1rem',
                      paddingLeft: '.5rem',
                      marginRight: '-.55rem',
                    }}
                  />
                </Box>
              }
              id="twitter"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={linkedIn}
              helperText={'Enter your Linkedin account URL'}
              onChange={(e) => {
                setLinkedIn(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="linkedIn"
              label={
                <Box direction="row" display="flex">
                  <div>Linkedin</div>
                  <LinkedInIcon
                    style={{
                      fontSize: '1.1rem',
                      paddingLeft: '.5rem',
                      marginRight: '-.55rem',
                    }}
                  />
                </Box>
              }
              id="linkedIn"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="h4"
              style={{
                fontWeight: '400',
                flexGrow: '1',
                marginTop: '1.4rem',
                marginRight: 'auto',
                marginLeft: '.5rem',
              }}
            >
              Related Links
            </Typography>
          </Grid>
          {links.length > 0 && (
            <Grid
              container
              item
              xs={12}
              style={{ paddingTop: '.2rem' }}
              direction="column"
            >
              {renderLinks()}
            </Grid>
          )}

          <Grid item xs={12} sm={5}>
            <TextField
              error={linkError}
              helperText={linkError ? 'Please enter a valid URL' : ''}
              value={linkUrl}
              onChange={(e) => {
                setLinkError(false);
                setLinkUrl(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="linkUrl"
              label="Link URL"
              id="linkUrl"
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              error={descriptionError}
              helperText={
                descriptionError
                  ? 'Please enter a description for the link'
                  : ''
              }
              value={linkDescription}
              onChange={(e) => {
                setDescriptionError(false);
                setLinkDescription(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="linkDescription"
              label="Link Description"
              type="linkDescription"
              id="linkDescription"
            />
          </Grid>
          <Grid item container xs={12} sm={2} justify="center">
            <Button
              color="secondary"
              variant="outlined"
              onClick={handleAddLink}
            >
              Add Link
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography
              color="textSecondary"
              variant="h4"
              style={{
                fontWeight: '400',
                flexGrow: '1',
                marginTop: '1.4rem',
                marginRight: 'auto',
                marginLeft: '.5rem',
              }}
            >
              Location
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={locationAddress}
              onChange={(e) => {
                setLocationAddress(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="locationAddress"
              label="Location Address"
              id="locationAddress"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              error={locationLinkError}
              helperText={
                locationLinkError
                  ? 'Please enter a valid URL'
                  : 'Copy your Location URL from google maps and paste it here'
              }
              value={locationLink}
              onChange={(e) => {
                setLocationLinkError(false);
                setLocationLink(e.target.value);
              }}
              variant="outlined"
              fullWidth
              name="locationLink"
              label="Location Link"
              type="locationLink"
              id="locationLink"
            />
          </Grid>
          <Grid item container justify="center" xs={12}>
            <Button
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default EditCard;

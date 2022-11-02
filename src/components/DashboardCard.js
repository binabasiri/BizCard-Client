import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Link as routerLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import './DashboardCard.css';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '0 .5rem',
  },
  firstCard: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '.5rem',
    width: '100%',
    paddingTop: '.5rem',
  },

  large: {
    marginLeft: '.5rem',
    width: 100,
    height: 100,
    marginBottom: '.5rem',
  },
}));

function DashboardCard({
  name,
  title,
  views,
  picture,
  urlId,
  id,
  handleDeleteCard,
}) {
  const classes = useStyles();

  return (
    <Box boxShadow={3} margin={2} className="DashboardCard">
      <Grid container direction="column">
        <Grid item xs={12} style={{ padding: '0 1rem .5rem 1rem' }}>
          <div className={classes.firstCard}>
            <Avatar
              src={picture}
              className={classes.large}
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
            <div>
              <Typography
                variant="h5"
                style={{ fontWeight: '500', marginBottom: '.3rem' }}
              >
                {name}
              </Typography>
              <Typography
                variant="h6"
                style={{
                  marginBottom: '.5rem',
                  fontWeight: '300',
                  lineHeight: '1.1',
                }}
              >
                {title}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          style={{ paddingBottom: '.5rem' }}
          container
          item
          xs={12}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Typography
            variant="h5"
            style={{ fontWeight: '500', marginBottom: '.8rem' }}
          >
            {`Views: ${views}`}
          </Typography>
        </Grid>
        <Grid
          style={{ paddingBottom: '.5rem' }}
          container
          item
          xs={12}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="primary"
            component={routerLink}
            to={`/card/${urlId}`}
            size="small"
            className={classes.button}
          >
            View Card
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={routerLink}
            to={`/cards/edit/${id}`}
            size="small"
            className={classes.button}
          >
            Edit Card
          </Button>
          <Button
            variant="contained"
            color="default"
            onClick={() => {
              handleDeleteCard(id);
            }}
            size="small"
            className={classes.button}
            endIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardCard;

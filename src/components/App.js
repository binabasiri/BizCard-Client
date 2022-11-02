import './App.css';
import { Fragment, useEffect } from 'react';
import Header from './Header';
import Dashboard from '../pages/Dashboard';
import EditCard from '../pages/EditCard';
import LandingPage from '../pages/LandingPage';
import NewCard from '../pages/NewCard';
import OnelinkCard from '../pages/OnelinkCard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import ReactGA from 'react-ga'; //Google Analytics
import { createBrowserHistory } from 'history';

let theme = createMuiTheme({
  typography: {
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
    button: {
      textTransform: 'none',
    },
  },
  palette: {
    secondary: { main: '#188c50' },
  },
});

theme = responsiveFontSizes(theme);

function App() {
  const history = createBrowserHistory();

  // Initialize google analytics page view tracking
  history.listen((location) => {
    ReactGA.initialize('UA-187203967-1');
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter history={history}>
          <div>
            <Switch>
              <Route path="/card/:cardUrlId" exact component={OnelinkCard} />
              <Fragment>
                <Header className="App__Header"></Header>
                <Route path="/" exact component={LandingPage} />
                <Route path="/signin" exact component={SignIn} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/cards/new" exact component={NewCard} />
                <Route path="/cards/edit/:cardid" exact component={EditCard} />
              </Fragment>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;

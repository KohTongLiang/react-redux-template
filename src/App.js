// node modules
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'

// Components
import NavigationBar from './Components/Navigation'
import HomePage from './Components/Home'
import ArticlePage from './Components/Article'
import SignInPage from './Components/Auth/signin'
import SignUpPage from './Components/Auth/signup'
import Auth from './Components/Auth'

// Constants
import * as ROUTES from './Constants/routes'

function App(props) {
  // Allow google dark theme
  const theme = React.useMemo(
    () => createMuiTheme({
      palette: {
        type: true ? 'dark' : 'light',
      },
    }),
  );  

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
        <Auth />
          <NavigationBar />
          <Route exact path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ARTICLES} component={ArticlePage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        </Router>
        <CssBaseline />
      </ThemeProvider>
    </div>
  );
}

export default App;
// export default connect(null, mapDispatchToProps)(App);

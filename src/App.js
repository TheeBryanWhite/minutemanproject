// Whenever you want to use Emotion, you have to include the following two lines and the import on line 4
/** @jsxRuntime classic */
/** @jsx jsx */
import { 
  css,
  Global,
  jsx
} from '@emotion/react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

// Everything above this comment are React-related libraries and their imported components, which are used in the 
// return method below. Everything below this comment is imported components that I made.

import Header from './components/header';
import { 
  Login,
  ForgotPassword,
  PasswordSent,
  Register,
  ResetPassword,
  SendVerificationEmail
} from './components/user-forms/';
import { FrontEndWrapper } from './components/frontend'
import { MMPAdmin } from './components/mmp-admin/';

// The App component is the root component for the entire app. It contains all of the child components that
// make up the, you know, app. 

const App = () => {
  return (
    <div className="App">
      {/* 
      The Global component is part of the Emotion library. You use it set a few global styles like the stuff 
      you see below. I also just learned that there's a reset component that's basically like a reset.css file
      but I obviously haven;t included it here.
      */}
      <Global
        styles={
          css`
            body,
            button {
              font-family: "Open Sans", Helvetica, Arial, sans-seriff;
            }

            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              font-family: "Open Sans", Helvetica, Arial, sans-seriff;
              font-weight: 600;
            }

            ul {
              list-style: none;
              margin: 0;
              margin-block-start: 1em;
              margin-block-end: 1em;
              padding: 0;
            }

            a {
              text-decoration: none;
            }

            button {
              font-size: 1rem;
            }
          `
        }
      />
      <Header />
      <main>
        {/* 
        The Router component is is a wrapper that determines which components the router object is available in. 
        Anything outside of this component will not have access to the router object.

        The Switch component is basically a listener for the current URL. If you navigate to one of the paths in the list
        below, it triggers an event that swaps out the mounted component. 

        So if we're at /, the router loads a component called FrontEndWrapper. If you navigate to /register, it un-mounts
        FrontEndWrapper and mounts the Register component. You have to make sure that these components are included at the
        head of the document above.
        */}
        <Router>
          <Switch>
            <Route path="/" component={FrontEndWrapper} />
            <Route path="/register" component={Register} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/reset-password" component={ResetPassword} />
            <Route path="/send-verification" component={SendVerificationEmail} />
            <Route path="/password-sent" component={PasswordSent} />
            <Route path="/mmp-admin" component={MMPAdmin} />
            <Route path="/adm-lgin" component={Login} />
          </Switch>
        </Router>
      </main>
    </div>
  );
}

export default App;

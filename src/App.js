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
import Header from './components/header';
import { 
  Login,
  ForgotPassword,
  PasswordSent,
  Register,
  ResetPassword,
  SendVerificationEmail
} from './components/user-forms/';
import {
  FrontEndWrapper
} from './components/frontend'
import { MMPAdmin } from './components/mmp-admin/';

const App = () => {
  return (
    <div className="App">
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

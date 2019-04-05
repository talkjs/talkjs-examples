import * as React from 'react';

import { Router, Route, Switch } from 'react-router-dom';

import * as Loadable from 'react-loadable';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import routerHistory from '../../shared/router-history/router-history';

import Loading from 'src/pages/Loading/LoadingPage';
import NavbarContainer from 'src/components/Navbar/NavbarContainer';
import GuestRoute from '../GuestRoute/GuestRoute';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

const Home = Loadable({ loader: () => import('../../pages/Home/HomePageContainer'), loading: Loading });
const Login = Loadable({ loader: () => import('../../pages/Login/LoginPageContainer'), loading: Loading });
const ProductList = Loadable({ loader: () => import('../../pages/ProductList/ProductListPageContainer'), loading: Loading });
const ProductPage = Loadable({ loader: () => import('../../pages/Product/ProductPageContainer'), loading: Loading });
const UserList = Loadable({ loader: () => import('../../pages/UserList/UserListPageContainer'), loading: Loading });
const UserProfile = Loadable({ loader: () => import('../../pages/UserProfile/UserProfilePageContainer'), loading: Loading });
const InboxPage = Loadable({ loader: () => import('../../pages/Inbox/InboxPageContainer'), loading: Loading });
const Error404 = Loadable({ loader: () => import('../../pages/Error404/Error404Page'), loading: Loading });

interface DefaultProps { 
  hasLoggedInUser: boolean,
  isLoadingAuthentication: boolean
}

class App extends React.Component<DefaultProps, object> {

  public render() {
    const defaultProtectedRouteProps = {
      isAuthenticated: this.props.hasLoggedInUser,
      isLoadingAuthentication: this.props.isLoadingAuthentication,
      redirectionPath: '/login'
    }

    return (
      <div>
        <Router history={routerHistory}>
          <div>
            <header className="navbar">
              <NavbarContainer />
            </header>
            <div id="body-content">
              <Switch>
                <Route exact path="/" component={Home} />
                <GuestRoute {...defaultProtectedRouteProps} redirectionPath={'/'} exact path="/login" component={Login} />
                <ProtectedRoute {...defaultProtectedRouteProps} exact path="/products" component={ProductList} />
                <ProtectedRoute {...defaultProtectedRouteProps} path="/products/:id" component={ProductPage} />
                <ProtectedRoute {...defaultProtectedRouteProps} exact path="/users" component={UserList} />
                <ProtectedRoute {...defaultProtectedRouteProps} path="/users/:id" component={UserProfile} />
                <ProtectedRoute {...defaultProtectedRouteProps} path="/inbox" component={InboxPage} />
                <Route component={Error404} />
              </Switch>
            </div>
          </div>
        </Router>
        <ToastContainer />
      </div>
    );
  }
}

export default App;

import * as React from 'react';

import { RouteProps, Route, Redirect } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../pages/Loading/LoadingPage';

export interface ProtectedRouteProps extends RouteProps {
    isAuthenticated: boolean,
    isLoadingAuthentication: boolean,
    redirectionPath: string;
}

class ProtectedRoute extends Route<ProtectedRouteProps> {
    
    public render() {
        if (this.props.isLoadingAuthentication) {
            return <Loading />
        }

        if (!this.props.isAuthenticated) {
            toast.warn('Please log in first.', {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }

        if (this.props.isAuthenticated) {
            return <Route {...this.props}/>;
        } else {
            const renderComponent = () => (<Redirect to={{pathname: this.props.redirectionPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        }
    }
}

export default ProtectedRoute;
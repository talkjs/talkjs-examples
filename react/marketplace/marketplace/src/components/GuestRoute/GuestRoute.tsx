import * as React from 'react';

import { RouteProps, Route, Redirect } from 'react-router';
import Loading from '../../pages/Loading/LoadingPage';

interface GuestRouteProps extends RouteProps {
    isAuthenticated: boolean,
    isLoadingAuthentication: boolean,
    redirectionPath: string;
}

class GuestRoute extends Route<GuestRouteProps> {
    
    public render() {
        if (this.props.isLoadingAuthentication) {
            return <Loading />
        }

        if (this.props.isAuthenticated) {
            const renderComponent = () => (<Redirect to={{pathname: this.props.redirectionPath}}/>);
            return <Route {...this.props} component={renderComponent} render={undefined}/>;
        } else {
            return <Route {...this.props}/>;
        }
    }
}

export default GuestRoute;
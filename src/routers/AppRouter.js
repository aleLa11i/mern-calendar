import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router,Redirect} from 'react-router-dom';
import { Checking } from '../actions/auth';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { AuthRouter } from './AuthRouter';
import { PrivateRoute } from './PrivateRoute';
import { PubliceRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const {name}= useSelector(state => state.auth)
    useEffect(() => {
        
        dispatch(Checking());

    }, [dispatch])

    return (
        <div>
            <Router>
                    <PubliceRoute path="/auth" component={ AuthRouter } isAuthenticated={ !!name } />
                    <PrivateRoute exact path="/" component={ CalendarScreen } isAuthenticated={ !!name }/>

                    <Redirect to="/" />
            </Router>
        </div>
    )
}

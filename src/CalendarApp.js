import React from 'react';
import { Provider } from 'react-redux';
import { AppRouter } from './routers/AppRouter';
import { store } from './Store';

export const CalendarApp = () => {
    return (
        <div>
            <Provider store={ store }>
                <AppRouter />
            </Provider>
        </div>
    )
}
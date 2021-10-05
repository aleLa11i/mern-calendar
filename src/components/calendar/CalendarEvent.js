import moment from 'moment';
import React from 'react';

export const CalendarEvent = ({event}) => {

    const {title,user,notes,start,end} = event;
    const startDate = moment(start).format("h:mm:ss a")
    const endDate = moment(end).format("h:mm:ss a")
    return (
        <div>
            <div>
                <h3>{ title }</h3>
            </div>
            <div>
                <h6>{ notes }</h6>
            </div>
            <div>
                <small> -- { user.name }</small>
            </div>
            <div>
                <small>{`${startDate}-${endDate}`}</small>
            </div>
        </div>
    )
}

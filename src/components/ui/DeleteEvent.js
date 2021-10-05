import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanActiveEvent, eventStartDelete } from '../../actions/events';

export const DeleteEvent = () => {
    const {activeEvent} = useSelector(state => state.calendar);
    const dispatch = useDispatch();
    const handleInputClick = () => {
        dispatch(eventStartDelete(activeEvent));
        dispatch(cleanActiveEvent());
    }

    return (
        <div>
        {
            (activeEvent)&&(<button
                className="btn btn-danger fab"
                onClick={ handleInputClick }
            >
                <i className="far fa-plus">Eliminar evento</i>   
            </button>)
        }
        </div>
    )
}

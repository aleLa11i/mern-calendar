import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/modal';

export const AddNewEvent = () => {

    const {activeEvent} = useSelector(state => state.calendar)
    const dispatch = useDispatch();
    const handleInputClick = () => {
        dispatch(openModal());
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleInputClick }
        >   
            {
                (activeEvent)?
                (<i className="far fa-plus">Editar evento </i>):   
                (<i className="far fa-plus">Agregar nuevo evento </i>)   
            }
        </button>
    )  
}

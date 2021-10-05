import React,{useEffect, useState} from 'react';
import {Calendar, momentLocalizer} from "react-big-calendar";
import moment from 'moment';
import { Navbar } from '../ui/Navbar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "moment/locale/es"
import { CalendarEvent } from './CalendarEvent';
import {messages} from '../../helpers/calendar-messages';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../actions/modal';
import { cleanActiveEvent, eventStartLoading, setActiveEvent } from '../../actions/events';


moment.locale("es");

export const CalendarScreen = () => {

    const {uid} = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const calendar = useSelector(state => state.calendar)
    const [lastView, setLastView] = useState(localStorage.getItem("LastView") || "month");
    const localizer = momentLocalizer(moment);
    
    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    const onDoubleClickEvent = (e) => {
        dispatch(openModal()); 
    }

    const onSelectEvent = (e) => {
        dispatch(setActiveEvent(e));
    }

    const onView = (e) => {
        setLastView(e);
        localStorage.setItem("LastView",e);
    }

    const onSelectSlot = (e) => {
        dispatch(cleanActiveEvent());
    }
    const eventStyleGetter = (event) => {
            const style = {backgroundColor:( uid === event.user.uid )? "#196F3D" : "#ABB2B9"}
            return { style }
        }
    
    return (
        <div className="calendar-screen">
            <Navbar />
            <Calendar 
                localizer={ localizer }
                events={ calendar.events }
                stasrtAccessor="start"
                endAccessor="end"
                messages={ messages }
                components={{
                    event: CalendarEvent
                }}
                onDoubleClickEvent={ onDoubleClickEvent }
                eventPropGetter={ eventStyleGetter }
                onSelectEvent={ onSelectEvent }
                onView={ onView }
                view={ lastView }
                selectable={true}
                onSelectSlot={onSelectSlot}
            />

            <CalendarModal />
        </div>
    )
}

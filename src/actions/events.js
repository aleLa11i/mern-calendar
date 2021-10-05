import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { toDate } from "../helpers/toDate";

export const eventStartAddNew = (event) => { 
    return async  (dispatch) => {

        try {
            
            const resp = await fetchWithToken("events/" , event, "POST" )
            const body = await resp.json()
                           
            if(body.ok){

                event.id = body.event._id
                event.user = body.event.user
                

                dispatch(eventAddNew(event));
            }

        } catch (error) {
            console.log(error)
        }
    }
};
export const eventStartLoading = () => {
    return async  (dispatch) => {
        try {
            
            const resp = await fetchWithToken("events/" , null , "GET" )
            const body = await resp.json()
                          
            if(body.ok){

                const events = toDate(body.events)
                dispatch(eventsLoading(events));
            }

        } catch (error) {
            console.log(error)
        }
    }
}
export const eventStartUpdate = (event) => {
    return async  (dispatch) => {
        try {
            
            const resp = await fetchWithToken(
                `events/${event.id}`, 
                event , 
                "PUT" );
            const body = await resp.json();
                         
            if(body.ok){
                
                dispatch(eventUpdate(event));
            }
            else
            {
                Swal.fire("Error",body.msg,"error")
            }

        } catch (error) {
            console.log(error);
        }
    }
}
export const eventStartDelete = (event) => {
    return async (dispatch) => {
        try {
            
            const resp = await fetchWithToken(
                `events/${event._id}`, 
                null , 
                "DELETE" );
            const body = await resp.json();        
            if(body.ok){
                dispatch(eventDelete(event));
            }
            else
            {
                Swal.fire("Error",body.msg,"error")
            }

        } catch (error) {
            console.log(error);
        }
    }
}


export const setActiveEvent = (event) => ({
    type: "Set Active Event",
    payload: event,
});
export const cleanActiveEvent = () => ({ type: "Clean Active Event" });


const eventAddNew = (event) => ({
    type: "Add New Event",
    payload: event
});

const eventsLoading = (events) => ({
    type: "Events Loading",
    payload: events
});

const eventUpdate = (event) => ({
    type: "Update Event",
    payload: event,
});

const eventDelete = (event) => ({
    type: "Delete Event",
    payload: event,
});
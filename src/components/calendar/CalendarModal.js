import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../actions/modal";
import Swal from "sweetalert2";
import {
  cleanActiveEvent,
  eventStartAddNew ,
  eventStartUpdate,
} from "../../actions/events";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};


Modal.setAppElement("#root");
const now = moment().add(1, "hours").seconds(0).minutes(0);
const initialState = {
  id:null,
  title: "",
  notes: "",
  start: now.toDate(),
  end: now.clone().add(1, "hours").toDate(),
  user:null
};




export const CalendarModal = () => {

      const dispatch = useDispatch();
      const modal = useSelector((state) => state.modal);
      const calendar = useSelector((state) => state.calendar);
      const { activeEvent } = calendar;
      const [value, setValue] = useState(initialState);
      const { title, notes, start, end, user } = value;

      useEffect(() => {
        if (activeEvent) {
          setValue({
            ...value,
            id: activeEvent._id,
            title: activeEvent.title,
            notes: activeEvent.notes,
            start: activeEvent.start,
            end: activeEvent.end,
            user: activeEvent.user
          });
        } else {
          setValue(initialState);
        }
      }, [calendar]);

      const handleInputChange = ({ target }) => {
        setValue({
          ...value,
          [target.name]: target.value,
        });
      };
      const changeStartDate = (e) => {
        setValue({
          ...value,
          start: e,
        });
      };
      const changeEndDate = (e) => {
        setValue({
          ...value,
          end: e,
        });
      };

      const handleInputCloseModal = () => {
        dispatch(closeModal());
        setValue(initialState);
        dispatch(cleanActiveEvent());
      };
      const handleInputSubmit = (e) => {
        e.preventDefault();

        if (title.length <= 2)
        {
            return Swal.fire("Error en el titulo", "Coloque un titulo", "error");
        } 
        else if (moment(start).isAfter(moment(end))) 
        {
          return Swal.fire(
            "Error en la fecha",
            "La fecha de inicio no puede estar despues que la de fin",
            "error"
          );
        } else if (moment(start).isBefore(moment())) 
        {
          return Swal.fire(
            "Error en la fecha",
            "La fecha de inicio no puede ser anterior a ahora",
            "error"
          );
        } else if (activeEvent) 
        {
            dispatch(eventStartUpdate(value));
        } else 
        {
            dispatch(eventStartAddNew(value));
        }
        dispatch(closeModal());
      };

  return (
    <div>
      <Modal
        isOpen={modal.openModal}
        // onAfterOpen={afterOpenModal}
        // onRequestClose={closeModal}
        className="modal"
        overlayClassName="modal-fondo"
        closeTimeoutMS={200}
        style={customStyles}
      >
        <button 
        onClick={handleInputCloseModal} 
        className="btn"
        style={{ background: "#FF3333",
                  width:"30px",
                  display:"flex",
                  justifyContent:"center",
                  position:"absolute",
                  right:"20px"
        }}
        >
          X
        </button>

        <h1> Nuevo evento </h1>
        <hr />
        <form className="container">
          <div className="form-group">
            <label>Fecha y hora inicio</label>
            <DateTimePicker onChange={changeStartDate} value={start} />
          </div>

          <div className="form-group">
            <label>Fecha y hora fin</label>
            <DateTimePicker
              onChange={changeEndDate}
              minDate={start}
              value={end}
            />
          </div>

          <hr />
          <div className="form-group">
            <label>Titulo y notas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              onChange={handleInputChange}
              value={title}
            />
            <small id="emailHelp" className="form-text text-muted">
              Una descripción corta
            </small>
          </div>

          <div className="form-group">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              onChange={handleInputChange}
              value={notes}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              {(user)?(`Evento creado por ${user.name}`):("")}
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-outline-primary btn-block"
            onClick={handleInputSubmit}
          >
            <i className="far fa-save"></i>
            <span> Guardar</span>
          </button>
        </form>
      </Modal>
    </div>
  );
};

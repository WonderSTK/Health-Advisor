import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAppointment, removeAppointment } from '../store/healthSlice';

function AppointmentScheduler() {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.health.appointments);

  const handleAddAppointment = (e) => {
    e.preventDefault();
    if (doctor && date && time) {
      dispatch(addAppointment({ doctor, date, time, notes }));
      setDoctor('');
      setDate('');
      setTime('');
      setNotes('');
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Appointment Scheduler</h2>
      <form onSubmit={handleAddAppointment} className="mb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            placeholder="Doctor's name"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Schedule Appointment
        </button>
      </form>
      <ul className="space-y-4">
        {appointments.map((appointment, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-md">
            <h3 className="font-semibold">{appointment.doctor}</h3>
            <p>Date: {appointment.date} at {appointment.time}</p>
            {appointment.notes && <p className="mt-2">Notes: {appointment.notes}</p>}
            <button
              onClick={() => dispatch(removeAppointment(index))}
              className="mt-2 text-red-600 hover:text-red-800"
            >
              Cancel Appointment
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppointmentScheduler;
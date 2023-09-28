import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePicker.module.css';

const CustomDatePicker = ({ startDate, endDate, onChange }) => {
  return (
    <DatePicker
      selected={startDate}
      onChange={date => onChange(date)}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      inline
    />
  );
};

export default CustomDatePicker;

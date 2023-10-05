import React, { useState } from "react";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Datepickertofrom.module.css";

function Datepickertofrom() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const handleSelect = (date) => {
    !startDate
      ? setStartDate(date)
      : !endDate && date > startDate && setEndDate(date);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate && endDate) {
      const data = {
        fromDate: startDate.toISOString().split("T")[0],
        toDate: endDate.toISOString().split("T")[0],
      };

      // Send the request here
      sendRequest(data);
    } else {
      alert("Please select a valid date range");
    }
  };

  fetch('http://localhost:8000/your_endpoint/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // If you're using CSRF protection in Django, include the CSRF token here
      // 'X-CSRFToken': csrf_token
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  

  return (
    <React.Fragment>
      <Container className={styles.container}>
        <div className="row fthight">
          <div className="col-sm-8 mt-3">
            <h4 className="mb-4">
              How to select To Date and From Date in react js{" "}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row mb-4">
                <div className="col-sm-6">
                  <p>To Date</p>
                  <DatePicker
                    selected={startDate}
                    onChange={handleSelect}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>
                <div className="col-sm-6">
                  <p>From Date</p>
                  <DatePicker
                    selected={endDate}
                    onChange={handleSelect}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
              </div>
              <div className="col mb-4">
                <div className="col-sm-2"></div>
                <div className="col-sm-4">
                  <button className="btn btn-success">Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Datepickertofrom;

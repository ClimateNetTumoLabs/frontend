import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const AlertPopup = (props) => (
    <Popup trigger={props.showModal} position="right center">
        <div>${props.message}</div>
    </Popup>
);

export default AlertPopup


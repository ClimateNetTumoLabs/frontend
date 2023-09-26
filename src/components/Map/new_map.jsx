import React from 'react';
import './ZoomableImage.css';
import svg_image  from './file.svg'

const ZoomableImage = ({ src }) => {

    return (
        <div className="container-fluid">
            <div className="image-wrapper">
                <img src={svg_image} alt="Zoomable"/>
            </div>
        </div>
    );
};

export default ZoomableImage;
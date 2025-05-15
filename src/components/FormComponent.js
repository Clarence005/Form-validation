import React, { useEffect, useRef } from 'react';
import { createSecureForm } from '../packages/formModule'; 

const FormComponent = () => {
    // using useref to load the container div 
    const formContainerRef = useRef(null);

    useEffect(() => {
        createSecureForm('form-container'); 

        return () => {
            const container = document.getElementById('form-container');
            if (container) {
                container.innerHTML = '';
            }
        };
    }, []);

    return (
        <div className="form-wrapper">
            <h2>Contact Form</h2>
            <div id="form-container" ref={formContainerRef}></div>
        </div>
    );
};

export default FormComponent;

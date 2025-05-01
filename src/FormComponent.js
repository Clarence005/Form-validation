import React, { useEffect, useRef } from 'react';
import { SecureForm } from './packages/formModule';

const FormComponent = () => {
    const formContainerRef = useRef(null);

    useEffect(() => {
        
        const form = new SecureForm('form-container');
        form.render();

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
export function createSecureForm(containerId) {
    const formData = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    const errorMessages = {
        name: '',
        email: '',
        phone: ''
    };
    // XSS Attack management
    function sanitizeInput(value) {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#x27;")
            .replace(/`/g, "&#x60;");
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\+?[\d\s-]{10,}$/;
        return re.test(phone);
    }

    function updateErrorMessages() {
        ['name', 'email', 'phone'].forEach(field => {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl) {
                errorEl.textContent = errorMessages[field];
            }
        });
    }

    function handleInputChange(event) {
        const { name, value } = event.target;
        formData[name] = sanitizeInput(value);
    }
    // regex for email,phone number
    function handleSubmit(event) {
        event.preventDefault();
        let valid = true;

        errorMessages.name = '';
        errorMessages.email = '';
        errorMessages.phone = '';

        if (!formData.name.trim()) {
            errorMessages.name = 'Please enter your name';
            valid = false;
        }

        if (!validateEmail(formData.email)) {
            errorMessages.email = 'Please enter a valid email address';
            valid = false;
        }

        if (!validatePhone(formData.phone)) {
            errorMessages.phone = 'Please enter a valid phone number';
            valid = false;
        }

        updateErrorMessages();

        if (!valid) return;

        alert(`Submitted Info:\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}`);
        console.log('Form submitted:', formData);

        const formFields = document.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.value = '';
        });
    }

    
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = "";
    container.className = "form-container";

    const form = document.createElement("form");
    form.className = "secure-form";

    const fields = [
        { label: "Name", name: "name", type: "text", placeholder: "Enter your name" },
        { label: "Email", name: "email", type: "email", placeholder: "Enter your email" },
        { label: "Phone", name: "phone", type: "tel", placeholder: "Enter your phone number" }
        
    ];

    fields.forEach(({ label, name, type, placeholder }) => {
        const  formgroup= document.createElement("div");
        formgroup.className = "form-group";
        formgroup.style.display = "flex";
        formgroup.style.marginBottom = "20px";

        const labelelement = document.createElement("label");
        labelelement.setAttribute("for", name);
        labelelement.textContent = label;
        labelelement.style.fontWeight = "bold";
        labelelement.style.width = "150px";
        labelelement.style.flexShrink = "0";

        const inputgroup = document.createElement("div");
        inputgroup.className = "input-group";
        inputgroup.style.display = "flex";
        inputgroup.style.flexDirection = "column";
        inputgroup.style.flexGrow = "1";

        const input = document.createElement("input");
        input.type = type;
        input.name = name;
        input.id = name;
        input.required = true;
        input.placeholder = placeholder;
        input.style.padding = "10px";
        input.style.border = "1px solid #ccc";
        input.style.borderRadius = "4px";
        input.style.fontSize = "14px";

        const errordiv = document.createElement("div");
        errordiv.id = `${name}-error`;
        errordiv.className = "error-message";
        errordiv.style.color = "red";
        errordiv.style.fontSize = "0.85em";
        errordiv.style.marginTop = "5px";

        input.addEventListener("input", handleInputChange);

        inputgroup.appendChild(input);
        inputgroup.appendChild(errordiv);
        formgroup.appendChild(labelelement);
        formgroup.appendChild(inputgroup);
        form.appendChild(formgroup);
    });

    const messagegroup = document.createElement("div");
    messagegroup.className = "form-group";
    messagegroup.style.display = "flex";
    messagegroup.style.marginBottom = "20px";

    const messageLabel = document.createElement("label");
    messageLabel.setAttribute("for", "message");
    messageLabel.textContent = "Message:";
    messageLabel.style.fontWeight = "bold";
    messageLabel.style.width = "150px";
    messageLabel.style.flexShrink = "0";

    const messageinputgroup = document.createElement("div");
    messageinputgroup.className = "input-group";
    messageinputgroup.style.display = "flex";
    messageinputgroup.style.flexDirection = "column";
    messageinputgroup.style.flexGrow = "1";

    const textarea = document.createElement("textarea");
    textarea.name = "message";
    textarea.id = "message";
    textarea.placeholder = "Enter your message";
    textarea.style.padding = "10px";
    textarea.style.border = "1px solid #ccc";
    textarea.style.borderRadius = "4px";
    textarea.style.fontSize = "14px";
    textarea.style.minHeight = "80px";
    textarea.style.resize = "vertical";

    textarea.addEventListener("input", handleInputChange);

    messageinputgroup.appendChild(textarea);
    messagegroup.appendChild(messageLabel);
    messagegroup.appendChild(messageinputgroup);
    form.appendChild(messagegroup);

    const button = document.createElement("button");
    button.type = "submit";
    button.textContent = "Submit";
    button.style.backgroundColor = "#4CAF50";
    button.style.color = "white";
    button.style.padding = "10px 15px";
    button.style.border = "none";
    button.style.borderRadius = "4px";
    button.style.cursor = "pointer";
    button.style.fontSize = "15px";

    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#45a049";
    });
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#4CAF50";
    });

    form.addEventListener("submit", handleSubmit);
    form.appendChild(button);
    container.appendChild(form);
}

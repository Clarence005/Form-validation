export class SecureForm {
    constructor(containerId) {
        this.containerId = containerId;
        this.formData = {
            name: '',
            email: '',
            phone: '',
            message: ''
        };
        this.errorMessages = {
            name: '',
            email: '',
            phone: ''
        };
        
    }

    sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }

    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    validatePhone(phone) {
        const re = /^\+?[\d\s-]{10,}$/;
        return re.test(phone);
    }


    handleSubmit(event) {
        event.preventDefault();
        let valid = true;

        this.errorMessages = { name: '', email: '', phone: '' };
    
        if (!this.formData.name.trim()) {
            this.errorMessages.name = 'Please enter your name';
            valid = false;
        }
    
        if (!this.validateEmail(this.formData.email)) {
            this.errorMessages.email = 'Please enter a valid email address';
            valid = false;
        }
    
        if (!this.validatePhone(this.formData.phone)) {
            this.errorMessages.phone = 'Please enter a valid phone number';
            valid = false;
        }
    
        this.updateErrorMessages();
    
        if (!valid) return;
    
        alert(`Submitted Info:\nName: ${this.formData.name}\nEmail: ${this.formData.email}\nPhone: ${this.formData.phone}`);
        console.log('Form submitted:', this.formData);
        const formFields = document.querySelectorAll('input, textarea');
        formFields.forEach(field => {
            field.value = '';
        });
    }
    

    handleInputChange(event) {
        const { name, value } = event.target;
        this.formData[name] = this.sanitizeInput(value);
    }

    updateErrorMessages() {
        const fields = ['name', 'email', 'phone'];
        fields.forEach(field => {
            const errorEl = document.getElementById(`${field}-error`);
            if (errorEl) {
                errorEl.textContent = this.errorMessages[field];
            }
        });
    }
    
    
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        const form = document.createElement('form');
        form.className = 'secure-form';
        form.innerHTML = `
            <div class="form-group">
                <label for="name">Name:</label>
                <div class="input-group">
                    <input type="text" id="name" name="name" required 
                        placeholder="Enter your name">
                    <div id="name-error" class="error-message"></div>
                </div>
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <div class="input-group">
                    <input type="email" id="email" name="email" required 
                        placeholder="Enter your email">
                    <div id="email-error" class="error-message"></div>
                </div>
            </div>
            <div class="form-group">
                <label for="phone">Phone:</label>
                <div class="input-group">
                    <input type="tel" id="phone" name="phone" required 
                        placeholder="Enter your phone number">
                    <div id="phone-error" class="error-message"></div>
                </div>
            </div>
            <div class="form-group">
                <label for="message">Message:</label>
                <div class="input-group">
                    <textarea id="message" name="message" 
                            placeholder="Enter your message"></textarea>
                </div>
            </div>
            <button type="submit">Submit</button>
        `;


        form.addEventListener('submit', (e) => this.handleSubmit(e));
        form.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', (e) => this.handleInputChange(e));
        });

        const style = document.createElement('style');
        style.textContent = `
            .secure-form {
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
            }

            .form-group {
                display: flex;
                align-items: flex-start;
                margin-bottom: 20px;
            }

            label {
                width: 120px;
                margin-right: 10px;
                font-weight: bold;
                line-height: 1.5;
            }

            .input-group {
                flex: 1;
                display: flex;
                flex-direction: column;
            }

            input, textarea {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-size: 14px;
                width: 100%;
                box-sizing: border-box;
            }

            textarea {
                resize: vertical;
                min-height: 80px;
            }

            .error-message {
                color: red;
                font-size: 0.85em;
                margin-top: 5px;
            }

            button {
                background-color: #4CAF50;
                color: white;
                padding: 10px 15px;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 15px;
            }

            button:hover {
                background-color: #45a049;
            }
            `;



        container.appendChild(style);
        container.appendChild(form);
    }
} 
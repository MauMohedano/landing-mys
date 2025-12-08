document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año del copyright
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // ============== MODAL DE CONFIRMACIÓN ==============
    const modal = document.getElementById('modal-gracias');
    const modalClose = document.querySelector('.modal-close');
    
    if (modal && modalClose) {
        // Cerrar modal al hacer clic en X
        modalClose.onclick = function() {
            modal.style.display = 'none';
        }
        
        // Cerrar modal al hacer clic fuera
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }
        
        // Detectar cuando FormSubmit redirige de vuelta
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('submit') === 'success') {
            modal.style.display = 'block';
            // Limpiar URL sin recargar
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    }
    
    // ============== VALIDACIÓN DE FORMULARIO ==============
    const form = document.getElementById('contact-form');
    
    if (form) {
        // Campos del formulario
        const nombreInput = document.getElementById('nombre');
        const correoInput = document.getElementById('correo');
        const telefonoInput = document.getElementById('telefono');
        const mensajeInput = document.getElementById('mensaje');
        const submitBtn = form.querySelector('.btn-submit');
        
        // Expresiones regulares para validación
        const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regexTelefono = /^[0-9]{10}$/; // 10 dígitos para México
        const regexNombre = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/; // Solo letras y espacios
        
        // Función para crear mensaje de error
        function showError(input, message) {
            const formGroup = input.parentElement;
            
            // Remover error existente
            removeError(input);
            
            // Agregar clase de error
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            
            // Crear elemento de error
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
        }
        
        // Función para mostrar éxito
        function showSuccess(input) {
            const formGroup = input.parentElement;
            
            // Remover error existente
            removeError(input);
            
            // Agregar clase de éxito
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
        }
        
        // Función para remover error
        function removeError(input) {
            const formGroup = input.parentElement;
            const error = formGroup.querySelector('.error-message');
            
            if (error) {
                formGroup.removeChild(error);
            }
            
            formGroup.classList.remove('error');
        }
        
        // Función para sanitizar input (prevenir XSS)
        function sanitizeInput(input) {
            return input.trim()
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#x27;')
                .replace(/\//g, '&#x2F;');
        }
        
        // Validación de nombre
        function validateNombre() {
            const valor = nombreInput.value.trim();
            
            if (valor === '') {
                showError(nombreInput, 'El nombre es obligatorio');
                return false;
            }
            
            if (valor.length < 2) {
                showError(nombreInput, 'El nombre debe tener al menos 2 caracteres');
                return false;
            }
            
            if (valor.length > 50) {
                showError(nombreInput, 'El nombre no puede exceder 50 caracteres');
                return false;
            }
            
            if (!regexNombre.test(valor)) {
                showError(nombreInput, 'El nombre solo puede contener letras y espacios');
                return false;
            }
            
            showSuccess(nombreInput);
            return true;
        }
        
        // Validación de correo
        function validateCorreo() {
            const valor = correoInput.value.trim();
            
            if (valor === '') {
                showError(correoInput, 'El correo electrónico es obligatorio');
                return false;
            }
            
            if (!regexEmail.test(valor)) {
                showError(correoInput, 'Ingresa un correo electrónico válido');
                return false;
            }
            
            showSuccess(correoInput);
            return true;
        }
        
        // Validación de teléfono
        function validateTelefono() {
            const valor = telefonoInput.value.trim();
            
            // El teléfono es opcional
            if (valor === '') {
                removeError(telefonoInput);
                return true;
            }
            
            // Remover espacios, guiones y paréntesis
            const telefonoLimpio = valor.replace(/[\s\-\(\)]/g, '');
            
            if (!regexTelefono.test(telefonoLimpio)) {
                showError(telefonoInput, 'Ingresa un teléfono válido de 10 dígitos');
                return false;
            }
            
            // Actualizar el valor con el teléfono limpio
            telefonoInput.value = telefonoLimpio;
            showSuccess(telefonoInput);
            return true;
        }
        
        // Validación de mensaje
        function validateMensaje() {
            const valor = mensajeInput.value.trim();
            
            if (valor === '') {
                showError(mensajeInput, 'El mensaje es obligatorio');
                return false;
            }
            
            if (valor.length < 10) {
                showError(mensajeInput, 'El mensaje debe tener al menos 10 caracteres');
                return false;
            }
            
            if (valor.length > 500) {
                showError(mensajeInput, 'El mensaje no puede exceder 500 caracteres');
                return false;
            }
            
            showSuccess(mensajeInput);
            return true;
        }
        
        // Validación en tiempo real (mientras escriben)
        nombreInput.addEventListener('blur', validateNombre);
        nombreInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateNombre();
            }
        });
        
        correoInput.addEventListener('blur', validateCorreo);
        correoInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateCorreo();
            }
        });
        
        telefonoInput.addEventListener('blur', validateTelefono);
        telefonoInput.addEventListener('input', function() {
            // Solo permitir números
            this.value = this.value.replace(/[^0-9]/g, '');
            
            if (this.value.trim() !== '') {
                validateTelefono();
            }
        });
        
        mensajeInput.addEventListener('blur', validateMensaje);
        mensajeInput.addEventListener('input', function() {
            if (this.value.trim() !== '') {
                validateMensaje();
            }
        });
        
        // Validación al enviar el formulario
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validar todos los campos
            const isNombreValid = validateNombre();
            const isCorreoValid = validateCorreo();
            const isTelefonoValid = validateTelefono();
            const isMensajeValid = validateMensaje();
            
            // Si todos son válidos, sanitizar y enviar
            if (isNombreValid && isCorreoValid && isTelefonoValid && isMensajeValid) {
                // Sanitizar inputs antes de enviar
                nombreInput.value = sanitizeInput(nombreInput.value);
                correoInput.value = sanitizeInput(correoInput.value);
                telefonoInput.value = sanitizeInput(telefonoInput.value);
                mensajeInput.value = sanitizeInput(mensajeInput.value);
                
                // Cambiar el estado del botón a "Enviando..."
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                submitBtn.classList.add('loading');
                
                // Enviar el formulario
                form.submit();
            } else {
                // Scroll al primer campo con error
                const firstError = form.querySelector('.error');
                if (firstError) {
                    firstError.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }
            }
        });
    }
    
    // ============== FLIP CARDS ==============
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Evitar que el clic en el botón de WhatsApp voltee la tarjeta
            if (e.target.classList.contains('btn-whatsapp') || 
                e.target.closest('.btn-whatsapp')) {
                e.stopPropagation();
                return;
            }
            
            // Toggle la clase 'flipped'
            this.classList.toggle('flipped');
        });
    });
    
    // Cerrar flip card al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.flip-card')) {
            flipCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});

// Inicializar iconos de Lucide
lucide.createIcons();
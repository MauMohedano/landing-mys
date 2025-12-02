// ============================================
// JAVASCRIPT SIMPLIFICADO - SIN BACKEND
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año del copyright automáticamente
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // El formulario ahora funciona con FormSubmit
    // No necesita JavaScript adicional para el envío
    // FormSubmit maneja todo automáticamente
    
    // Opcional: Agregar animación al botón de envío
    const form = document.querySelector('.contacto-form');
    const submitButton = form.querySelector('.btn-submit');
    
    if (form && submitButton) {
        form.addEventListener('submit', function() {
            // Cambiar el texto del botón mientras se envía
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            // FormSubmit redirigirá automáticamente después del envío
            // No necesitas hacer nada más
        });
    }
    
    // Opcional: Validación visual mejorada
    const inputs = document.querySelectorAll('input[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.style.borderColor = '#dc3545';
        });
        
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.style.borderColor = '#28a745';
            } else {
                this.style.borderColor = '#dc3545';
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.value === '') {
                this.style.borderColor = '';
            }
        });
    });
});
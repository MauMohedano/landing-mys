document.addEventListener('DOMContentLoaded', function() {
    // Actualizar el año del copyright
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Modal
    const modal = document.getElementById('modal-gracias');
    const modalClose = document.querySelector('.modal-close');
    
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
});
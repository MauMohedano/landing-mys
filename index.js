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
    
    // ============== FLIP CARDS ==============
    const flipCards = document.querySelectorAll('.flip-card');
    
   flipCards.forEach(card => {
    card.addEventListener('click', function(e) {
        // Evitar que el clic en el botón de WhatsApp voltee la tarjeta
        if (e.target.classList.contains('btn-whatsapp') || 
            e.target.closest('.btn-whatsapp')) {
            e.stopPropagation(); // Detener propagación
            return;
        }
        
        // Toggle la clase 'flipped'
        this.classList.toggle('flipped');
    });
});
    
    // Cerrar flip card al hacer clic fuera (opcional)
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.flip-card')) {
            flipCards.forEach(card => {
                card.classList.remove('flipped');
            });
        }
    });
});

lucide.createIcons();
document.addEventListener('DOMContentLoaded', () => {
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
            mobileMenuBtn.textContent = isExpanded ? '✕' : '☰';
        });
    }

    // Scroll header effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Submit search form and filter events
    const searchForm = document.querySelector('.search-form');
    const eventCards = document.querySelectorAll('.event-card');

    if(searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevents the page from reloading

            // Obtain input values
            const searchTerm = document.getElementById('search').value.toLowerCase();
            const locationFilter = document.getElementById('location').value;
            
            let foundCount = 0;

            eventCards.forEach(card => {
                // Obtain data from the card
                const title = card.querySelector('.event-title').textContent.toLowerCase();
                const category = card.querySelector('.event-category').textContent.toLowerCase();
                const cardLocation = card.getAttribute('data-location');

                const matchesSearch = title.includes(searchTerm) || category.includes(searchTerm);
                const matchesLocation = locationFilter === '' || cardLocation === locationFilter;

                if (matchesSearch && matchesLocation) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeIn 0.5s ease';
                    foundCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Feedback if there are no results
            if(foundCount === 0) {
                mostrarNotificacion('No se encontraron eventos con esos filtros.', 'warning');
            } else {
                mostrarNotificacion(`Se encontraron ${foundCount} eventos.`, 'success');
            }
        });
    }

    // Newsletter Validation
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if(newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            const email = emailInput.value;

            if(validarEmail(email)) {
                mostrarNotificacion('¡Gracias por suscribirte! Revisa tu correo.', 'success');
                newsletterForm.reset();
            } else {
                mostrarNotificacion('Por favor ingresa un correo válido.', 'error');
            }
        });
    }

    // Interaction for register buttons
    const registerBtns = document.querySelectorAll('.event-actions .btn-primary');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const eventTitle = e.target.closest('.event-card').querySelector('.event-title').textContent;
            mostrarNotificacion(`Iniciando registro para: ${eventTitle}`, 'info');
        });
    });
});

// Auxiliary functions
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Notification system
function mostrarNotificacion(mensaje, tipo) {
    // Create element
    const div = document.createElement('div');
    div.className = `notification notification-${tipo}`;
    div.textContent = mensaje;

    // Add DOM
    document.body.appendChild(div);

    // Entrance animation
    setTimeout(() => div.classList.add('show'), 10);

    // Delete after 3 seconds
    setTimeout(() => {
        div.classList.remove('show');
        setTimeout(() => div.remove(), 300);
    }, 3000);
}
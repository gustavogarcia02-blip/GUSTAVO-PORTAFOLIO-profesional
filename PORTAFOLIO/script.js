/* ============================================================
   GUSTAVO SOLUTIONS - JAVASCRIPT INTEGRAL 2026
   ============================================================ */

// 1. FUNCIÓN PARA EL MENÚ HAMBURGUESA
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// 2. FUNCIÓN PARA EL MODO OSCURO (LUNA/SOL)
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.getElementById('theme-icon');
    
    if (document.body.classList.contains('dark-mode')) {
        if(icon) icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        if(icon) icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('dark-mode', 'disabled');
    }
}

// --- MOSTRAR/OCULTAR MENÚ DE PALETA ---
function togglePalette() {
    const popup = document.getElementById('palettePopup');
    if (popup.style.display === 'flex') {
        popup.style.display = 'none';
    } else {
        popup.style.display = 'flex';
    }
}

// 3. FUNCIÓN PARA LA PALETA DE 8 COLORES
function changeTheme(themeName) {
    const body = document.body;
    
    // Lista completa de temas (Actualizada a los 8 colores)
    const themes = [
        'theme-ocean', 'theme-forest', 'theme-sunset', 
        'theme-royal', 'theme-midnight', 'theme-ruby', 
        'theme-aqua', 'theme-sunshine'
    ];
    
    // Eliminamos cualquier tema previo
    themes.forEach(t => body.classList.remove(t));
    
    // Aplicamos la nueva clase de tema
    if (themeName !== 'default') {
        body.classList.add('theme-' + themeName);
    }
    
    // Guardamos la preferencia
    localStorage.setItem('selected-palette', themeName);

    // Cerramos el menú
    const popup = document.getElementById('palettePopup');
    if (popup) popup.style.display = 'none';
}

// 4. FUNCIÓN PARA LAS CARPETAS
function toggleFolder(id) {
    const folder = document.getElementById(id);
    const allFolders = document.querySelectorAll('.folder-content');

    // Cerrar las otras carpetas
    allFolders.forEach(f => {
        if (f.id !== id) {
            f.style.display = 'none';
        }
    });

    // Alternar la carpeta seleccionada
    if (folder.style.display === 'block') {
        folder.style.display = 'none';
    } else {
        folder.style.display = 'block';
        folder.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// 5. FUNCIÓN DEL COHETE (VOLVER ARRIBA)
function lanzarCohete() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 6. PERSISTENCIA DE DATOS AL CARGAR
window.addEventListener('load', () => {
    // Recuperar Modo Oscuro
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icon = document.getElementById('theme-icon');
        if(icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    // Recuperar Paleta
    const savedPalette = localStorage.getItem('selected-palette');
    if (savedPalette) {
        changeTheme(savedPalette);
    }

    // --- INICIALIZACIÓN DE SCROLL REVEAL ---
    // Esto hace que los elementos aparezcan al bajar
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        delay: 200,
        reset: false
    });

    sr.reveal('.section', {});
    sr.reveal('.hero-content', { origin: 'left', delay: 400 });
    sr.reveal('.perfil-container', { origin: 'right', delay: 400 });
    sr.reveal('.card', { interval: 100 });
    sr.reveal('.tool-item', { interval: 50 });
});

// 7. CIERRE AUTOMÁTICO DEL MENÚ MÓVIL
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('.nav-links').classList.remove('active');
    });
});

// 8. CERRAR PALETA SI SE HACE CLICK FUERA
window.addEventListener('click', (event) => {
    const popup = document.getElementById('palettePopup');
    const btn = document.querySelector('.palette-btn');
    if (popup && btn && !btn.contains(event.target) && !popup.contains(event.target)) {
        popup.style.display = 'none';
    }
});
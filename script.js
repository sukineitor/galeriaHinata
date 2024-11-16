// Esperar a que la página se cargue
window.addEventListener('load', () => {
    document.getElementById('loading').style.display = 'none'; // Ocultar pantalla de carga
});

// Modo Oscuro / Claro
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
});

// Lightbox
const images = document.querySelectorAll('.image-item img');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.querySelector('.close-btn');

// Abre la imagen en el lightbox
images.forEach(image => {
    image.addEventListener('click', (e) => {
        lightbox.style.display = 'flex';
        lightboxImage.src = e.target.src;
    });
});

// Cerrar el lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

// Funcionalidad de "Me gusta"
const likeBtns = document.querySelectorAll('.like-btn');
likeBtns.forEach(btn => {
    const imageId = btn.dataset.image;
    const heartIcon = btn.querySelector('i');

    // Verifica si ya tiene "me gusta" almacenado
    if (localStorage.getItem(imageId) === 'liked') {
        heartIcon.classList.add('fas');
        heartIcon.classList.remove('far');
        btn.classList.add('liked');
    }

    btn.addEventListener('click', () => {
        heartIcon.classList.toggle('fas');
        heartIcon.classList.toggle('far');
        btn.classList.toggle('liked');
        if (btn.classList.contains('liked')) {
            localStorage.setItem(imageId, 'liked');
        } else {
            localStorage.removeItem(imageId);
        }
    });
});

// Cerrar lightbox si se hace clic fuera de la imagen
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


function openLightbox(index) {
    currentIndex = index;
    lightboxImage.src = images[currentIndex].src;
    lightbox.style.display = 'flex'; // Flex para centrar
}


function changeImage(step) {
    currentIndex += step;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Vuelve a la última imagen si está en la primera
    } else if (currentIndex >= images.length) {
        currentIndex = 0; // Vuelve a la primera imagen si está en la última
    }
    lightboxImage.src = images[currentIndex].src;
}

images.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
});

prevArrow.addEventListener('click', () => changeImage(-1));
nextArrow.addEventListener('click', () => changeImage(1));

document.querySelector('.close-btn').addEventListener('click', () => {
    lightbox.style.display = 'none';
});
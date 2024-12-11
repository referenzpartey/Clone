document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.clickable').forEach(el => {
        el.addEventListener('click', () => {
            const img = document.getElementById('overlayImage');
            img.src = el.getAttribute('data-img');
            document.getElementById('overlay').style.display = 'flex';
        });
    });
});

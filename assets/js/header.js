document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  menuToggle.addEventListener('click', function() {
    document.getElementById('nav').classList.toggle('active');
    this.classList.toggle('active');
  });
});
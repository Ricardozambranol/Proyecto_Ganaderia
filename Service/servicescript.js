document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const closeMenuButton = document.querySelector('.close-menu');
    const appLeft = document.querySelector('.app-left');
    const appRight = document.querySelector('.app-right');
  
    menuButton.addEventListener('click', function() {
      appLeft.style.left = '0';
      appRight.style.right = '0';
    });
  
    closeMenuButton.addEventListener('click', function() {
      appLeft.style.left = '-240px';
      appRight.style.right = '-320px';
    });
  });
  
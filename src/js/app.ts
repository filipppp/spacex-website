document.addEventListener("DOMContentLoaded", () => {
   const switchButton = document.getElementById("menu-switcher");
   const menu = document.getElementById("mobile-menu");

   switchButton.addEventListener("click", () => {
       menu.classList.toggle("animation");
       menu.classList.toggle("show");
   });
});

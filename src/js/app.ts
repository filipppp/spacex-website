document.addEventListener("DOMContentLoaded", () => {
   const switchButton = document.getElementById("menu-switcher");
   const menu = document.getElementById("mobile-menu");
   const pfuschSpans = document.querySelectorAll(".page span");
   changeSpanSize(5);

   let openedSubMenu = false;

   switchButton.addEventListener("click", () => {
       menu.classList.toggle("animation");
       menu.classList.toggle("show");
       openedSubMenu = !openedSubMenu;
       if (openedSubMenu) {
           changeSpanSize(14);
       } else {
           changeSpanSize(5);
       }
   });

   function changeSpanSize(size: number) {
       for (let i = 0; i < pfuschSpans.length; i++) {
           (pfuschSpans[i] as HTMLElement).style.marginTop = `-${size}rem`;
           (pfuschSpans[i] as HTMLElement).style.paddingBottom = `${size}rem`;
       }
   }
});

const menuButton = document.querySelector("#menu-button");
const menu = document.querySelector("#menu");
function toggleMenu() {
  menu.classList.toggle("hide");
}

menuButton.addEventListener("click", toggleMenu);

function handleResize() {
  if (window.innerWidth > 1000) {
    menu.classList.remove("hide");
  }
}

handleResize();
window.addEventListener("resize", handleResize);

const gallery = document.querySelector(".gallery");

gallery.addEventListener("click", (event) => {
  if (event.target.tagName === "IMG") {
    const imgSrc = event.target.getAttribute("src");
    const imgAlt = event.target.getAttribute("alt");

    const dialog = document.createElement("dialog");
    dialog.innerHTML = `
      <img src="${imgSrc}" alt="${imgAlt}" />
      <button id="close-viewer">X</button>
    `;

    document.body.appendChild(dialog);
    dialog.showModal();

    const closeButton = dialog.querySelector("#close-viewer");
    closeButton.addEventListener("click", () => {
      dialog.close();
      document.body.removeChild(dialog);
    });
  }
}); 

modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.close();
  }
})
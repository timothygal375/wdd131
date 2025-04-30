const select = document.querySelector("#theme-select");
const body = document.body;
const logo = document.getElementById("byui-logo");

function changeTheme() {
    const selectedTheme = select.value; 
    
    if (selectedTheme === "dark") {
        body.classList.add("dark-theme");
        logo.src = "byui-logo_white.png";
     } else {
        body.classList.remove("dark-theme");
        logo.src = "byui-logo_blue.webp";
     }
}

select.addEventListener("change", changeTheme);
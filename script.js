// ==========================
// ЭЛЕМЕНТЫ
// ==========================

const themeButton = document.getElementById("themeButton");

const htmlBar = document.getElementById("htmlBar");
const cssBar = document.getElementById("cssBar");
const jsBar = document.getElementById("jsBar");

// ==========================
// АНИМАЦИЯ НАВЫКОВ
// ==========================

function animateSkills() {

    htmlBar.style.width = "90%";

    cssBar.style.width = "80%";

    jsBar.style.width = "65%";

}

window.addEventListener("load", function () {

    htmlBar.style.width = "0";

    cssBar.style.width = "0";

    jsBar.style.width = "0";

    setTimeout(animateSkills, 300);

});

// ==========================
// СМЕНА ТЕМЫ
// ==========================

let darkTheme = false;

themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark-theme");

    darkTheme = !darkTheme;

    if (darkTheme) {

        themeButton.textContent = "☀️ Светлая тема";

    } else {

        themeButton.textContent = "🌙 Темная тема";

    }

});
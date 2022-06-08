const html = document.querySelector("html");
let isDark = localStorage.getItem("dark");

if (isDark === "true") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

function togle() {
  let dark = html.className;
  if (dark === "dark") {
    html.classList.remove("dark");
    localStorage.setItem("dark", "false");
  } else {
    localStorage.setItem("dark", "true");
    html.classList.add("dark");
  }
}

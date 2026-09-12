const themeToggle = document.getElementById("theme-toggle");  
  
const savedTheme = localStorage.getItem("foliora-theme");  
  
if (savedTheme === "dark") {  
    document.body.classList.add("dark");  
}  
  
function updateThemeButton() {  
    const isDark = document.body.classList.contains("dark");  
  
    themeToggle.textContent = isDark ? "☀️" : "🌙";  
    themeToggle.setAttribute(  
        "aria-label",  
        isDark ? "Switch to light theme" : "Switch to dark theme"  
    );  
}  
  
themeToggle.addEventListener("click", () => {  
    const isDark = document.body.classList.toggle("dark");  
  
    localStorage.setItem(  
        "foliora-theme",  
        isDark ? "dark" : "light"  
    );  
  
    updateThemeButton();  
});  
  
updateThemeButton();  
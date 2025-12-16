var THEME = "theme";
var DARK_THEME = "theme-dark";
var LIGHT_THEME = "theme-light";

// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem(THEME, themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem(THEME) === DARK_THEME) {
        setTheme(LIGHT_THEME);
    } else {
        setTheme(DARK_THEME);
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem(THEME) === DARK_THEME) {
        setTheme(DARK_THEME);
    } else {
        setTheme(LIGHT_THEME);
    }
})();
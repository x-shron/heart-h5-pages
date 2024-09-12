
const setTheme =(matches: boolean)=>{
  if (matches) {
    document.documentElement.setAttribute("data-prefers-color-scheme", "light");
  
  } else {
    document.documentElement.setAttribute("data-prefers-color-scheme", "dark");
  }
}
const themeMedia = window.matchMedia("(prefers-color-scheme: light)");
setTheme(themeMedia.matches);

themeMedia.addListener((e) => {
  setTheme(e.matches);
});



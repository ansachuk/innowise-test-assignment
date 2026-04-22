const refs = {
	root: document.querySelector("html"),
	switch: document.querySelector(".theme-switcher"),
};

// Check if the preferred scheme is dark
const getSystemTheme = () => (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

// Update the root attribute for theme change
const setTheme = theme => refs.root.setAttribute("data-theme", theme === "system" ? getSystemTheme() : theme);

const savedTheme = localStorage.getItem("theme") || "system";
refs.switch.theme.value = savedTheme;
setTheme(savedTheme);

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
	if (refs.switch.theme.value === "system") {
		setTheme(e.matches ? "dark" : "light");
	}
});

refs.switch.addEventListener("change", e => {
	const switchValue = e.currentTarget.theme.value;

	localStorage.setItem("theme", switchValue);

	setTheme(switchValue);
});

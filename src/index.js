import handleThemeChange from "./js/handleTheme";
import handleBooksListMarkup from "./js/handleBookListMarkup";
import handleFavorites from "./js/handleFavorites";
import "./js/handleFavoritesAside";

import "./index.css";

handleThemeChange();

const refs = {
	list: document.querySelector("#books-list"),
	form: document.querySelector(".search-form"),
};

refs.form.addEventListener("submit", e => {
	e.preventDefault();

	const value = e.currentTarget.searchInput.value.trim().split(" ").join("+");
	handleBooksListMarkup(value, refs.list);
});

refs.list.addEventListener("click", ({ target }) => (target.nodeName === "INPUT" ? handleFavorites(target) : null));

import handleBooksList from "./js/handleBookList";
import handleFavorites from "./js/handleFavorites";

import "./js/handleTheme";
import "./js/handleSearchPreview";
import "./js/handleFavoritesAside";

import "./index.css";

const refs = {
	list: document.querySelector("#books-list"),
	form: document.querySelector(".search-form"),
	preview: document.querySelector(".preview-list"),
};

refs.form.addEventListener("submit", e => {
	e.preventDefault();

	const value = e.currentTarget.searchInput.value.trim().split(" ").join("+");
	handleBooksList(value);

	refs.preview.classList.add("hidden");
});

refs.list.addEventListener("click", ({ target }) => (target.nodeName === "INPUT" ? handleFavorites(target) : null));

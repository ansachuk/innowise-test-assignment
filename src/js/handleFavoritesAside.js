const refs = {
	openBtn: document.querySelector(".favorites-open"),
	backdrop: document.querySelector(".backdrop"),
	closeBtn: document.querySelector(".favorites-close"),
	list: document.querySelector(".aside-favorites-list"),
	deleteBtn: document.querySelector(".aside-delete-favorite-btn"),
};

const createAsideFavoritesListMarkup = () => {
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (savedFavorites.length === 0) {
		return `<li class="no-favorite">
						<svg width="80" height="80">
							<use href="./src/assets/icons.svg#broken-heart"></use>
						</svg>
						<p>No favorites...</p>
					</li>`;
	}

	return savedFavorites
		.map(
			([id, title]) => `<li class="aside-list-item">
					<img class="aside-cover-image" width="40" height="50" src="https://covers.openlibrary.org/b/olid/${id}-S.jpg" alt="${title} - cover" />
					<p>${title}</p>
						<button class="aside-delete-favorite-btn" data-id="${id}" type="button">x</button>
				</li>`,
		)
		.join("");
};

const handleKeyUp = e => {
	e.preventDefault();

	if (e.code === "Escape") {
		closeAside();
	}
};

const closeAside = () => {
	document.removeEventListener("keyup", handleKeyUp);

	refs.backdrop.classList.add("hidden");
};

const openAside = () => {
	refs.list.innerHTML = createAsideFavoritesListMarkup();

	refs.backdrop.classList.remove("hidden");

	refs.backdrop.addEventListener("click", e => {
		if (e.target === e.currentTarget) {
			closeAside();
		}
	});

	refs.closeBtn.addEventListener("click", () => closeAside());

	document.addEventListener("keyup", handleKeyUp);
};

const handleFavoritesAside = () => {
	refs.openBtn.addEventListener("click", openAside);
};

export default handleFavoritesAside;

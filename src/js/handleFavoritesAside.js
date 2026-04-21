const refs = {
	openBtn: document.querySelector(".favorites-open"),
	backdrop: document.querySelector(".backdrop"),
	closeBtn: document.querySelector(".favorites-close"),
	list: document.querySelector(".aside-favorites-list"),
};

const createAsideFavoritesListMarkup = () => {
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (savedFavorites.length === 0) {
		return `<li class="no-favorite">
						<svg width="80" height="80">
							<use href="./assets/icons.svg#broken-heart"></use>
						</svg>
						<p>No favorites...</p>
					</li>`;
	}

	return savedFavorites
		.map(
			([id, title, coverId]) => `<li class="aside-list-item">
					<div class="aside-cover">
						<img class="aside-cover-image" width="50" height="50" src="https://covers.openlibrary.org/b/id/${coverId}-S.jpg" alt="${title} - cover" />
					</div>
					<p class="aside-book-title">${title}</p>
						<button class="aside-delete-favorite-btn delete-btn" data-id="${id}" type="button">
						<svg data-id="${id}" width="50" height="50">
								<use data-id="${id}" href="./assets/icons.svg#heart-solid"></use>
							</svg>
							</button>
				</li>`,
		)
		.join("");
};

const handleKeyUp = e => {
	e.preventDefault();

	if (e.code === "Escape") {
		closeAside();

		window.removeEventListener("keyup", handleKeyUp);
	}
};

const handleDeleteFavorite = e => {
	if (e.target.dataset.id) {
		const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

		const newFavorites = savedFavorites.filter(book => book[0] !== e.target.dataset.id);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));

		refs.list.innerHTML = createAsideFavoritesListMarkup();
	}
};

const closeAside = () => {
	refs.backdrop.classList.add("hidden");
};

const openAside = () => {
	refs.list.innerHTML = createAsideFavoritesListMarkup();

	refs.backdrop.classList.remove("hidden");

	window.addEventListener("keyup", handleKeyUp);
};

refs.backdrop.addEventListener("click", e => {
	if (e.target === e.currentTarget) {
		closeAside();
	}
});

refs.openBtn.addEventListener("click", openAside);

refs.list.addEventListener("click", e => handleDeleteFavorite(e));

refs.closeBtn.addEventListener("click", () => closeAside());

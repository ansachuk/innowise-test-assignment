import fetchBooks from "./fetchBooks";

const handleBooksListMarkup = async (q, listNode) => {
	if (!q) return;

	const books = await fetchBooks(q);
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	const listMarkup = books
		.map(({ title, author_name, cover_i, first_publish_year, key }) => {
			const coverMarkup = cover_i
				? `<div class="loader loader-cover"></div>
						<img class="cover-image" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="${title} - cover" />`
				: `<svg class="no-cover" width="50" height="50">
						<use href="./src/assets/icons.svg#no-image"></use>
					</svg>`;

			return `
			<li class="books-list-item">
					<div class="book-cover">
						${coverMarkup}
					</div>

					<p class="book-name">${title}</p>

					<p class="book-author">${author_name.join(", ")}</p>

					<p class="book-year">${first_publish_year}</p>

					<label class="favorite-checkbox">
						<input type="checkbox" class="hidden" id='${key}' ${savedFavorites.includes(key.toString()) ? "checked" : ""}>
						<div class="favorite-checkbox-icon">
							<svg class="icon" width="30" height="30">
								<use href="./src/assets/icons.svg#heart-solid"></use>
							</svg>
						</div>
					</label>

				</li>`;
		})
		.join("");

	listNode.innerHTML = listMarkup;

	window.scrollTo({ top: listNode.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });
};

export default handleBooksListMarkup;

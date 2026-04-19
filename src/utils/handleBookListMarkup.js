import fetchBooks from "./fetchBooks";

const handleBooksListMarkup = async (q, listNode) => {
	if (!q) return;

	const books = await fetchBooks(q);
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	const listMarkup = books
		.map(({ title, author_name, cover_i, first_publish_year }) => {
			return `
			<li class="books-list-item">
					<div class="book-cover">
						<div class="loader loader-cover"></div>
						<img class="cover-image" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="${title} - cover" />
					</div>

					<p class="book-name">${title}</p>

					<p class="book-author">${author_name.join(", ")}</p>

					<p class="book-year">${first_publish_year}</p>

				</li>`;
		})
		.join("");

	listNode.innerHTML = listMarkup;
};

export default handleBooksListMarkup;

// <input type="checkbox" id='${cover_i}' ${savedFavorites.includes(cover_i.toString()) ? "checked" : ""}>

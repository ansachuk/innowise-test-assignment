import fetchBooks from "./fetchBooks";

const handleBooksListMarkup = async (q, listNode) => {
	if (!q) return;

	const books = await fetchBooks(q);
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	const listMarkup = books
		.map(({ title, author_name, cover_i, first_publish_year }) => {
			return `
		<li class="books-list-item">
			<img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg"
				alt="${title} - cover"
				/>
			${author_name.join(", ")} - ${title} (${first_publish_year})
			<input type="checkbox" id='${cover_i}' ${savedFavorites.includes(cover_i.toString()) ? "checked" : ""}>
		</li>`;
		})
		.join("");

	listNode.innerHTML = listMarkup;
};

export default handleBooksListMarkup;

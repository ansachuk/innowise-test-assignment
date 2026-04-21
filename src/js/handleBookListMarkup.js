import fetchBooks from "./fetchBooks";

const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

const scrollToInput = listNode => window.scrollTo({ top: listNode.getBoundingClientRect().top + window.scrollY - 100, behavior: "smooth" });

const createListMarkup = (books, savedFavorites) =>
	books
		.map(({ title, author_name = [], cover_i, first_publish_year = "", key }) => {
			const olid = key.split("/")[2];

			const coverMarkup = cover_i
				? `<div class="loader loader-cover"></div>
						<img class="cover-image" src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" alt="${title} - cover" />`
				: `<svg class="no-cover" width="50" height="50">
						<use href="./assets/icons.svg#no-image"></use>
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
						<input type="checkbox" class="hidden" data-title="${title}" id='${olid}' ${savedFavorites.some(book => book[0] === olid) ? "checked" : ""}>
						<div class="favorite-checkbox-icon">
							<svg class="icon" width="30" height="30">
								<use href="./assets/icons.svg#heart-solid"></use>
							</svg>
						</div>
					</label>

				</li>`;
		})
		.join("");

const createBadResultMarkup = errorCode =>
	`<li class="bad-result">
		<svg width="70" height="70">
			<use href="./assets/icons.svg#no-result"></use>
		</svg>
		<p>There is no book with ${errorCode === 422 ? "such a short" : "that"} title...</p>
	</li>`;

const handleBooksListMarkup = async (q, listNode) => {
	if (!q || !listNode) return;

	let finalMarkup = "";
	let books = [];
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (q.length < 3) {
		scrollToTop();
		setTimeout(() => {
			listNode.innerHTML = createBadResultMarkup(422);
		}, 300);
		return;
	} else {
		books = await fetchBooks(q);
	}

	if (books?.length === 0) {
		scrollToTop();
		setTimeout(() => {
			listNode.innerHTML = createBadResultMarkup(404);
		}, 300);
	} else {
		finalMarkup = createListMarkup(books, savedFavorites);
	}

	listNode.innerHTML = finalMarkup;

	scrollToInput(listNode);
};

export default handleBooksListMarkup;

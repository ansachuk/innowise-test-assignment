export const BASE_URL = "https://openlibrary.org/";

const headers = new Headers({
	"User-Agent": "Innowise Book Shelf/1.0 (ansachuk@icloud.com)",
});

const searchBtnRef = document.querySelector(".search-button");
const searchLoaderRef = searchBtnRef.firstElementChild;
const searchIconRef = searchBtnRef.lastElementChild;

const fetchBooks = async q => {
	const books = [];

	searchBtnRef.setAttribute("disabled", "");
	searchLoaderRef.classList.remove("hidden");
	searchIconRef.classList.add("hidden");

	try {
		const data = await (
			await fetch(BASE_URL + `search.json?fields=title,author_name,first_publish_year,cover_i,author_key&limit=10&q=${q}`, {
				headers,
			})
		).json();

		books.push(...data.docs);
	} catch (e) {
		console.log("e", e);
	}

	searchBtnRef.removeAttribute("disabled");
	searchLoaderRef.classList.add("hidden");
	searchIconRef.classList.remove("hidden");

	return books;
};

export default fetchBooks;

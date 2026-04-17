export const BASE_URL = "https://openlibrary.org/";

const headers = new Headers({
	"User-Agent": "Innowise Book Shelf/1.0 (ansachuk@icloud.com)",
});

const fetchBooks = async q => {
	const books = [];

	try {
		const data = await (
			await fetch(BASE_URL + `search.json?q=${q}`, {
				headers,
			})
		).json();

		books.push(...data.docs.slice(0, 10));
	} catch (e) {
		console.log("e", e);
	}

	return books;
};

export default fetchBooks;

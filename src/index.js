import fetchBooks from "./fetchBooks";

import "./style.css";

const refs = {
	list: document.querySelector("#books-list"),
};

const handleBooksList = async () => {
	const books = await fetchBooks();

	console.log("books", books);

	const listMarkup = books
		.map(
			({ title, author_name }) => `<li>
      ${author_name[0]} - ${title}
      </li>`,
		)
		.join("");

	console.log("list", listMarkup);

	refs.list.innerHTML = listMarkup;
};

handleBooksList();

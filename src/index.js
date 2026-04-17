import fetchBooks from "./utils/fetchBooks";

import "./utils/themeHandling";

import "./style.css";

const refs = {
	list: document.querySelector("#books-list"),
	form: document.querySelector(".search-form"),
};

refs.form.addEventListener("submit", e => {
	e.preventDefault();

	const value = e.currentTarget.searchInput.value;

	handleBooksList(value.trim().split(" ").join("+"));
});

const handleBooksList = async q => {
	if (!q) return;

	const books = await fetchBooks(q);

	const listMarkup = books
		.map(
			({ title, author_name }) => `<li>
      ${author_name.join(", ")} - ${title}
      </li>`,
		)
		.join("");

	refs.list.innerHTML = listMarkup;
};

handleBooksList();

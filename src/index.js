import fetchBooks from "./utils/fetchBooks";

import "./utils/themeHandling";

import "./style.css";

const refs = {
	list: document.querySelector("#books-list"),
	form: document.querySelector(".search-form"),
};

const handleBooksList = async q => {
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

	refs.list.innerHTML = listMarkup;
};

refs.form.addEventListener("submit", e => {
	e.preventDefault();

	const value = e.currentTarget.searchInput.value;

	handleBooksList(value.trim().split(" ").join("+"));
});

refs.list.addEventListener("click", ({ target }) => {
	if (target.nodeName !== "INPUT") {
		return;
	}

	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
	console.log("savedFavorites", savedFavorites);

	if (savedFavorites.includes(target.id)) {
		const newFavorites = savedFavorites.filter(id => id !== target.id);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	} else {
		const newFavorites = [...savedFavorites, target.id];
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	}

	console.log("e.target.id", target.id);
	console.log("e.target.checked", target.checked);
});

handleBooksList("harry");

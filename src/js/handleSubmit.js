import handleBooksList from "./handleBookList";

const refs = {
	form: document.querySelector(".search-form"),
	preview: document.querySelector(".preview-list"),
};

// ! Handle form submit and close preview
refs.form.addEventListener("submit", e => {
	e.preventDefault();

	const value = e.currentTarget.searchInput.value.trim().split(" ").join("+");
	handleBooksList(value);

	refs.preview.classList.add("hidden");
});

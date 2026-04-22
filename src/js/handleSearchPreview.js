import { fetchPreview } from "./utils/fetchBooks";
import handleBooksList from "./handleBookList";
import debounce from "./utils/debounce";

const refs = {
	input: document.querySelector(".search-input"),
	preview: document.querySelector(".preview-list"),
	resetBtn: document.querySelector(".reset-btn"),
};

const previewFallback = `<li class="preview-fallback"><div class="loader preview-loader"></div></li>`;

const createPreviewMarkup = previewList =>
	previewList
		.map(({ title, first_publish_year }) => {
			const q = title.split(" ").join("+");

			return `<li class="preview-list-item" data-query=${q}>
               ${title} (${first_publish_year})
            </li>
      `;
		})
		.join("");

// ! Reset the search input and hide the preview
refs.resetBtn.addEventListener("click", () => {
	refs.preview.classList.add("hidden");
	refs.input.value = "";

	document.querySelector("#books-list").innerHTML = "";
});

// ! Handle the preview search
refs.input.addEventListener(
	"input",
	debounce(async e => {
		const value = e.target.value;

		refs.preview.classList.remove("hidden");
		refs.preview.innerHTML = previewFallback;

		if (value.length === 0) {
			refs.preview.classList.add("hidden");

			return;
		}

		if (value.length < 3) {
			refs.preview.classList.add("hidden");

			return;
		}

		try {
			const previewList = await fetchPreview(value);

			refs.preview.classList.remove("hidden");

			refs.preview.innerHTML = createPreviewMarkup(previewList);

			window.scrollTo({ top: refs.input.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
		} catch (e) {
			refs.preview.classList.add("hidden");
			console.log("e", e);
		}
	}, 400),
);

refs.preview.addEventListener("click", e => {
	if (e.target.nodeName !== "LI") return;

	const q = e.target.dataset.query;

	refs.preview.classList.add("hidden");

	refs.input.value = q.split("+").join(" ");

	handleBooksList(q);
});

const refs = {
	openBtn: document.querySelector(".favorites-open"),
	backdrop: document.querySelector(".backdrop"),
	closeBtn: document.querySelector(".favorites-close"),
};

const handleKeyUp = e => {
	e.preventDefault();

	if (e.code === "Escape") {
		closeAside();
	}
};

const closeAside = () => {
	document.removeEventListener("keyup", handleKeyUp);

	refs.backdrop.classList.add("hidden");
};

const openAside = () => {
	refs.backdrop.classList.remove("hidden");

	refs.backdrop.addEventListener("click", e => {
		if (e.target === e.currentTarget) {
			closeAside();
		}
	});

	refs.closeBtn.addEventListener("click", () => closeAside());

	document.addEventListener("keyup", handleKeyUp);
};

const handleFavoritesAside = () => {
	refs.openBtn.addEventListener("click", openAside);
};

export default handleFavoritesAside;

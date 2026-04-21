const handleFavorites = inputNode => {
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	const favoriteBook = [inputNode.id, inputNode.dataset.title];

	if (savedFavorites.some(book => book[0] === inputNode.id)) {
		const newFavorites = savedFavorites.filter(book => book[0] !== inputNode.id);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	} else {
		const newFavorites = [...savedFavorites, favoriteBook];
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	}
};

export default handleFavorites;

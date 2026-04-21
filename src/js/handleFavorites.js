const handleFavorites = inputID => {
	const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

	if (savedFavorites.includes(inputID)) {
		const newFavorites = savedFavorites.filter(id => id !== inputID);
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	} else {
		const newFavorites = [...savedFavorites, inputID];
		localStorage.setItem("favorites", JSON.stringify(newFavorites));
	}
};

export default handleFavorites;

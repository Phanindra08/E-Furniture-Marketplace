// create random product for product section=================
export const randomFnForProducts = (num) => {
	if (num < 6) {
		throw new Error(
			"Cannot generate 6 random products from less than 6 products"
		);
	}

	let numIndex = [];
	while (numIndex.length < 6) {
		const randomNum = Math.floor(Math.random() * num) + 1;
		if (numIndex.indexOf(randomNum) === -1) numIndex.push(randomNum);
	}
	return numIndex;
};

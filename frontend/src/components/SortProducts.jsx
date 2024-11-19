import "../styles/Shop.css";

const SortProducts = ({ setProducts, products }) => {
	// sort By Highest price Handler=============================================
	const sortByHighestHandler = () => {
		const newArr = [...products];
		const sortedArr = newArr.sort((a, b) => b.price - a.price);
		setProducts(sortedArr);
	};

	// sort By Lowest price Handler==============================================
	const sortByLowestHandler = () => {
		const newArr = [...products];
		const sortedArr = newArr.sort((a, b) => a.price - b.price);
		setProducts(sortedArr);
	};

	return (
		<ul className="sort-container">
			<li className="lowest" onClick={sortByLowestHandler}>
				Lowest Price
			</li>
			<li className="highest" onClick={sortByHighestHandler}>
				Highest Price
			</li>
		</ul>
	);
};

export default SortProducts;

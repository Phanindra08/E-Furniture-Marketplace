import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

// get rating =======================================
export const getRating = (rating) => {
	if (rating === 5) return <FaStar />;
	else return <FaStarHalfAlt />;
};

// capitalise letter===================================
export const capitaliseFirstLetter = (name) =>
	name.replace(/\b\w/g, (c) => c.toUpperCase());

// define filter names=======================================
export const collectionNames = ["Spring-Summer", "Autumn-Winter"];
export const colorNames = [
	"Pink",
	"Blue",
	"White",
	"Green",
	"Beige",
	"Black",
	"Brown",
	"Yellow",
	"Grey",
	"Lavender",
];
export const categoryNames = ["Chair", "Table", "Bed", "Lamp", "Sofa"];

// define a dummy text=======================================
export const productInfoText =
	" Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus sed facilis ullam, a alias voluptas similique nesciunt qui vel?voluptas similique nesciunt laboriosam natus aliquid nam blanditiis esse autem omnis incidunt voluptate? Dicta, qui vel?";

export const productInfoSize = [
	"Dimensions: W: 207 cm D:56 cm H:221 cm",
	"Seat Dimensions: W: 184 cm D:134 cm H:175 cm",
	"Weight: 5 kg",
	"Materials: Metal, Steel",
	"Filling materials: Concrete, Frozen, Fresh, Steel",
	"Comfort level: Medium",
];

// creating star icons=======================================
export const starIcons = [<FaStar />, <FaStar />, <FaStar />, <FaStar />];

// dummy data for review=====================================
export const dummyReview = [
	{
		name: "Lana Moffat",
		star: [<FaStar />, <FaStar />, <FaStar />, <FaStar />, <FaStar />],
		feedback:
			"Love the colour and perfect for our apartment really modernises the room. Great little sofa for the price!",
		img: "../assets/images/sofa3.jpg",
		date: "23/12/2021",
	},
	{
		name: "Keith Leslie",
		star: [<FaStar />, <FaStar />, <FaStar />, <FaStar />, <FaStarHalfAlt />],
		feedback:
			"Love this - easy to assemble and keep clean with two kids around",
		img: "../assets/images/sofa4.jpg",
		date: "09/08/2021",
	},
	{
		name: "David Mr.d",
		star: [<FaStar />, <FaStar />, <FaStar />, <FaStar />, <FaStar />],
		feedback:
			"Gorgeous perfect size and colour very comfy, super value and looks great!",
		img: "../assets/images/sofa5.jpg",
		date: "16/10/2021",
	},
];

// star making function =============================================
export const starMaking = (num) => {
	const fillStar = num;
	const outlineStar = 5 - num;

	const starfillIcon = [];
	const starEmptyIcon = [];

	const icon1 = <FaStar />;
	const icon2 = <AiOutlineStar />;

	for (let i = 1; i <= fillStar; i++) {
		starfillIcon.push(icon1);
	}

	for (let i = 1; i <= outlineStar; i++) {
		starEmptyIcon.push(icon2);
	}

	return [...starfillIcon, ...starEmptyIcon];
};

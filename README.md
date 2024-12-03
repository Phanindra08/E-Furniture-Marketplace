# FurniTrade
> FurniTrade is a fully responsive e-commerce furniture website.


## Description
After learning React during Boolean's bootcamp, we had to complete a solo project using the framework. I had always been curious about how e-commerce websites were built, so I challenged myself to create one in less than a week. I decided to focus on creating an online furniture store due to my passion for interior design. Initially, I used JSON Server for the project, but now I added a backend using MongoDB.

## Main Features & Functions

1. #### Recently featured Furniture: (Discover and Shop the Latest Trends) ####
A user visits the home page and sees a list of the recently-added furniture items. They click on one of the items to view more details about it.
</br>

2. #### Sign Up and Save: (Create an Account for Easy Purchasing) ####
The user decides to create an account in order to add items to their basket and make future purchases more easily. They navigate to the login page and enter their email and password to sign up.
</br>

3. #### Filter and Find: (Browse Products by Type, Color, Collection, and Price) ####
The user wants to browse the available products, so they navigate to the shop page and use the filtering options to narrow down the selection by type, color, collection, and price range.
</br>

4. #### Search and Sort: (Find the Perfect Product at the Right Price) ####
The user has a specific item in mind that they want to purchase, so they use the search bar to find it. They then sort the search results by price to find the best deal.
</br>

5. #### Explore and Learn: (View Product Details) ####
The user finds an item they like and clicks on it to see more details, including multiple photos, a description, and customer reviews.
</br>

6. #### Edit Your Wishlist: (Remove or Add items in wishlist) ####
The user realizes they accidentally added the wrong item to their wishlist, so they navigate back to the wishlist and remove the unwanted item from their wishlist.
</br>

7. #### Make an Offer: (Negotiate with Seller) ####
The user has an option to negotiate the price of the product they wish to buy with the seller of the product. They can enter the new price they wish to buy the product and send the new price to seller for approval
</br>

## Methods Used
- Navigate UI with **react-router**.
- Implement global state with **useContext** and **useReducer** hooks in **React**.
- Transfer states between routes with **useNavigate**.
- Work with **useLocation** to get the necessary information about the current route.
- Remove the side effect of fetching data from API endpoints by using **useEffect**.
- Create **MongoDB backend** to manage and store data.
- Utilize two popular third-party libraries: **bcrypt and jsonwebtoken** To ensure secure user authentication and authorization in my app. 


## Tech Stack
- React
- Figma
- MongoDB
- Express.js
- Mongoose
- bcrypt & jsonwebtoken


  # Project Setup

This project consists of two main parts: the **frontend** and the **backend**. Follow the instructions below to set up and run both parts of the project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (which includes npm)
- Git (if you're cloning the repository)

## Steps to Run the Frontend

1. **Navigate to the `frontend` directory**:
    ```bash
    cd frontend
    ```

2. **Install the dependencies**:
    Run the following command to install all required npm packages:
    ```bash
    npm install
    ```

3. **Start the frontend development server**:
    After the dependencies have been installed, run the following command to start the frontend:
    ```bash
    npm start
    ```
    This will start the frontend on the default port (usually `http://localhost:3000`), and your app should be live in the browser.

## Steps to Run the Backend

1. **Navigate to the `backend` directory**:
    ```bash
    cd backend
    ```

2. **Install the backend dependencies**:
    Run the following command to install all required npm packages:
    ```bash
    npm install
    ```

3. **Start the backend server**:
    After the dependencies are installed, run the following command to start the backend server:
    ```bash
    npm start
    ```
    This will start the backend server, usually running on `http://localhost:5000` (or a port of your choice if configured differently).

## Additional Configuration

- If you need to adjust any configurations (such as database settings, API keys, etc.), these settings can typically be found in `.env` files within the `frontend` or `backend` directories. 

- Ensure that the frontend is configured to communicate with the correct backend URL (e.g., `http://localhost:5000`) if it's using any API endpoints.

## Conclusion

Once both the frontend and backend are running, you should be able to access the application through your browser at the frontend's URL (e.g., `http://localhost:3000`). The frontend will be communicating with the backend API running at the specified server URL.

---

### Tips:
- **Frontend Errors**: If you encounter any issues with the frontend, check the browser console for error messages.
- **Backend Errors**: If the backend fails to start, check the terminal for any missing dependencies or configuration issues.

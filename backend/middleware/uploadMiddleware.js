import multer from "multer";

// Configure storage for Multer
const storage = multer.memoryStorage(); // Store files temporarily in memory
export const upload = multer({ storage });

// Export the `upload` instance
export default upload;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth.routes");
const partnerRoutes = require("./routes/partner.routes");
const inquiryRoutes = require("./routes/inquiry.routes");
const adminRoutes = require("./routes/admin.routes");
const portfolioRoutes = require("./routes/portfolio.routes");  // fixed filename
const categoryRoutes = require("./routes/category.routes");
const locationRoutes = require("./routes/location.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/inquiry", inquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/partner/portfolio", portfolioRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

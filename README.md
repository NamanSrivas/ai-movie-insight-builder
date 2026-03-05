# 🎬 AI Movie Insight Builder

AI Movie Insight Builder is a web application that allows users to fetch movie details using an IMDb ID and view AI-generated insights based on audience reviews. The project integrates multiple APIs to provide movie metadata, ratings, cast information, and sentiment analysis.

---

## 🚀 Features

- Search movie using **IMDb ID**
- Fetch movie details from **OMDb API**
- Display **poster, plot, rating, and cast**
- AI-generated **sentiment analysis of audience reviews**
- Clean and responsive **UI**
- Deployed for **live access**

---

## 🛠 Tech Stack

- **Frontend:** Next.js, React
- **Styling:** CSS / Tailwind (depending on your setup)
- **APIs Used:**
  - OMDb API
  - TMDb API
  - Google Gemini API (for AI insights)
- **Deployment:** Vercel

---

## 📦 APIs Used

### 1. OMDb API
Used for fetching movie details such as title, plot, rating, and poster.

### 2. TMDb API
Used to retrieve additional metadata such as cast and extra movie details.

### 3. Google Gemini API
Used to generate AI-based insights and sentiment analysis from movie reviews.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-movie-insight-builder.git
cd ai-movie-insight-builder


2️⃣ Install Dependencies
npm install
3️⃣ Add Environment Variables

Create a file:

.env.local

Add the following keys:

OMDB_API_KEY=your_omdb_api_key
TMDB_API_KEY=your_tmdb_api_key
GEMINI_API_KEY=your_gemini_api_key
4️⃣ Run the Project
npm run dev

Then open:

http://localhost:3000
🌐 Deployment

The project is deployed using Vercel.

Steps to deploy:

Push project to GitHub

Import repository into Vercel

Add environment variables

Deploy

Live project link will look like:

https://ai-movie-insight-builder.vercel.app
📸 Example Usage

Enter an IMDb movie ID such as:

tt0111161

The application will display:

Movie poster

Title and plot

IMDb rating

Cast details

AI-generated sentiment insight

🔮 Future Improvements

Movie search by name instead of IMDb ID

Better AI review summarization

User interface improvements

Trending movies section

Review visualization charts

👨‍💻 Author

Naman Srivastava

Aspiring Software Developer interested in AI, Full Stack Development, and Automation.

📄 License

This project was created as part of a technical assignment and is intended for educational purposes.


---

✅ This README is **perfect for assignment submission** because it shows:

- Professional structure  
- Tech stack clarity  
- Deployment instructions  
- Future improvements (recruiters love this)

---

If you want, I can also give you **3 small improvements that will make this assignment look like a senior developer project** (reviewers notice these instantly).

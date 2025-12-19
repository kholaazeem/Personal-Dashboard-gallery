#  Personal Dashboard & Gallery

A full-stack productivity application that combines a **Todo Manager** and a **Secure Image Gallery**. Built to demonstrate **CRUD operations**, **User Authentication**, and **Storage handling** using **Supabase** and **Vanilla JavaScript**.

🔗 **Live Demo:** [Click Here to View Live App](https://kholaazeem.github.io/Personal-Dashboard-gallery/)

---

## 📸 Project Screenshots

| Login Page | Dashboard / Todo List |
|:---:|:---:|
| ![Login UI](https://github.com/user-attachments/assets/b8929726-58d0-465e-a199-be3c0e3f7400) | ![Dashboard UI](https://github.com/user-attachments/assets/31a5d72b-bf5e-4dd0-8584-6f3cd34b43b7) | ![Image GAllery UI](https://github.com/user-attachments/assets/643aab02-81b1-4184-81eb-600bf0995d96)



---

## ✨ Key Features

### 🔐 Authentication & Security
* **User Signup/Login:** Secure email/password authentication using Supabase Auth.
* **Session Management:** Users remain logged in even after refreshing.
* **Protected Routes:** Non-logged-in users cannot access the Dashboard or Gallery.
* **Row Level Security (RLS):** Users can only see *their own* data.

### 📝 Task Management (CRUD)
* **Create:** Add tasks with Title, Description, and Priority (High, Medium, Low).
* **Read:** Fetch and display tasks in a responsive grid layout.
* **Update:** Edit task details and priority levels instantly.
* **Delete:** Remove tasks with a confirmation prompt.
* **UI:** Smart text truncation for long descriptions and color-coded priority badges.

### 🖼️ Image Gallery
* **Upload:** Users can upload personal images to Supabase Storage Buckets.
* **Gallery View:** View all uploaded images in a clean grid.
* **Management:** Delete unwanted images directly from the storage.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Bootstrap 5 (Responsive UI), JavaScript (ES6 Modules).
* **Backend as a Service:** Supabase (PostgreSQL Database).
* **Storage:** Supabase Storage (for Image Gallery).
* **Deployment:** GitHub Pages.

---

## 🚀 How to Run Locally

If you want to run this project on your local machine:

1.  **Clone the repository**
    ```bash
    git clone (https://github.com/kholaazeem/Personal-Dashboard-gallery)
    ```
2.  **Open in VS Code**
    Open the folder in Visual Studio Code.
3.  **Configure Supabase**
    * Create a file named `config.js` (if not present).
    * Add your Supabase URL and ANON KEY:
    ```javascript
    var supabase = createClient("YOUR_SUPABASE_URL", "YOUR_SUPABASE_KEY");
    export default supabase;
    ```
4.  **Run Live Server**
    Open `index.html` or `login.html` using Live Server.

---

## 🧪 Test Credentials (For Recruiters)

Feel free to test the app using these demo credentials without signing up:

* **Email:** `demo@gmail.com`
* **Password:** `123456`

---

## 👤 Author

**[Khola azeem]**
* **LinkedIn:** [Your LinkedIn Profile Link]
* **GitHub:** [Your GitHub Profile Link]

---

<p align="center">Made with ❤️ and JavaScript</p>



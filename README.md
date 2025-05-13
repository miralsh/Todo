# MERN To-Do App

## 📝 Overview
A full-stack To-Do List application with:
- ✅ CRUD Tasks (title, description, due date, priority, category, status)
- ✅ Projects/Folders to group tasks
- ✅ JWT-based Authentication
- ✅ Drag-and-Drop reordering
- ✅ Dark/Light mode toggle
- ✅ TailwindCSS styling

## 🚀 Getting Started

1. **Clone & configure**  
   ```bash
   git clone https://github.com/yourname/todo-app.git
   cd todo-app
   cp server/.env.example server/.env
   # fill MONGO_URI & JWT_SECRET
   ```

2. **Install deps**  
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

3. **Run locally**  
   - Start MongoDB (local or Atlas)
   - In `/server`: `npm run dev`
   - In `/client`: `npm start`

4. **Access**  
   Open http://localhost:3000 and register/login, then create projects & tasks!

## 📁 Folder Structure
- **server/**: Express API (controllers, models, routes, middleware)
- **client/**: React app (components, context, services)
- **.env.example**: sample env vars

## 🛠️ Changes Made in the Todo App

### 1. 🔐 Register Option Added in Login Form

* **File:** `LoginForm.jsx`
* **Description:** Added a link to the register page below the login form.
* **Code Added (Line 46):**

  ```jsx
  <p className='flex justify-center'>
    Don't have an account? 
    <a href='/register'>
      <span className='mx-1 underline text-blue'>Sign up</span>
    </a>
  </p>
  ```

---

### 2. ✅ Navigate to Dashboard on Successful Login

* **Installed:** `react-router-dom`
* **Files Modified:** `LoginForm.jsx`, `AuthContext.js`

#### `LoginForm.jsx`

* **Lines Added:**

  ```jsx
  import { useNavigate } from 'react-router-dom'; // (Line 3)

  const navigate = useNavigate(); // (Line 7)

  const submit = async e => {
    e.preventDefault();
    try {
      const response = await login(form.email, form.password);
      console.log("resp " + JSON.stringify(response));
      if (response.status == 200) {
        navigate('/');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Invalid credentials or server error');
    }
  };
  ```

#### `AuthContext.js`

* **Updated `login` function (Line 45):**

  ```js
  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem('token', 'Bearer ' + res.data.token);
    dispatch({ type: 'LOGIN', payload: res.data });
    return res;
  };
  ```

---

### 3. 🚪 Logout Option on Dashboard Page

* **File Modified:** `App.jsx`

#### `App.jsx`

* **Lines Added:**

  ```jsx
  const { logout } = useContext(AuthContext); // (Line 27)

  const logoutClick = async e => { // (Line 36)
    e.preventDefault();
    await logout();
  };

  // In JSX (Line 54):
  <div className='flex '>
    <DarkModeToggle />
    <button 
      className='border-2 border-black rounded p-2 mx-4' 
      onClick={(e) => logoutClick(e)}
    >
      Logout
    </button>
  </div>
  ```

---

### 4. 🛠️ Fixed Add Task Dropdown Issue (Project Selection)

* **File Modified:** `TaskForm.jsx`
* **Fix:** Resolved error on selecting the first project by updating the dropdown options.

#### `TaskForm.jsx`

* **Line 21 Updated To:**

  ```js
  options: ['', ...projects.map(p => p._id)],
  ```

#### `App.jsx` (TaskForm save logic)

* **Added project validation check (Line 80-91):**

  ```jsx
  onSave={data => {
    if (data.project === '') {
      alert('Project is required!');
    } else {
      console.log("data " + JSON.stringify(data));
      addTask(data).then(res => {
        dispatch({ type: 'ADD_TASK', payload: res.data });
        setShowForm(false);
      });
    }
  }}
  ```


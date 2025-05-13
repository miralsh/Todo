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


Changes made by me in the todo app
1.	Added Register option in login form. -  In the LoginForm.jsx added <p className='flex justify-center'>Don't have an account? <a href='/register'><span className='mx-1 underline text-blue'>Sign up</span></a></p> at line no. 46

2.	On login success navigated to dashboard page. - installed react-router-dom, In the LoginForm.jsx added line no. 3,7, 13-24 and in AuthContext.js
added return res in line no. 45 in login function
LoginForm.jsx
1.import {useNavigate} from 'react-router-dom';
2.const navigate = useNavigate();
3.const submit = async e => {
    e.preventDefault();
     try {
      const response =  await login(form.email, form.password);
      console.log("resp "+JSON.stringify(response))
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

  AuthContext.js
   const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    localStorage.setItem('token', 'Bearer ' + res.data.token);
    dispatch({ type: 'LOGIN', payload: res.data });
    return res;
  };

3.	Added logout option in dashboard page. - in App.jsx added line no. 27 , 36-39, 54-57
App.jsx
 const {logout} = useContext(AuthContext);
   const logoutClick = async e=> {
    e.preventDefault();
     await logout()
  }
   <div className='flex '>
        <DarkModeToggle />
        <button className='border-2 border-black rounded p-2 mx-4' onClick={(e)=>logoutClick(e)}>Logout</button>
   </div>

4.	In add task feature, on selecting the first project it was throwing error so resolved the dropdown issue. - in TaskForm.jsx updated line no. 21
 changed to options: ['',  ...projects.map(p => p._id)],
 in App.jsx on taskform save method added a check for project (line no. 80-91)
   onSave={data =>{
              if(data.project==''){
                alert('project is required!')
              }else{
              console.log("data "+JSON.stringify(data))
              addTask(data).then(res => {
                dispatch({ type: 'ADD_TASK', payload: res.data });
                setShowForm(false);
              })
            }
            }
            }

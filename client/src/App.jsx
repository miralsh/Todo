// client/src/App.jsx

import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import AppContext, { AppProvider } from './context/AppContext';
import {
  fetchTasks,
  addTask,
  editTask,
  removeTask,
  fetchProjects,
  addProject
} from './services/api';

import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import TaskForm from './components/TaskForm';
import TaskCard from './components/TaskCard';
import ProjectList from './components/ProjectList';
import DarkModeToggle from './components/DarkModeToggle';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function Dashboard() {
  const { state, dispatch } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const { logout } = useContext(AuthContext);
  useEffect(() => {
    fetchTasks().then(res =>
      dispatch({ type: 'SET_TASKS', payload: res.data })
    );
    fetchProjects().then(res =>
      dispatch({ type: 'SET_PROJECTS', payload: res.data })
    );
  }, [dispatch]);
  const logoutClick = async e => {
    e.preventDefault();
    await logout()
  }
  const onDragEnd = result => {
    if (!result.destination) return;
    const reordered = Array.from(state.tasks);
    const [moved] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, moved);
    reordered.forEach((t, i) => (t.order = i));
    reordered.forEach(t => editTask(t._id, { order: t.order }));
    dispatch({ type: 'SET_TASKS', payload: reordered });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <nav className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">🗒️ To-Do App</h1>
        <div className='flex '>
        <DarkModeToggle />
        <button className='border-2 border-black rounded p-2 mx-4' onClick={(e)=>logoutClick(e)}>Logout</button>
        </div>
      </nav>

      <main className="p-4">
        <ProjectList
          projects={state.projects}
          onAdd={name =>
            addProject({ name }).then(res =>
              dispatch({ type: 'ADD_PROJECT', payload: res.data })
            )
          }
        />

        <button
          onClick={() => setShowForm(true)}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          + New Task
        </button>

        {showForm && (
          <TaskForm
            projects={state.projects}
            onSave={data =>{
              if(data.project==''){
                alert('project is required!')
              }else{
              addTask(data).then(res => {
                dispatch({ type: 'ADD_TASK', payload: res.data });
                setShowForm(false);
              })
            }
            }
            }
            onCancel={() => setShowForm(false)}
          />
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {provided => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {state.tasks.map((task, idx) => (
                  <Draggable key={task._id} draggableId={task._id} index={idx}>
                    {prov => (
                      <div
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                      >
                        <TaskCard
                          task={task}
                          onToggle={t =>
                            editTask(t._id, {
                              status:
                                t.status === 'Completed'
                                  ? 'Pending'
                                  : 'Completed'
                            }).then(res =>
                              dispatch({ type: 'UPDATE_TASK', payload: res.data })
                            )
                          }
                          onDelete={t =>
                            removeTask(t._id).then(() =>
                              dispatch({ type: 'DELETE_TASK', payload: t._id })
                            )
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </main>
    </div>
  );
}

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route
        path="/*"
        element={
          token ? (
            <AppProvider>
              <Dashboard />
            </AppProvider>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;

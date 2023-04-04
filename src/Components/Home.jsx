import React, { useState, useEffect } from "react";
import Task from "./Task";

const Home = () => {
  const initialArray = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];
  const [tasks, setTasks] = useState(initialArray);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  console.log(tasks);
  //   console.log(title, desc);

  const submitHandler = (e) => {
    e.preventDefault();
    setTasks([...tasks, { title, desc }]);
    // localStorage.setItem('tasks', JSON.stringify(tasks));
    
    setTitle("");
    setDesc("");
  };

  const deleteTask = (index) => {
    const filteredArray = tasks.filter((val, i) => {
      return i !== index;
    });
    // console.log(filteredArray);
    setTasks(filteredArray);
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="container">
      <h1>DailyGoals</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          name=""
          id=""
          cols="30"
          rows="5"
          placeholder="Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        <button type="submit">Add</button>
      </form>

      {tasks.map((item, index) => (
        <Task
          key={index}
          title={item.title}
          desc={item.desc}
          deleteTask={deleteTask}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;

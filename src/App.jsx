import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim !== "") {
      setTodo([
        ...todo,
        { id: uuidv4(), name: input.toLowerCase(), isCompleted: false },
      ]);
      setInput("");
    }
  };

  const handleComplete = (id) => {
    // Create a new array with the updated todo
    const updatedTodos = todo.map((item) => {
      // If this is the todo we're looking for
      if (item.id === id) {
        // Return a new object with the isCompleted property toggled
        return { ...item, isCompleted: !item.isCompleted };
      }
      // Otherwise return the original todo unchanged

      return item;
    });

    // Update the state with our new array
    setTodo(updatedTodos);
  };

  console.log(todo);
  return (
    <>
      <div>
        <form>
          <input
            type="text"
            name="todos"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="add a todo..."
          />
          <button onClick={addTodo}>Submit</button>
        </form>

        <div>
          <h3>Your Todos</h3>
          <div className="todos">
            {todo
              .filter((item) => !item.isCompleted)
              .map((todos) => (
                <div className="todo" key={todos.id}>
                  <input
                    onChange={() => handleComplete(todos.id)}
                    type="checkbox"
                    checked={false}
                  />
                  <span>{todos.name}</span>
                </div>
              ))}

            {/* Then render all completed todos */}
            {todo
              .filter((item) => item.isCompleted)
              .map((todos) => (
                <div className="todo" key={todos.id}>
                  <input
                    onChange={() => handleComplete(todos.id)}
                    type="checkbox"
                    checked={true}
                  />
                  <span>
                    <strike>{todos.name}</strike>
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

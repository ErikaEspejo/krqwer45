import React, { Component } from 'react';

/// Modifica el componente para que se puedan agregar tareas, tachar y destacharlas y error de validacion en el input

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { id: 1, name: 'Sacar la ropa', done: false },
        { id: 2, name: 'Hacer la cama', done: true },
        { id: 3, name: 'Leer un rato', done: false },
      ],
      newTask: [],
      error: false,
    };

    this.submit = this.submit.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.handleDone = this.handleDone.bind(this);
  }

  handleNewTask = (event) => {
    this.setState({ newTask: event.target.value });
  };

  submit = (event) => {
    event.preventDefault();
    const { newTask } = this.state;
    if (newTask.length !== 0) {
      this.setState((prevState) => {
        return {
          tasks: [
            ...prevState.tasks,
            {
              id: prevState.tasks.length + 1,
              name: newTask,
              done: false,
            },
          ],
          newTask: '',
        };
      });
    } else {
      this.setState((prevState) => {
        return { error: !prevState.error };
      });
    }
  };

  handleDone = (id) => {
    const tasksUpdated = this.state.tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    this.setState({ tasks: tasksUpdated });
  };

  render() {
    const { tasks, error } = this.state;
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {tasks.map((task, index) => (
              <li
                key={task.id}
                onClick={() => {
                  this.handleDone(task.id);
                }}
                className={task.done ? 'done' : ''}
              >
                {task.name}
              </li>
            ))}
          </ul>
          <form onSubmit={this.submit}>
            <input
              type="text"
              id="new-task"
              onChange={this.handleNewTask}
              placeholder="Ingresa una tarea y oprime Enter"
              value={this.state.newTask}
              className={error ? 'error' : ''}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default App;

import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTaks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    const fetchTasks = async () => {
      // chamar a api
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10",
        {
          method: "GET",
        }
      );

      // pegar os dados que ela retorna
      const data = await response.json();
      // armazenar/pesistir esses dados no state
      setTaks(data);
    };
    // se quiser, voce pode chamar uma api para pegar tarefas
    // fetchTasks();
  }, []);

  function onTaskClick(taskid) {
    const newTasks = tasks.map((task) => {
      //preciso atualizar essa tarefa
      if (task.id == taskid) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      //nao preciso atualizar essa tarefa
      return task;
    });
    setTaks(newTasks);
  }

  function onDeleteTaskClick(taskid) {
    const newTasks = tasks.filter((task) => task.id !== taskid);
    setTaks(newTasks);
  }

  function onAddTaskSubit(title, description) {
    const newTasks = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    };
    setTaks([...tasks, newTasks]);
  }

  return (
    //isso faz com que ele cubra toda a area da pagina
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6 ">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubit={onAddTaskSubit} />

        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;

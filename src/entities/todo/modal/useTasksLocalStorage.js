const useTasksLocalStorage = () => {
  const savedTask = localStorage.getItem('tasks')

  const saveTasks = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }

  return {
    savedTask: saveTasks ? JSON.parse(savedTask) : null,
    saveTasks
  }
}

export default useTasksLocalStorage
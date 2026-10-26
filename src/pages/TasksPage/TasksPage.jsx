import { TasksProvider } from "@/entities/todo"
import ToDo from "@/widgest/ToDo"

const TasksPage = () => {
  return (
    <TasksProvider>
      <ToDo />
    </TasksProvider>
  )
}

export default TasksPage
import { createContext, useMemo } from "react";
import useTasks from "./useTasks";
import useIncompleteTaskScroll from "./useIncompleteTaskScroll";

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const {
    children
  } = props

  const {
    tasks,
    filteredTasks,
    deleteTask,
    deletAllButton,
    togleTaskCompete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask
  } = useTasks()

  const {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  } = useIncompleteTaskScroll(tasks)

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    deleteTask,
    deletAllButton,
    togleTaskCompete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  }), [
    tasks,
    filteredTasks,
    deleteTask,
    deletAllButton,
    togleTaskCompete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  ])

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )

}
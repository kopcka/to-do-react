import { useState, useRef, useCallback, useEffect, useMemo, useReducer } from 'react'
import tasksAPI from '@/shared/api/tasks/index'

const tasksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ALL': {
      return Array.isArray(action.tasks) ? action.tasks : state
    }
    case 'ADD': {
      return [...state, action.task]
    }
    case 'TOGGLE_COMPLETE': {
      const { id, isDone } = action

      return state.map((task) => {
        return task.id === id ? { ...task, isDone } : task
      })
    }
    case 'DELETE': {
      return state.filter((task) => task.id !== action.id)
    }
    case 'DELETE_ALL': {
      return []
    }
    default: {
      return state
    }
  }
}

const useTasks = () => {

  const [tasks, dispatch] = useReducer(tasksReducer, [])

  const [searchQuery, setSearchQuery] = useState('')

  const newTaskInputRef = useRef(null)

  const deletAllButton = useCallback(() => {
    const isConfirmed = confirm('Are u sure you want to delete all?')

    if (isConfirmed) {

      tasksAPI.deleteAll(tasks)
      .then(() => dispatch({ type: 'DELETE_ALL' }))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId) => {

    console.log('Удаляю задачу с id:', taskId) // ← проверка

    tasksAPI.delete(taskId)
    .then(() => dispatch({ type: 'DELETE', id: taskId }))
  }, [])

  const togleTaskCompete = useCallback((taskId, isDone) => {

    tasksAPI.togleCompete(taskId, isDone)
    .then(() => dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone: isDone }))
  }, [])
  
  const addTask = useCallback((title, callbackAfterAdding) => {

    const newTask = {
      title,
      isDone: false
    }

    tasksAPI.add(newTask)
    .then((addedTask) => {
      dispatch({ type: 'ADD', task: addedTask })
      callbackAfterAdding()
      setSearchQuery('')
      newTaskInputRef.current.focus()
    })
  }, [])

  useEffect(() => {
    newTaskInputRef.current.focus()

    tasksAPI.getAll().then((serverTasks) => dispatch({ type: 'SET_ALL', tasks: serverTasks }))
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()

    return clearSearchQuery.length > 0
    ? tasks.filter(( {title} ) => {
      return title.toLowerCase().includes(clearSearchQuery)
    })
    : null
  }, [searchQuery, tasks])


  return {
    tasks,
    filteredTasks,
    deleteTask,
    deletAllButton,
    togleTaskCompete,
    searchQuery,
    setSearchQuery,
    newTaskInputRef,
    addTask
  }
}

export default useTasks
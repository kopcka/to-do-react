import {ToDoItem, TasksContext} from "@/entities/todo"
import { memo, useContext } from "react"

const ToDoList = (props) => {
  const {styles} = props

  const {
      tasks,
      filteredTasks
    } = useContext(TasksContext)

  const hasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!hasTasks) {
    return <div className={`${styles.emptyMessage}`}>There are no tasks yet</div>
  }

  if (hasTasks && isEmptyFilteredTasks) {
    return <div className={`${styles.emptyMessage}`}>Tasks not found</div>
  }

  return (
    <ul className={`${styles.list}`}>
      {(filteredTasks ?? tasks).map(({ id, title, isDone}) => (
        <ToDoItem 
          className={`${styles.item}`}
          key={id}
          id={id}
          title={title}
          isDone={isDone}
        /> 
      ))}
    </ul>
  )
}

export default memo(ToDoList)
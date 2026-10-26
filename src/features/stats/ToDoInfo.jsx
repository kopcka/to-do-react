import { memo, useContext, useMemo } from "react"
import { TasksContext } from "@/entities/todo"

const ToDoInfo = (props) => {
  const {styles} = props

  const {
    tasks,
    deletAllButton
  } = useContext(TasksContext)

  const total = tasks.length
  const done = useMemo(() => {
    return tasks.filter(( {isDone} ) => isDone).length
  }, [tasks])

  return (
    <div className={`${styles.info}`}>
      <div className={`${styles.totalTasks}`}>
        Done {done} from {total}
      </div>
      {total > 0 && (
        <button 
        className={`${styles.deleteAllButton}`} 
        type="button"
        onClick={deletAllButton}
        >
          Delete all
        </button>
      )}
    </div>
  )
}


export default memo(ToDoInfo)
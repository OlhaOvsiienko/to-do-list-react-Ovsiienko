import styles from "./TaskItem.styles.module.css"

interface TaskItemProps {
    taskData: {
        task: string
        isDone: boolean
    }
    removeTask: () => void
    checkTask: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ taskData, removeTask, checkTask }) => {
    const { task, isDone } = taskData

    return (
        <div className={styles.taskField}>
            <div className={styles.leftContent}>
                <label style={{ textDecoration: isDone ? "line-through" : "none" }}>
                    <input
                        type="checkbox"
                        checked={isDone}
                        onChange={checkTask}
                    />
                    {task}
                </label>
            </div>
            <div>
                <button className={styles.buttonRemove} onClick={removeTask}>
                    Remove
                </button>
            </div>  
        </div>
    )
}

export default TaskItem
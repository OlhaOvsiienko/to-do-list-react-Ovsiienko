import { useState, useEffect } from "react"
import styles from './TaskItem.styles.module.css'

const TaskItem = ({taskData, removeTask, checkTask}) => {
    const {task, isDone} = taskData

    return (
        <div className={styles.taskField}>
            <div className={styles.leftContent}>
                <label style={{ textDecoration: isDone ? "line-through" : "none" }} >
                    <input
                        type='checkbox'
                        checked={isDone}
                        onChange={checkTask}
                        label={task}
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
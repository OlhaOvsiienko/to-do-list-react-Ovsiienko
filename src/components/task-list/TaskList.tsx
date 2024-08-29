import { useState, useEffect, useRef } from "react"
import TaskItem from "../task-item/TaskItem.tsx"
import styles from "./TaskList.styles.module.css"
interface Task {
    task: string
    isDone: boolean
}

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState<string>("")
    const prevTasksRef = useRef<Task[]>([])
    const isInitialLoad = useRef<boolean>(true)

    useEffect(() => {
        if (isInitialLoad.current) {
            isInitialLoad.current = false
            return
        }
        const savedTasks = localStorage.getItem("tasks")
        
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks) as Task[])
        }
    }, []);

    useEffect(() => {
        if (JSON.stringify(prevTasksRef.current) !== JSON.stringify(tasks)) {
            localStorage.setItem("tasks", JSON.stringify(tasks))
            prevTasksRef.current = tasks
        }
    }, [tasks])

    const handleInputTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        const taskInput = e.target.value.trim()
        if (taskInput) {
            setNewTask(taskInput)
        }
    }

    const addTask = () => {
        if (newTask) {
            const addedTask: Task = { task: newTask, isDone: false }
            setTasks((prevTasks) => [...prevTasks, addedTask])
            setNewTask("")
        }
    }

    const removeTask = (indexToRemove: number) => {
        setTasks((prevTasks) => prevTasks.filter((_, index) => index !== indexToRemove))
    }

    const checkTask = (index: number) => {
        setTasks((prevTasks) =>
            prevTasks.map((task, i) =>
                i === index ? { ...task, isDone: !task.isDone } : task
            )
        )
    }

    return (
        <div className={styles.field}>
            <div className={styles.title}>Task List</div>
            <div>
                <label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Enter the task"
                        value={newTask}
                        onChange={handleInputTask}
                    />
                    <button 
                        className={styles.buttonAdd}
                        onClick={addTask}>
                        Add
                    </button>
                </label>
            </div>
            <div>
                {tasks.length > 0 ? (
                    tasks.map((taskData, index) => (
                        <TaskItem 
                            key={index}
                            taskData={taskData}
                            removeTask={() => removeTask(index)}
                            checkTask={() => checkTask(index)}
                        />
                    ))
                ) : (
                    <p>No tasks available</p>
                )}
            </div>
        </div>
    )
}

export default TaskList



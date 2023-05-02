import { IoMdAddCircle } from 'react-icons/io'
import Task from './Task'

const TodoList = ({ tasks , input , setInput , addTask , deleteTask }) => <div className='w-[70%] bg-[#8b8b8b] py-4 px-9 rounded-[30px] scrollbar-hide overflow-y-scroll'>
  <div className='py-3 text-[#ffffff]'>TODAY&apos;S TASKS</div>
  <form className='flex items-center justify-center'>
    <input
      className='rounded-[10px] w-full p-[10px] border-none outline-none bg-[#ffffff] text-black mb-[10px]'
      placeholder='Add a task for today...'
      // take input from the form here
      value={input}
      onChange={e => setInput(e.target.value)}
    />
    <IoMdAddCircle
      // Add an onClick method
      onClick={addTask}
      className='text-[#ffffff] text-[50px] cursor-pointer ml-[20px] mb-[10px]'
    />
  </form>
  <ul>
    {/* Loop through all tasks here using the Task component */}
    {tasks.map(item => (
      <Task
        key={item.id}
        taskText={item.taskText}
        onClick={deleteTask(item.id)}
        />
    ))}
  </ul>
</div>

export default TodoList

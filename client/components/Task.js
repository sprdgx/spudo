import { BsFillTrashFill } from 'react-icons/bs'

const Task = ({ taskText , onClick }) => {
  return (
    <div className='flex items-center text-white'>
      <div className=' bg-[#ffffff] font-bold flex w-[100%] rounded-xl mb-[10px] flex-1'>
        <div className='flex items-center justify-between w-full p-[10px] text-sm text-black '>
          {taskText}
        </div>
      </div>
      <BsFillTrashFill
        className='text-2xl cursor-pointer ml-10'
        onClick={onClick}
      />
    </div>
  )
}

export default Task

import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import TaskAbi from '../../blockchain/build/contracts/TaskContract.json'
import { TaskContractAddress } from '../config'

import { ethers } from 'ethers'
import { useEffect, useState } from 'react'




/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/



export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isCurrentAccount, setIsCurrentAccount] = useState('')
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    connectWallet()
    getAllTasks()
  })



  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try {
      const ethereum = window.ethereum
      if (!ethereum) {
        console.log('Metamask Not Found')
        return
      }
      let chainId = await ethereum.request({ method: 'eth_chainId' })
      console.log('connected to chainId :', chainId)
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('found Account :', accounts[0])
      setIsLoggedIn(true)
      setIsCurrentAccount(accounts[0])
    } catch (error) {
      console.log(error)
    }
  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {
    try {
      const ethereum = window.ethereum
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
        let allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)
        console.log(allTasks)
      } else {
        console.log('ethereum object does not exist')
      }
    } catch (error) {
      console.log('error:', error)
    }
  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault()
    let task = {
      taskText: input,
      isDeleted: false
    }
    try {
      const ethereum = window.ethereum
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
        TaskContract.addTask(task.taskText, task.isDeleted)
          .then(res => {
            setTasks([...tasks, task])
            console.log('Added Task')
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        console.log('Ethereum Object Does Not Exist ! :3 ')
      }
    } catch (error) {
      console.log('error:', error)
    }
    setInput('')
  }


  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {
    try {
      const ethereum = window.ethereum
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
       const deleteTaskTX = await TaskContract.deleteTask(key , true)
       console.log('Task Deleted Succesfully: ' , deleteTaskTX )
       let allTasks = await TaskContract.getMyTasks() 
       setTasks(allTasks)
      } else {
        console.log('ethereum does not exist :3')
      }
    } catch(error) {
      console.log('error:', error)
    }
  }

  return (
    <div className='bg-[#000000] h-screen w-screen flex justify-center py-6'>
      {!isLoggedIn ? <ConnectWalletButton connectWallet={connectWallet} /> :
        'is this the correct network?' ? <TodoList tasks={tasks} setInput={setInput} addTask={addTask} input={input} deleteTask={deleteTask} /> : <WrongNetworkMessage />}
    </div>
  )
}


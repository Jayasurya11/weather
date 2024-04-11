import React from 'react'
import { WeatherDetails } from '../pages/WeatherPage'

import { useDispatch} from 'react-redux'
import { AppDispatch} from '../store/store'
import {deleteItem} from "../store/placesSlice.ts"
import { RiDeleteBin6Line } from "react-icons/ri";
type Props={
    data:WeatherDetails
}
const WeatherCard:React.FC<Props> = ({data}) => {
  
    const useAppDispatch = useDispatch.withTypes<AppDispatch>()
    const dispatcher=useAppDispatch()
    const handleDelete=()=>{
      dispatcher(deleteItem(data))
    }
  return (
    <div>
        <div  className="block max-w-sm p-6 h-[200px] bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 ">
          
          <div className='flex items-center justify-between'>
            <div className='flex flex-col justify-evenly'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data.place}</h5>
            
              <p className="font-normal text-gray-700 dark:text-gray-400"><span className=' font-semibold'>Temperature:</span>{data.temperature}&deg;C</p>
              <p className="font-normal text-gray-700 dark:text-gray-400"><span className=' font-semibold'>Humidity:</span>{data.humidity}%</p>
              <p className="font-normal text-gray-700 dark:text-gray-400"><span className=' font-semibold'>Condition:</span>{data.description[0].toUpperCase()+data.description.substring(1)}</p>
              <p className="font-normal text-gray-700 dark:text-gray-400"><span className=' font-semibold'>Windspeed:</span>{data.speed}miles/hr</p>
            </div>
            <div>
              <button onClick={handleDelete} className='tex-2xl w-full text-red-600 font-bold flex justify-end'><RiDeleteBin6Line/></button>
              <img src={`/assets/og/${data.icon.substring(0,2)}d@2x.png`} className='w-[100px]'  alt="icon"/>
            </div>
          
          </div>
        </div>
    </div>
  )
}

export default WeatherCard
import React from 'react'
import { useState } from 'react'

import { useDispatch, useSelector} from 'react-redux'
import { AppDispatch,RootState } from '../store/store'
import WeatherCard from '../components/WeatherCard';
import { CiSearch } from "react-icons/ci";
import { add } from '../store/placesSlice'
import toast from 'react-hot-toast';

export interface WeatherDetails{
    place:string,
    temperature:number,
    humidity:number,
    description:string,
    speed:number
    icon:string
}

const WeatherPage = () => {
    const api_key="d5ce030ebfa4e9c679f55b05f42be330";
    const [place,setPlace]=useState<string>("");
    const useAppDispatch = useDispatch.withTypes<AppDispatch>()
    const useAppSelector = useSelector.withTypes<RootState>()
    const placesArr=useAppSelector((state)=>state.places);
    const dispatcher=useAppDispatch();
   
    
    const handleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        
        let url=`https://api.openweathermap.org/data/2.5/weather?q=${place}&units=Metric&appid=${api_key}`;
        let response =await fetch(url);
        const data=await response.json();
        console.log(data)
        
        if(data.cod===200){
            var details:WeatherDetails={
                place:data.name,
                temperature:data.main.temp,
                humidity:data.main.humidity,
                description:data.weather[0].description,
                speed:data.wind.speed,
                icon:data.weather[0].icon
                }
            if(placesArr.filter((item)=>item.place===details.place).length>0){
                toast.error("Already exits")
            }
            else{
      
                dispatcher(add(details))
                setPlace("");
            }
        }
        else{
            toast.error(data.message)
        }
        
        
    }
    
  return (
    
    <div className='flex justify-start items-center flex-col min-h-[85vh] bg-gray-300'>
        <div className='my-6'>
            
        <p className='my-2'>Find weather condition at any place...</p>
        <form onSubmit={handleSubmit} className=' bg-white p-4 rounded-xl flex items-center'>

            <div className="relative h-11 w-full min-w-[200px]">
                <input placeholder="Type here..." value={place} onChange={(e)=>setPlace(e.target.value)}
                    className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                <label
                    className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Add Place
                </label>
            </div>

            <button type='submit' className='rounded-full border-2  bg-red-500 text-white font-bold border-red-500 h-8 w-8  flex items-center text-md justify-center ml-2 hover:scale-105 hover:shadow-xl  '><CiSearch/></button>
        </form>  
        </div> 
        {placesArr.length>0?<p className='font-bold text-xl text-left w-full px-4 lg:px-12'>Added Places</p>:null}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full px-4 my-4 lg:px-12'>{placesArr.length>0?(placesArr.map((item,index)=><WeatherCard data={item} key={index}/>)):<p className='font-bold text-xl'>No Places Added</p>}</div>  
    </div>
  )
}

export default WeatherPage
import { createSlice ,PayloadAction } from "@reduxjs/toolkit";
import { WeatherDetails } from "../pages/WeatherPage";
const initialState:WeatherDetails[]=[];

const placeSlice= createSlice({
    name:"places",
    initialState,
    reducers:{
        add:(state,action:PayloadAction<WeatherDetails>)=>{
            state.push(action.payload)
        },
        deleteItem:(state,action:PayloadAction<WeatherDetails>)=>{
           
            
            
            const deleted=state.filter((item)=>item.place!==action.payload.place)
            
            state.splice(0,state.length)
            for(let i=0;i<deleted.length;i++){
                state.push(deleted[i])
            }
        }
    },


})

export const {add,deleteItem}=placeSlice.actions;
export default placeSlice.reducer;
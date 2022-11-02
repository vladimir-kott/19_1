import {createSlice} from "@reduxjs/toolkit"
import professionService from "../services/profession.service";


const professionsSlice = createSlice({
    name:"professions",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professionsResived: (state, action) => {
            state.entities = action.payload;
            //state.lastFetch = Date.now();
            state.isLoading = false;
        },
        professionsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
})


const {reducer:professionsReducer, actions} = professionsSlice
const {professionsRequested, professionsResived, professionsRequestFailed} = actions

export const loadProfessionsList = () => async (dispatch, getState) => {
    //const {}
    dispatch(professionsRequested())
    try{
        const {content} = await professionService.get();
        dispatch(professionsResived(content))
    }
    catch (error){
        dispatch(professionsRequestFailed(error.message))
    }
}

export const getProfessionsByIds = (profesionsIds) => (state) => {
    return state.qualities.entities.find((p) => p._id === profesionsIds)
} 

export const getProfessions = () => (state) => 
    state.professions.entities

export const getProfessionsLoadingStatus = () => (state) => 
    state.professions.isLoading

export default professionsReducer
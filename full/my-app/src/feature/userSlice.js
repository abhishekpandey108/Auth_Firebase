import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
//import {auth} from '../firebase/firebaseConfig';
import { firebaseRegister, firebaseLogin, firebaseLogout } from './userService';
const initialState = {
    user: null,
    email:'',
    isLoading: true,
    isError:false,
    isVerified: false,
}

export const signUp = createAsyncThunk('user/signup', async(user,thunkAPI)=>{
    const res = await(firebaseRegister(user))
    if(res.user.uid){
        console.log('user id ', res.user.uid)
    }
    return res;
})

export const login = createAsyncThunk('user/login', async(user, thunkAPI)=>{
    const res = await(firebaseLogin(user));
    if(res.user.uid){
       console.log("Authorized User", res)
    }
    return res;
})

export const logout = createAsyncThunk('user/logout', async(thunkAPI)=>{
    try {
        const res = await firebaseLogout();
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
    }
})

export const userSlice = createSlice({
    name: 'user',
    initialState : initialState,
    reducers: {
        setAuthData: (state, action)=>{
            state.user = action.payload.user;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.password = action.payload.password;
        },
        resetAuthData :(state)=>{
            state.name = '';
            state.email = '';
            state.password = '';
        },
        setLoading: (state,action)=>{
            state.isLoading = action.payload;
        }
    
    },

    extraReducers: (builder) => {
        builder
        .addCase(signUp.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(signUp.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(signUp.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isVerified = true;
            state.user = action.payload;
        })
        .addCase(login.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(login.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isVerified = true;
            state.user = action.payload;
            state.email = action.payload.user.email;
        })
        .addCase(logout.pending,(state)=>{
            state.isLoading = true;
        })
        .addCase(logout.rejected,(state)=>{
            state.isLoading = false;
            state.isError = true;
        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isVerified = false;
            state.user = null;
        })
    }
})

export const {setAuthData,resetAuthData,setLoading} = userSlice.actions
export default userSlice.reducer

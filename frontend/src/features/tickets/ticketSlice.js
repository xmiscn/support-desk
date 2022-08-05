import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';
import { extractErrorMessage } from '../../utils';

const initialState = {
  tickets: [],
  ticket: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const createTicket = createAsyncThunk(
  'ticket/create',
  async (ticketData, thunkAPI) => {
    //console.log(user);
    try {
      //Get the token from the state via thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      //console.log(token);
      return await ticketService.createTicket(ticketData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getTickets = createAsyncThunk(
  'ticket/getAll',
  async (_, thunkAPI) => {
    //console.log(user);
    try {
      //Get the token from the state via thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      //console.log(token);
      return await ticketService.getTickets(token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const getTicket = createAsyncThunk(
  'ticket/get',
  async (ticketId, thunkAPI) => {
    //console.log(user);
    try {
      //Get the token from the state via thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      //console.log(token);
      return await ticketService.getTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const closeTicket = createAsyncThunk(
  'ticket/close',
  async (ticketId, thunkAPI) => {
    //console.log(user);
    try {
      //Get the token from the state via thunkAPI
      const token = thunkAPI.getState().auth.user.token;
      //console.log(token);
      return await ticketService.closeTicket(ticketId, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(extractErrorMessage(error));
    }
  }
);

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTickets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tickets = action.payload;
      })
      .addCase(getTickets.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ticket = action.payload;
      })
      .addCase(getTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tickets.map((ticket) =>
          ticket._id === action.payload._id
            ? (ticket.status = 'Closed')
            : ticket
        );
      });
  },
});

export default ticketSlice.reducer;

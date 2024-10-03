
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
const initialState = {
  product: [],
  loading: false,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  'fetch/product',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get('http://localhost:3000/api/getproducts');
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  'create/product',
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post('http://localhost:3000/api/addproduct', formData , {
        headers : {
          Authorization : `Bearer ${localStorage.getItem('token')}`
        }
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const productSlice = createSlice({
  name: 'product',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.product = action.payload.product;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      }).addCase(createProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false
       toast.success(
        'Product added successfull'
       )
      })
      .addCase(createProduct.rejected, (state, action) => {
        console.log(action.payload);
        state.loading = false;
      });
  },
});

export default productSlice.reducer ;

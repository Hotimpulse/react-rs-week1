import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFormInputs } from '../interfaces/IFormInputs';

const initialState: IFormInputs = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTerms: false,
  picture: '',
  country: '',
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
    updatePicture: (state, action: PayloadAction<string>) => {
      state.picture = action.payload;
    },
    updateCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
  },
});

export const { updateFormData, updatePicture, updateCountry } =
  formDataSlice.actions;
export default formDataSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string;
  country: string;
}

const initialState: FormData = {
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

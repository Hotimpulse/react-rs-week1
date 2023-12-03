import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
  age: number | null;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  acceptTerms: boolean;
  picture: string | null;
  country: string;
}

const initialState: FormData = {
  name: '',
  age: null,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  acceptTerms: false,
  picture: null,
  country: '',
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    updateFormData: (state, action: PayloadAction<FormData>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { updateFormData } = formDataSlice.actions;
export default formDataSlice.reducer;

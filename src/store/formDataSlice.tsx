import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FormData {
  name: string;
}

const initialState: FormData = {
  name: '',
};

import { useDispatch } from 'react-redux';
import Select from 'react-select';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { updateCountry, updatePicture } from '../store/formDataSlice';
import NavBar from './NavBar';
import MyButtonComponent from './MyButtonComponent';
import { useState } from 'react';
import { IFormInputs } from '../interfaces/IFormInputs';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  age: yup
    .number()
    .positive('Age must be a positive number')
    .integer('Age must be an integer')
    .required('Age is required'),
  email: yup
    .string()
    .email('Email format is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(8)
    .max(32)
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/,
      'Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('It is required to confirm your password'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup.boolean().required('It is required to accept the T&C'),
  picture: yup.string().required('Selecting a picture is required'),
  country: yup.string().required('Selecting a country is required'),
});

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fieldStyle =
    'flex flex-col mb-2 text-left bg-amber-200 rounded border-black border-2 w-96 mx-auto';

  const [file, setFile] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  // eslint-disable-next-line prefer-const
  let [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFile(base64String);
        dispatch(updatePicture(base64String));
      };

      reader.readAsDataURL(selectedFile);
    }
  };

  const handleCountryChange = (
    selectedOption: { label: string; value: string } | null
  ) => {
    selectedCountry = (selectedOption as { value: string })?.value || null;
    setSelectedCountry(selectedCountry);
    dispatch(updateCountry(selectedCountry!));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj: IFormInputs = {};

    formData.forEach((value, key) => {
      formDataObj[key] = key === 'acceptTerms' ? value === 'on' : value;
    });

    const errors: { [key: string]: string } = {};
    if (!formDataObj.name) {
      errors.name = 'This field is required';
      setError(errors.name);
    }

    if (!formDataObj.age) {
      errors.age = 'This field is required';
      setError(errors.age);
    }

    if (!formDataObj.email) {
      errors.email = 'This field is required';
      setError(errors.email);
    }

    if (!formDataObj.password) {
      errors.password = 'This field is required';
      setError(errors.password);
    }

    if (!formDataObj.confirmPassword) {
      errors.confirmPassword = 'This field is required';
      setError(errors.confirmPassword);
    }

    if (!formDataObj.gender) {
      errors.gender = 'This field is required';
      setError(errors.gender);
    }

    if (!formDataObj.acceptTerms) {
      errors.acceptTerms = 'This field is required';
      setError(errors.acceptTerms);
    }

    if (!formDataObj.picture) {
      errors.picture = 'This field is required';
      setError(errors.picture);
    }

    if (!formDataObj.country) {
      errors.country = 'This field is required';
      setError(errors.country);
    }

    if (Object.keys(errors).length > 0) {
      console.error('Validation errors:', errors);
      return;
    }

    schema
      .validate(formDataObj, { abortEarly: false })
      .then((validatedData) => {
        console.log(validatedData);
        navigate('/');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <NavBar />
      <h1 className="mb-5">Uncontrolled Form</h1>
      <form onSubmit={handleSubmit}>
        <div className={fieldStyle}>
          <label htmlFor="name">Name:</label>
          <input
            className=""
            type="text"
            placeholder="Enter your name"
            name="name"
          />
          <p className="text-red-600">{error}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="age">Age:</label>
          <input type="number" placeholder="Enter your age" name="age" />
          <p className="text-red-600">{error}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter your email" name="email" />
          <p className="text-red-600">{error}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again"
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="gender">Your gender:</label>
          <select name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          <label htmlFor="acceptTerms">Accept Terms and Conditions:</label>
          <input type="checkbox" name="acceptTerms" id="acceptTerms" />
        </div>
        <div className="flex justify-center gap-3 mb-3 items-center">
          <label htmlFor="picture">Upload a picture:</label>
          <input
            type="file"
            name="picture"
            id="picture"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-center gap-3 mb-3 items-center">
          <label htmlFor="country">Select Country:</label>
          <Select
            options={[
              { label: 'Country 1', value: 'Country 1' },
              { label: 'Country 2', value: 'Country 2' },
              { label: 'Country 3', value: 'Country 3' },
            ]}
            name="country"
            id="country"
            onChange={handleCountryChange}
          />
        </div>
        <MyButtonComponent
          label="Submit"
          type="submit"
          className={`text-black-600 bg-amber-200`}
        />
      </form>
    </div>
  );
}

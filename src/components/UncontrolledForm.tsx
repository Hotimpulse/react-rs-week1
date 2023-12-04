import { useDispatch } from 'react-redux';
import Select from 'react-select';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { updateCountry, updatePicture } from '../store/formDataSlice';
import NavBar from './NavBar';
import MyButtonComponent from './MyButtonComponent';
import { useState, useEffect } from 'react';
import { IFormInputs } from '../interfaces/IFormInputs';

interface ValidationErrors {
  [key: string]: string;
}

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
  // const [error, setError] = useState<string>('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );

  useEffect(() => {}, [validationErrors, setValidationErrors]);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formDataObj: IFormInputs = {};

    formData.forEach((value, key) => {
      formDataObj[key] = key === 'acceptTerms' ? value === 'on' : value;
    });

    try {
      await schema.validate(formDataObj, { abortEarly: false });

      console.log('Form data is valid', formDataObj);
      navigate('/');
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const yupErrors: ValidationErrors = {};

        validationError.inner.forEach((error) => {
          yupErrors[error.path!] = error.message;
        });
        setValidationErrors(yupErrors);
      }
    }
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
          <p className="text-red-600">{validationErrors.name}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="age">Age:</label>
          <input type="number" placeholder="Enter your age" name="age" />
          <p className="text-red-600">{validationErrors.age}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter your email" name="email" />
          <p className="text-red-600">{validationErrors.email}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
          />
          <p className="text-red-600">{validationErrors.password}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Enter your password again"
          />
          <p className="text-red-600">{validationErrors.confirmPassword}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="gender">Your gender:</label>
          <select name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="text-red-600">{validationErrors.gender}</p>
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
          <p className="text-red-600">{validationErrors.picture}</p>
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
          <p className="text-red-600">{validationErrors.country}</p>
        </div>
        <MyButtonComponent
          label="Submit"
          type="submit"
          className={`text-black-600 bg-amber-200 ${
            Object.keys(validationErrors).length > 0 ? 'disabled' : ''
          }`}
        />
      </form>
    </div>
  );
}

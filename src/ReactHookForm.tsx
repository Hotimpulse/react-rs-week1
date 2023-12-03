import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDropzone } from 'react-dropzone';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';

interface IFormInputs {
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

export default function ReactHookForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IFormInputs>({ resolver: yupResolver(schema) });

  const fieldStyle =
    'flex flex-col mb-2 text-left bg-amber-200 rounded border-black border-2 w-96 mx-auto';

  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    console.log({ data });
    navigate('/');
    reset();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg'],
    },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setValue('picture', reader.result as string);
      };
      reader.readAsDataURL(file);
    },
  });

  const navigate = useNavigate();

  const countryOptions = ['Country 1', 'Country 2', 'Country 3'];

  return (
    <>
      <h1 className="mb-5">React Hook Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={fieldStyle}>
          <label htmlFor="name">Name:</label>
          <input
            className=""
            type="text"
            placeholder="Enter your name"
            {...register('name')}
          />
          <p className="text-red-600">{errors.name?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            placeholder="Enter your age"
            {...register('age')}
          />
          <p className="text-red-600">{errors.age?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          <p className="text-red-600">{errors.email?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register('password')}
          />
          <p className="text-red-600">{errors.password?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            placeholder="Enter your password again"
            {...register('confirmPassword')}
          />
          <p className="text-red-600">{errors.confirmPassword?.message}</p>
        </div>
        <div className={fieldStyle}>
          <label htmlFor="gender">Your gender:</label>
          <select {...register('gender')} id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <p className="text-red-600">{errors.gender?.message}</p>
        </div>
        <div className="flex justify-center gap-3 mb-3">
          <label htmlFor="acceptTerms">Accept Terms and Conditions:</label>
          <input
            type="checkbox"
            {...register('acceptTerms')}
            id="acceptTerms"
          />
          <p className="text-red-600">{errors.acceptTerms?.message}</p>
        </div>
        <div className="flex justify-center gap-3 mb-3 items-center">
          <label htmlFor="picture">Upload a picture:</label>
          <div {...getRootProps()} className="bg-amber-200 p-4 dropzone">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here...</p>
            ) : (
              <div>
                <p>Drag 'n' drop an image here, or click to select one</p>
                <em>(Only *.jpeg and *.png images will be accepted)</em>
              </div>
            )}
          </div>
        </div>
        <p className="text-red-600">{errors.picture?.message}</p>
        <div className="flex justify-center gap-3 mb-3 items-center">
          <label htmlFor="country">Select Country:</label>
          <Select
            options={countryOptions.map((country) => ({
              label: country,
              value: country,
            }))}
            name="country"
            id="country"
            onChange={(selectedOption) =>
              setValue('country', selectedOption?.value || '')
            }
          />
          <p className="text-red-600">{errors.country?.message}</p>
        </div>
        <button type="submit" className="text-black-600 bg-amber-200">
          Submit
        </button>
      </form>
    </>
  );
}

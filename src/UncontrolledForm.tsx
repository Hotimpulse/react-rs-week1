import { FormEvent } from 'react';

export default function UncontrolledForm() {
  const fieldStyle =
    'flex flex-col mb-2 text-left bg-amber-200 rounded border-black border-2';
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
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
        </div>
        <div className={fieldStyle}>
          <label htmlFor="age">Age:</label>
          <input type="number" placeholder="Enter your age" name="age" />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="email">Email:</label>
          <input type="email" placeholder="Enter your email" name="email" />
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
          <label htmlFor="password">Confirm password:</label>
          <input
            type="password"
            placeholder="Enter your password again"
            name="password"
          />
        </div>
        <div className={fieldStyle}>
          <label htmlFor="gender">Your gender:</label>
          <select name="gender" id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit" className="text-black-600 bg-amber-200">
          Submit
        </button>
      </form>
    </div>
  );
}

// - name (validate for first uppercased letter)
// - age (should be number, no negative values)
// - email (validate for email)
// - 2 passwords (should match, display the password strength: 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character)
// - gender (you can use radio buttons or select control)
// - accept T&C (checkbox)
// - input control to upload picture (validate size and extension, allow png jpeg, save in redux store as base64)
// - autocomplete control to select country (all countries should be stored in the Redux store) Form should contain labels, which should be connected with inputs (look at **htmlFor**)

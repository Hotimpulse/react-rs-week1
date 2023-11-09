import { ChangeEvent, FormEvent } from 'react';
import MyButton from '../components/ButtonComponent';
import { useMyAppContext } from '../app/AppContext';

interface ISearchComponentProps {
  onSubmit: (data: string) => void;
}

export default function SearchComponent({ onSubmit }: ISearchComponentProps) {
  const { searchData, dispatch } = useMyAppContext();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    // setSearchData(event.target.value);
    dispatch({ type: 'SET_SEARCH_DATA', payload: event.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // localStorage.setItem('searchData', searchData);
    onSubmit(searchData);
  };

  return (
    <>
      <form className="space-y-5 flex flex-col" onSubmit={handleSubmit}>
        <input
          className="border 1px red flex-auto mr-5 text-blue-600 w-full pl-2 rounded"
          type="text"
          name="search"
          placeholder="(i.e. Pikachu)"
          value={searchData}
          onChange={handleChange}
        />
        <MyButton label="Search" />
      </form>
    </>
  );
}

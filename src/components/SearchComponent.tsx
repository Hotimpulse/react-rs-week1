import React, { ChangeEvent, FormEvent } from 'react';
//components
import MyButton from '../components/ButtonComponent';

interface ISearchComponentProps {
  onSubmit: (data: string) => void;
  searchData: string;
  setSearchData: (data: string) => void;
}

export default function SearchComponent({
  onSubmit,
  searchData,
  setSearchData,
}: ISearchComponentProps) {
  // const throwError = () => {
  //   throw new Error('You have an error!');
  // };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchData(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem('searchData', searchData);
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
      {/* <MyButton label="Error" onClick={throwError} /> */}
    </>
  );
}

// export class SearchComponent extends React.Component<
//   SearchComponentProps,
//   State
// > {
//   state: State = {
//     searchData: '',
//     data: null,
//     loading: false,
//     error: null,
//     pokemonData: {
//       name: '',
//       species: {
//         name: '',
//       },
//       img: '',
//       types: [],
//       stats: [
//         {
//           base_stat: '',
//         },
//       ],
//       sprites: {
//         front_default: '',
//       },
//     },
//     searchHistory: [''],
//     showSearchComponent: false,
//   };

//   handleGoBack = () => {
//     this.setState({
//       showSearchComponent: true,
//       data: null,
//       error: null,
//       loading: false,
//     });
//   };

//   static async fetchPokemonList(): Promise<Pokemon[]> {
//     try {
//       const response = await fetch(
//         `https://pokeapi.co/api/v2/pokemon/?limit=20`
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP request failed! Status: ${response.status}`);
//       }

//       const data: { results: { name: string; url: string }[] } =
//         await response.json();

//       const pokemonList: Pokemon[] = await Promise.all(
//         data.results.map(async (pokemon) => {
//           const detailsResponse = await fetch(pokemon.url);
//           const detailsData: PokemonApiResponse = await detailsResponse.json();

//           return {
//             name: pokemon.name,
//             img: detailsData.sprites.front_default || '',
//           };
//         })
//       );

//       return pokemonList;
//     } catch (error) {
//       throw new Error('Error fetching data from the server');
//     }
//   }

//   async componentDidMount() {
//     try {
//       const pokemonList = await SearchComponent.fetchPokemonList();
//       this.setState({
//         data: pokemonList,
//         loading: false,
//         error: null,
//       });
//       if (localStorage.getItem('searchData')) {
//         this.setState({ searchData: localStorage.getItem('searchData') || '' });
//       }
//     } catch (error) {
//       this.setState({
//         data: null,
//         loading: false,
//         error: 'Error fetching data from the server',
//       });
//     }
//   }

//   handleChange = (event: FormEvent<HTMLInputElement>) => {
//     const pokemonName = event.currentTarget.value;
//     this.setState({ searchData: pokemonName.toLowerCase() }, () => {
//       console.log(this.state.searchData);
//       localStorage.setItem('searchData', this.state.searchData);
//     });
//   };

//   handleSubmit = async (event: FormEvent<HTMLInputElement>) => {
//     event.preventDefault();
//     const { searchData } = this.state;
//     if (!searchData) {
//       return;
//     }

//     try {
//       const pokemonApiResponse = await PokemonData.fetchPokemonData(searchData);
//       this.props.onData(pokemonApiResponse);
//       this.setState({
//         data: [],
//       });
//     } catch (error) {
//       this.setState({
//         data: null,
//         loading: false,
//         error: 'Error fetching data from the server',
//       });
//     }
//   };

// render() {
//   const { searchData, data, loading, error, showSearchComponent } =
//     this.state;
//   if (showSearchComponent) {
//     return <PokemonComponent />;
//   }
//   return (
//     <>
//       {data && data.length > 0 ? (
//         <>
//           <div className="bg-[#bada55] text-[22px] text-color-red h-full flex-auto p-12 w-full rounded">
//             <div className="flex-auto space-y-5 mb-10">
//               <h2 className="mr-5 flex">Search for a Pokemon:</h2>
//               <form
//                 className="space-y-5 flex flex-col"
//                 onSubmit={this.handleSubmit as React.FormEventHandler}
//               >
//                 <input
//                   className="border 1px red flex-auto mr-5 text-blue-600 w-full pl-2 rounded"
//                   type="text"
//                   name="search"
//                   placeholder="(i.e. Pikachu)"
//                   value={searchData}
//                   onChange={this.handleChange}
//                 />
//                 <MyButton label="Search" />
//                 <MyButton label="Error" onClick={this.throwError} />
//               </form>
//             </div>
//           </div>
//           <div className="bg-[#55c6da] grid p-6 w-full rounded items-center justify-center">
//             <ul className="grid md:grid-cols-7 sm:grid-cols-4 md:gap-8 sm:gap-2 items-center justify-center">
//               {data?.map((pokemon: Pokemon) => (
//                 <li key={pokemon.name}>
//                   <img
//                     className="md:w-24"
//                     src={pokemon.img}
//                     alt={pokemon.name}
//                   />
//                   <span>{pokemon.name}</span>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       ) : (
//         <>
//           {loading && <LoaderSpinner />}
//           {error ? (
//             <div className="text-red-500 p-2">
//               <h2>Something went wrong</h2>
//               {error && <p>{error.toString()}</p>}
//               <MyButton label={'Go back'} onClick={this.handleGoBack} />
//             </div>
//           ) : (
//             <PokemonData pokemonName={searchData} />
//           )}
//         </>
//       )}
//     </>
//   );
// }
// }
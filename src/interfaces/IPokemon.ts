export interface IPokemon {
  name?: string;
  species?: {
    name: string;
  };
  img?: string;
  sprites?: {
    front_default: string | null;
  };
  types?: {
    type: {
      name: string;
    };
  }[];
  stats?: {
    stat?: {
      name?: string;
    };
    base_stat?: string;
  }[];
}

// name: string;
// species: {
//   name: string;
// };
// sprites: {
//   front_default: string;
// };
// types: {
//   type: {
//     name: string;
//   };
// }[];
// stats: {
//   stat?: {
//     name?: string;
//   };
//   base_stat?: string;
// }[];
// img: string;

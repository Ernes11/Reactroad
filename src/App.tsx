// import React, {
//   useState,
//   useEffect,
//   useRef,
//   useReducer,
//   useCallback,
//   useMemo,
// } from "react";

// import axios from "axios";

// // const initialStories = [
// //   {
// //     title: "React",
// //     url: "https://reactjs.org/",
// //     author: "Jordan Walke",
// //     num_comments: 3,
// //     points: 4,
// //     objectID: 0,
// //   },
// //   {
// //     title: "Redux",
// //     url: "https://redux.js.org/",
// //     author: "Dan Abramov, Andrew Clark",
// //     num_comments: 2,
// //     points: 5,
// //     objectID: 1,
// //   },
// // ];

// const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

// const useSemiPersistentState = (
//   key: string,
//   initialState: string
// ): [string, (newValue: string) => void] => {
//   const isMounted = useRef(false);
//   const [value, setValue] = React.useState(
//     localStorage.getItem(key) || initialState
//   );

//   useEffect(() => {
//     if (!isMounted.current) {
//       isMounted.current = true;
//     } else {
//       localStorage.setItem(key, value);
//     }
//   }, [value, key]);

//   return [value, setValue];
// };

// const storiesReducer = (state: StoriesState, action: StoriesAction) => {
//   switch (action.type) {
//     case "STORIES_FETCH_INIT":
//       return {
//         ...state,
//         isLoading: true,
//         isError: false,
//       };

//     case "STORIES_FETCH_SUCCESS":
//       return {
//         ...state,
//         isLoading: false,
//         isError: false,
//         data: action.payload,
//       };
//     case "STORIES_FETCH_FAILURE":
//       return {
//         ...state,
//         isLoading: false,
//         isError: true,
//       };

//     case "REMOVE_STORY":
//       return {
//         ...state,
//         data: state.data.filter(
//           (story) => action.payload.objectID !== story.objectID
//         ),
//       };
//     default:
//       throw new Error();
//   }
// };

// //================== Adding typescript elements into React===============//////////////////
// type Story = {
//   objectID: string;
//   url: string;
//   title: string;
//   author: string;
//   num_comments: number;
//   points: number;
// };
// type Stories = Array<Story>;

// type StoriesState = {
//   data: Stories;
//   isLoading: boolean;
//   isError: boolean;
// };
// interface StoriesFetchInitAction {
//   type: "STORIES_FETCH_INIT";
// }

// interface StoriesFetchSuccessAction {
//   type: "STORIES_FETCH_SUCCESS";
// }
// interface StoriesFetchFailureAction {
//   type: "STORIES_FETCH_FAILURE";
// }

// interface StoriesRemoveAction {
//   type: "REMOVE_STORY";
//   payload: Story;
// }

// type StoriesAction =
//   | StoriesFetchInitAction
//   | StoriesFetchSuccessAction
//   | StoriesFetchFailureAction
//   | StoriesRemoveAction;

// type ListProps = {
//   list: Stories;
//   onRemoveItem: (item: Story) => void;
// };
// type ItemsProps = {
//   item: Story;
//   onRemoveItem: (item, Story) => void;
// };

// const getSumComments = (stories) => {
//   return stories.data.reduce((result, value) => result + value.num_comments, 0);
// };

// // const getAsyncStories = () =>
// //   new Promise((resolve) =>
// //     setTimeout(() => resolve({ data: { stories: initialStories } }, 2000))
// //   );

// // ========================API=================================////

// const App = () => {
//   const [searchTerm, setSearchTerm] = useSemiPersistentState("search", "React");
//   // const [stories, setStories] = useState([]);
//   // const [isLoading, setIsLoading] = useState(false);
//   // const [isError, setIsError] = useState(false);

//   const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);

//   const [stories, dispatchStories] = useReducer(storiesReducer, {
//     data: [],
//     isLoading: false,
//     isError: false,
//   });

//   const handleFetchStories = React.useCallback(async () => {
//     dispatchStories({ type: "STORIES_FETCH_INIT" });

//     try {
//       const result = await axios.get(url);

//       dispatchStories({
//         type: "STORIES_FETCH_SUCCESS",
//         payload: result.data.hits,
//       });
//     } catch {
//       dispatchStories({ type: "STORIES_FETCH_FAILURE" });
//     }
//   }, [url]);

//   useEffect(() => {
//     handleFetchStories();
//   }, [handleFetchStories]);

//   const handleRemoveStory = (item: Story) => {
//     dispatchStories({
//       type: "REMOVE_STORY",
//       payload: item,
//     });
//   };

//   const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     setUrl(`${API_ENDPOINT}${searchTerm}`);

//     event.preventDefault();
//   };

//   // const sumComments = useMemo(() => getSumComments(stories), [stories]);

//   // const searchedStories = stories.data.filter((story) =>
//   //   story.title.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div>
//       <h1>My Hacker Stories</h1>

//       <SearchForm
//         searchTerm={searchTerm}
//         onSearchInput={handleSearchInput}
//         onSearchSubmit={handleSearchSubmit}
//       />

//       <hr />

//       {stories.isError && <p>Something went wrong ...</p>}

//       {stories.isLoading ? (
//         <p>Loading ...</p>
//       ) : (
//         <List list={stories.data} onRemoveItem={handleRemoveStory} />
//       )}
//     </div>
//   );
// };

// type SearchFormProps = {
//   searchTerm: string;
//   onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
// };

// // ============INPUT==============//

// type InputWithLabelProps = {
//   id: string;
//   value: string;
//   type?: string;
//   onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   isFocused?: boolean;
//   children: React.ReactNode;
// };

// const InputWithLabel = ({
//   id,
//   value,
//   type = "text",
//   onInputChange,
//   isFocused,
//   children,
// }: InputWithLabelProps) => {
//   const inputRef = useRef();

//   useEffect(() => {
//     if (isFocused) {
//       inputRef.current.focus();
//     }
//   }, [isFocused]);

//   return (
//     <>
//       <label htmlFor={id}>{children}</label>
//       &nbsp;
//       <input
//         ref={inputRef}
//         id={id}
//         type={type}
//         value={value}
//         onChange={onInputChange}
//       />
//     </>
//   );
// };

// type ListProps = {
//   list: Stories;
//   onRemoveItem: (item: Story) => void;
// };

// const List = React.memo(({ list, onRemoveItem }: ListProps) =>
//   list.map((item) => (
//     <Item key={item.objectID} item={item} onRemoveItem={onRemoveItem} />
//   ))
// );

// // ============ITEM =================/////

// type ItemProps = {
//   item: Story;
//   onRemoveItem: (item: Story) => void;
// };

// const Item = ({ item, onRemoveItem }: ItemProps) => (
//   <div>
//     <span>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span>{item.author}</span>
//     <span>{item.num_comments}</span>
//     <span>{item.points}</span>
//     <span>
//       <button type="button" onClick={() => onRemoveItem(item)}>
//         Dismiss
//       </button>
//     </span>
//   </div>
// );

// ///// =======================SEARCH-FORM=======================/////

// // const SearchForm = ({
// //   onSearchInput,
// //   searchTerm,
// //   onSearchSubmit } : SearchFormProps) => (
// //   <form onSubmit={onSearchSubmit}>
// //     <InputWithLabel
// //       id="search"
// //       value={searchTerm}
// //       isFocused
// //       onInputChange={onSearchInput}
// //     >
// //       <strong>Search:</strong>
// //     </InputWithLabel>

// //     <button type="button" disabled={!searchTerm}>
// //       Submit
// //     </button>
// //   </form>
// // );

// export default App;


/////////////////////////////////SECOND CODEBOX VERSION//////////////////////////////


import React from 'react';
import axios from 'axios';
import SearchForm from './SearchForm';
import List from './List';
// import {sortBy} from ' lodash';


const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const useSemiPersistentState = (
  key: string,
  initialState: string
): [string, (newValue: string) => void] => {
  const [value, setValue] = React.useState(
    localStorage.getItem(key) || initialState
  );

  React.useEffect(() => {
    localStorage.setItem(key, value);
  }, [value, key]);

  return [value, setValue];
};

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type Stories = Array<Story>;

type StoriesState = {
  data: Stories;
  isLoading: boolean;
  isError: boolean;
};

interface StoriesFetchInitAction {
  type: 'STORIES_FETCH_INIT';
}

interface StoriesFetchSuccessAction {
  type: 'STORIES_FETCH_SUCCESS';
  payload: Stories;
}

interface StoriesFetchFailureAction {
  type: 'STORIES_FETCH_FAILURE';
}

interface StoriesRemoveAction {
  type: 'REMOVE_STORY';
  payload: Story;
}

type StoriesAction =
  | StoriesFetchInitAction
  | StoriesFetchSuccessAction
  | StoriesFetchFailureAction
  | StoriesRemoveAction;

const storiesReducer = (
  state: StoriesState,
  action: StoriesAction
) => {
  switch (action.type) {
    case 'STORIES_FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case 'STORIES_FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'STORIES_FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'REMOVE_STORY':
      return {
        ...state,
        data: state.data.filter(
          story => action.payload.objectID !== story.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE' });
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      <hr />

      {stories.isError && <p>Something went wrong ...</p>}

      {stories.isLoading ? (
        <p>Loading ...</p>
      ) : (
        <List list={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </div>
  );
};

// type SearchFormProps = {
//   searchTerm: string;
//   onSearchInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   onSearchSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
// };

// const SearchForm = ({
//   searchTerm,
//   onSearchInput,
//   onSearchSubmit,
// }: SearchFormProps) => (
//   <form onSubmit={onSearchSubmit}>
//     <InputWithLabel
//       id="search"
//       value={searchTerm}
//       isFocused
//       onInputChange={onSearchInput}
//     >
//       <strong>Search:</strong>
//     </InputWithLabel>

//     <button type="submit" disabled={!searchTerm}>
//       Submit
//     </button>
//   </form>
// );

// type InputWithLabelProps = {
//   id: string;
//   value: string;
//   type?: string;
//   onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   isFocused?: boolean;
//   children: React.ReactNode;
// };

// const InputWithLabel = ({
//   id,
//   value,
//   type = 'text',
//   onInputChange,
//   isFocused,
//   children,
// }: InputWithLabelProps) => {
//   const inputRef = React.useRef<HTMLInputElement>(null!);

//   React.useEffect(() => {
//     if (isFocused && inputRef.current) {
//       inputRef.current.focus();
//     }
//   }, [isFocused]);

//   return (
//     <>
//       <label htmlFor={id}>{children}</label>
//       &nbsp;
//       <input
//         ref={inputRef}
//         id={id}
//         type={type}
//         value={value}
//         onChange={onInputChange}
//       />
//     </>
//   );
// };

// type ListProps = {
//   list: Stories;
//   onRemoveItem: (item: Story) => void;
// };

// const List = ({ list, onRemoveItem }: ListProps) => (
//   <>
//     {list.map(item => (
//       <Item
//         key={item.objectID}
//         item={item}
//         onRemoveItem={onRemoveItem}
//       />
//     ))}
//   </>
// );

// type ItemProps = {
//   item: Story;
//   onRemoveItem: (item: Story) => void;
// };

// const Item = ({ item, onRemoveItem }: ItemProps) => (
//   <div>
//     <span>
//       <a href={item.url}>{item.title}</a>
//     </span>
//     <span>{item.author}</span>
//     <span>{item.num_comments}</span>
//     <span>{item.points}</span>
//     <span>
//       <button type="button" onClick={() => onRemoveItem(item)}>
//         Dismiss
//       </button>
//     </span>
//   </div>
// );

export default App;


export { SearchForm, InputWithLabel, List, Item };

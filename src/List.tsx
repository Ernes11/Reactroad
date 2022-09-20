import React, {useState} from 'react';
import {sortBy} from 'lodash';

type Story = {
  objectID: string;
  url: string;
  title: string;
  author: string;
  num_comments: number;
  points: number;
};

type ListProps = {
    list: Stories;
    onRemoveItem: (item: Story) => void;
  };


  const SORTS = {
    NONE: list => list,
    TITLE: list => sortBy(list, 'title'),
    AUTHOR: list => sortBy(list, 'author'),
    COMMENT: list => sortBy(list, 'num_comments').reverse(),
    POINT: list => sortBy(list, 'points').reverse(),
    };

const List = ({ list, onRemoveItem }: ListProps) => (
  const [sort, setSort] = useState({sortKey: 'NONE',isReverse: false});

    const handleSort = sortKey => {
        const isReverse = sort.sortKey === sortKey && !sort.isReverse;
        setSort ({sortKey, isReverse}) 
    }
    const sortFunction = SORTS[sort.sortKey];
    const sortedList = sort.isReverse ? sortFunction(list).reverse() : sortFunction(list);
    return (

      <div>
       <div>
         <span>
          <button type="button" onClick={() => handleSort('TITLE')}>
            Title
          </button>
         </span>
       <span>
         <button type="button" onClick={() => handleSort('AUTHOR')}>
            Author
         </button>
      </span>
    <span>
       <button type="button" onClick={() => handleSort('COMMENT')}>
       Comments
       </button>
    </span>
    <span>
       <button type="button" onClick={() => handleSort('POINT')}>
       Points
       </button>
    </span>
    <span>Actions</span>
</div>
   {sortedList.map(item => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
</div>
)
    

  type ItemProps = {
    item: Story;
    onRemoveItem: (item: Story) => void;
  };

  const Item = ({ item, onRemoveItem }: ItemProps) => (
    <div>
      <span>
        <a href={item.url}>{item.title}</a>
      </span>
      <span>{item.author}</span>
      <span>{item.num_comments}</span>
      <span>{item.points}</span>
      <span>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </div>
  );

  export default List;
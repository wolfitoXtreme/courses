import React from 'react';
import ListItem from '../ListItem/ListItem';
import AuthItem from '../AuthItem/AuthItem';
import './List.scss';

interface ListProps {
  authenticated?: boolean;
  amount?: number;
}

const List: React.FC<ListProps> = ({ amount = 1, authenticated = false }) => {
  let items = [];
  for (let i = 0; i < amount; i++) {
    items.push(<ListItem key={i} />);
  }

  return (
    <ul className="list">
      {authenticated ? (
        <AuthItem>Log Out</AuthItem>
      ) : (
        <AuthItem>Log In</AuthItem>
      )}
      {items}
    </ul>
  );
};
export default List;

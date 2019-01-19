import React, { Fragment } from 'react';
import { FormControl } from 'react-bootstrap';
// import EmptyContainer from '../Auxilliary/';

export default function ToDo(props) {
  let { toDoText, itemsLength, onChange, onKeyPress, onClick } = props;
  return (
    // <EmptyContainer>
  	<Fragment>
      <h1>TODO Items Checklist</h1>
      What to Do? <br/>
      <FormControl
        type='text'
        value={toDoText}
        placeholder='Enter task'
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      &nbsp;<button onClick={onClick}>Save</button>
      <br/><br/>
      { !itemsLength && <div>No Items in the List</div> }
      { itemsLength && <div>Pending Items in the List</div> }
      {props.children}
    </Fragment>
    // </EmptyContainer>
  );
}

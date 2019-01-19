import React from 'react';

const styleCross = {
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default function TaskItem(props) {
  let { item, onStatusChange, onRemove } = props;
  return (
    <li key={'li'+item.id} className={item.className}>{item.itemValue}
      <input type='checkbox' checked={item.done} onChange={ e => onStatusChange(item.id) }/>
      <font style={styleCross} color='red' onClick={ e => onRemove(item.id) }>X</font>
    </li>
  );
}

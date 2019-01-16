import React from 'react';
import { loadState, saveState} from './utils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let state = loadState();
    if (!state) {
      state = {
        toDoText: '',
        items: [],
        itemsHeading: this.props.heading,
      };
    }
    this.state = state;
  }

  onSave() {
    var { toDoText, items } = this.state;
    var todo = { itemValue: this.state.toDoText, done: false, id: items.length+1, className: '' };
    items.push(todo);
    toDoText = '';
    //savestate is called only after the setState is completed.
    this.setState({ toDoText, items, itemsHeading: 'Pending Items' }, this.onSaveState);
  }

  onInput = e => {
    this.setState({ toDoText: e.target.value });
  }

  onEnter = e => {
    if (this.state.toDoText !== '') {
    if (e.key === "Enter") this.onSave();
    else return;
    }
  }

  onSaveState = () => {
    saveState(this.state);
  }

  onStatusChange = id => {
    let { items } = this.state;
    let obj = items.find(item => item.id === id);
    obj.done = !obj.done;
    obj.className = '';
    if (obj.done) { obj.className = 'done' };
    this.setState({ items }, this.onSaveState);
  }

  onRemove = id => {
    let { items, itemsHeading } = this.state;
    items = items.filter(item => item.id !== id);
    if (!items.length) { itemsHeading = this.props.heading; }
    this.setState({ items, itemsHeading }, this.onSaveState);
  }

  render() {
    const styleCross = {
      cursor: 'pointer',
      fontWeight: 'bold'
    };
      return (
        <div>
          <h1>TODO</h1>
          What to Do? <br/>
          <input type='text' value={this.state.toDoText}
            onChange={this.onInput} onKeyPress={this.onEnter} />
          &nbsp;<button onClick={() => this.onSave()}>Save</button>
          <br/><br/>
          <div>{this.state.itemsHeading}</div>
          <ul> {this.state.items.map(item => {
              return (
                <li key={'li'+item.id} className={item.className}>{item.itemValue}
                  <input type='checkbox' checked={item.done} onChange={ e => this.onStatusChange(item.id) }/>
                  <font style={styleCross} color='red' onClick={ e => this.onRemove(item.id) }>X</font>
                </li>
              );
            }
          )} </ul>
        </div>
      );
  }
}

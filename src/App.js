import React from 'react';
import TaskList from './components/TaskList/';
import ToDo from './components/ToDO/';
import { loadState, saveState} from './utils';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    let state = loadState();
    if (!state) {
      state = {
        toDoText: '',
        items: [],
      };
    }
    this.state = state;
  }

  onSave = () => {
    var { toDoText, items } = this.state;
    var todo = { itemValue: this.state.toDoText, done: false, id: items.length+1, className: '' };
    items.push(todo);
    toDoText = '';
    //savestate is called only after the setState is completed.
    this.setState({ toDoText, items}, this.onSaveState);
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
    let { items } = this.state;
    items = items.filter(item => item.id !== id);
    this.setState({ items }, this.onSaveState);
  }

  render() {
    const { toDoText, items } = this.state;
      return (
          <ToDo toDoText={toDoText} itemsLength={items.length > 0}
            onChange={this.onInput} onKeyPress={this.onEnter} onClick={this.onSave}>
            <TaskList items={items} onStatusChange={this.onStatusChange} onRemove={this.onRemove} />
          </ToDo>
      );
  }
}

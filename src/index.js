import React from 'react';
import ReactDOM from 'react-dom';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import Column from './column';
class App extends React.Component {
  state = initialData;

  // Example of result object
  // const result = {
  //   draggableId: 'task-1',
  //   type: 'TYPE',
  //   reason: 'DROP',
  //   source: {
  //     droppableId: 'column-1',
  //     index: 0,
  //   },
  //   NOTE: there are cases where destination: null
  //   destination: {
  //     droppableId: 'column-1',
  //     index: 1,
  //   },
  // }

  onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if ( !destination ) return;

    if ( 
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    
  }

  render() {
    return (
      <DragDropContext
        onDragEnd={this.props.onDragEnd}
      >
        {
          this.state.columnOrder.map(columnId => {
            const column = this.state.columns[columnId];
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
      
            return <Column key={column.id} column={column} tasks={tasks} />;
          })
        }
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


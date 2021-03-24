import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initialData';
import Column from './column';

/* Example of result object
  const result = {
    draggableId: 'task-1',
    type: 'TYPE',
    reason: 'DROP',
    source: {
      droppableId: 'column-1',
      index: 0,
    },
    NOTE: there are cases where destination: null
    destination: {
      droppableId: 'column-1',
      index: 1,
    },
  }
*/

/* 
  Example data
  
  onDragStart
  const start = {
    draggableId: 'task-1',
    type: 'TYPE',
    source: {
      droppableId: 'column-1',
      index: 0,
    },
  };

  onDragUpdate
  const update = {
    ...start,
    destination: {
      droppableId: 'column-1',
      index: 1,
    },
  };

  onDragEnd
  const result = {
    ...update,
    reason: 'DROP',
  };
*/

const Container = styled.div`
  display: flex;
`;

class App extends React.Component {
  state = initialData;

  // onDragStart = () => {
  //   document.body.style.color = 'yellow';
  //   document.body.style.transition = 'background-color 0.2s ease';
  // };

  // onDragUpdate = update => {
  //   const {destination} = update;
  //   const opacity = destination
  //     ? destination.index / Object.keys(this.state.tasks).length
  //     : 0;
  //   document.body.style.backgroundColor = `rgba(153,141,217, ${opacity})`;
  // };

  onDragEnd = result => {

    // document.body.style.color = 'inherit';
    // document.body.style.backgroundColor = 'inherit';

    const { destination, source, draggableId } = result;
    // console.log("inside drag end");
    if ( !destination ) return;

    if ( 
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;

    const column = this.state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1);
    newTaskIds.splice(destination.index, 0, draggableId);

    const newColumn = {
      ...column,
      taskIds: newTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newColumn.id]: newColumn,
      },
    };

    this.setState(newState);
  };

  render() {
    return (
      <DragDropContext
        // onDragStart={this.onDragStart}
        // onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >
        <Container>
          {
            this.state.columnOrder.map(columnId => {
              const column = this.state.columns[columnId];
              const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
        
              return <Column key={column.id} column={column} tasks={tasks} />;
            })
          }
        </Container>
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


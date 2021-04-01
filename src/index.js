import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
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

    // const column = this.state.columns[source.droppableId];
    const startCol = this.state.columns[source.droppableId];
    const finishCol = this.state.columns[destination.droppableId];

    if ( startCol === finishCol ) {
      const newTaskIds = Array.from(startCol.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      const newColumn = {
        ...startCol,
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
      return;
    }

    //Moving from one list to another
    const startTaskIds = Array.from(startCol.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...startCol,
      taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(finishCol.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishCol,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
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
        <Droppable 
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          { provided => (
              <Container
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {
                  this.state.columnOrder.map( (columnId, index) => {
                    const column = this.state.columns[columnId];
                    const tasks = column.taskIds.map(taskId => this.state.tasks[taskId]);
              
                    return (
                      <Column key={column.id} column={column} tasks={tasks} index={index}/>
                    )
                  })
                }
                {provided.placeholder}
              </Container>
            )
          }
        </Droppable>
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));


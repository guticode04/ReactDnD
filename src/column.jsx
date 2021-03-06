import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
   margin: 10px;
   border: 1px solid lightgrey;
   border-radius: 2px;
   width: 240px;
   display: flex;
   flex-direction: column;
   background-color: white;
`;
const Title = styled.h3`
   padding: 10px;
`;
const TaskList = styled.div`
   padding: 10px;
   transition: background-color 0.2s ease;
   flex-grow: 1;
   min-height: 100px;
   background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'inherit')}
`;

// Droppable Snapshot example
// const droppableSnapshot = {
//    isDraggingOver: true,
//    draggingOverWith: 'task-1',
// }

class InnerList extends React.Component {
   shouldComponentUpdate(nextProps) {
      if ( nextProps.tasks === this.props.tasks ) {
         return false;
      }
      return true;
   }
   render() {
      return this.props.tasks.map((task, index) => (
         <Task key={task.id} task={task} index={index} />
      ))
   }
}

export default class Column extends React.Component {
   render() {
      // return this.props.column.title;
      return (
         <Draggable 
            draggableId={this.props.column.id}
            index={this.props.index}
         >
            { (provided) => (
               <Container
                  ref={provided.innerRef}
                  {...provided.draggableProps}
               >
                  <Title {...provided.dragHandleProps}>
                     {this.props.column.title}
                  </Title>
                  <Droppable droppableId={this.props.column.id} type="task">
                     { (provided, snapshot) => (
                        <TaskList
                           ref={provided.innerRef}
                           {...provided.droppableProps}
                           isDraggingOver={snapshot.isDraggingOver}
                        >
                           <InnerList tasks={this.props.tasks} />
                           {provided.placeholder}
                        </TaskList>
                     )}
                  </Droppable>
               </Container>
            )}
         </Draggable>
      );
   }

}
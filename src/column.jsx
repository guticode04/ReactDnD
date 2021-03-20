import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
   margin: 10px;
   border: 1px solid lightgrey;
   border-radius: 2px;
`;
const Title = styled.h3`
   padding: 10px;
`;
const TaskList = styled.div`
   padding: 10px;
`;

export default class Column extends React.Component {
   render() {
      // return this.props.column.title;
      return (
         <Container>
            <Title>{this.props.column.title}</Title>
            <Droppable droppableId={this.props.column.id}>
               { (provided) => (
                  <TaskList
                     innerRef={provided.innerRef}
                     {...provided.droppableProps}
                  >
                     {this.props.tasks.map( task => <Task key={task.id} task={task} />)}
                     {provided.placeholder}
                  </TaskList>
               )}
            </Droppable>
         </Container>
      );
   }

}
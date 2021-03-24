import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
   border: 1px solid lightgrey;
   border-radius: 2px;
   padding: 10px;
   margin-bottom: 10px;
   background-color: ${props => (props.isDragging ? 'lightblue' : 'white')};
   display: flex;
`;

const Handle = styled.div`
   width: 20px;
   height: 20px;
   background-color: yellow;
   border-radius: 4px;
   margin-right: 10px;
`;

// Draggable Object Example
// const draggableSnapshot = {
//    isDragging: true,
//    draggingOver: 'column-1',
// }

export default class Task extends React.Component {
   render() {
      return (
         <Draggable draggableId={this.props.task.id} index={this.props.index}>
            { (provided, snapshot) => (
               <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
                  >
                  {/* <Handle {...provided.dragHandleProps}/> */}
                  {this.props.task.content}
               </Container>
            )}
         </Draggable>
      )
   }
}
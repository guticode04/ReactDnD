import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
   border: 1px solid lightgrey;
   border-radius: 2px;
   padding: 10px;
   margin-bottom: 10px;
`;

export default class Task extends React.Component {
   render() {
      return (
         <Container>
            {this.props.task.content}
         </Container>
      )
   }
}
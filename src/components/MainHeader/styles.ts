import styled from 'styled-components';

export const Container = styled.div`
   grid-area:MH;
   color:${props => props.theme.color.white};
   background-color:${props => props.theme.color.secundary};
   display:flex;
   justify-content:space-between;
   align-items:center;
   padding:0 10px;
   border-bottom: 1px solid ${props => props.theme.color.gray};
`;

export const Profile = styled.div`
   display:flex;
   flex-direction:row;
`;

export const Welcome = styled.h3`
  color:${props => props.theme.color.white};
`;

export const UserName = styled.span`
  
`;
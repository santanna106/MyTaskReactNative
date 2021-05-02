import React from 'react';


import logoImg from '../../assets/logo.svg';

import {
    MdDashboard,
    MdArrowDownward,
    MdArrowUpward,
    MdExitToApp
} from 'react-icons/md';

import  * as S from './styles';

const Aside: React.FC = () =>{
    return (
        <S.Container>
           <S.Header>
               <S.LogImg src={logoImg} alt="Logo Minha Carteira" />
               <S.Title>Minhar Carteira</S.Title>   
            </S.Header>
            <S.MenuContainer>
                <S.MenuItemLink href="/dashboard">
                    <MdDashboard/>
                    DashBoard
                </S.MenuItemLink>

                <S.MenuItemLink href="/list/entry-balance">
                    <MdArrowUpward/>
                    Entradas
                </S.MenuItemLink>
                <S.MenuItemLink href="/list/exit-balance">
                    <MdArrowDownward/>
                    Saídas
                </S.MenuItemLink>
                <S.MenuItemLink href="#">
                    <MdExitToApp/>
                    Sair
                </S.MenuItemLink>
            </S.MenuContainer>
        </S.Container>
    )
}

export default Aside;
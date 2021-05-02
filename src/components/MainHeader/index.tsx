import React,{useMemo,useEffect, useState} from 'react';

import * as S from './styles';
import emojis from '../../utils/emojis';
import Toggle from '../../components/Toogle';


const Content: React.FC = () =>{
    const [em,setEm] = useState('&#128512;');
    const emoji =useMemo(() => {
        const indice = Math.floor(Math.random() * emojis.length);
        return emojis[indice];
    },[])

    return (
        <S.Container>
            <Toggle />
            <S.Profile>
                <S.Welcome>Olá , &#128512; Gabriel Andrade</S.Welcome>
                <S.UserName></S.UserName>
            </S.Profile>
        </S.Container>
    )
}

export default Content;
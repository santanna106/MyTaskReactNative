import React from 'react';

import * as S from './styles';

const Toogle: React.FC = () => {
    return (
        <S.Container>
            <S.ToggleLabel>
               Light
            </S.ToggleLabel>
            <S.ToggleSelector 
                checked
                uncheckedIcon={false}
                checkedIcon={false}
                onChange={() => {}}
            />
            <S.ToggleLabel>
               Dark
            </S.ToggleLabel>
        </S.Container>
    )
}

export default Toogle;
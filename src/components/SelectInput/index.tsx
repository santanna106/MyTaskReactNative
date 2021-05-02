import React from 'react';

import * as S from './styles';

interface  Option  {
    value : string|number;
    label : string|number;
}

interface  ISelectInputProps  {
    options: Option[];
    onChange(event: React.ChangeEvent<HTMLSelectElement>): void | undefined;
    defaultValue?: string| number;
}


const SelectInput: React.FC<ISelectInputProps> = ({options,onChange,defaultValue}) =>{
    return (
      <S.Container>
          <select onChange={onChange} defaultValue={defaultValue}>
             {
                 options.map(option => (
                    <option 
                      key={option.value}
                      value={option.value}
                    >
                        {option.label}
                    </option>
                 ))
                
             }
              
          </select>
      </S.Container>
    )
}

export default SelectInput;
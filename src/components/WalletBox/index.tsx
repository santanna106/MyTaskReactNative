import React,{useMemo} from 'react';
import CountUp from 'react-countup';

import {
    Container
} from './styles'

import dolarImg from '../../assets/dolar.svg';
import arrowUpImg from '../../assets/arrow-up.svg';
import arrowDownImg from '../../assets/arrow-down.svg';

interface IWalletBoxProps {
    title:string;
    amount:number;
    footerLabel:string;
    icon:'dolar'| 'arrowUp' | 'arrowDown';
    color:string;
}

const WalletBox: React.FC<IWalletBoxProps>= ({title,amount,footerLabel,icon,color}) => {

    const iconSelected = useMemo(() => {

        switch (icon) {
            case 'dolar':
                return dolarImg;
                break;
            case 'arrowDown':
                return arrowDownImg;
                break;
            case 'arrowUp':
                return arrowUpImg;
                break;
            default:
                return dolarImg;
                break;
        }

    },[icon])
       
    

    return (
        <Container color={color}>
            <span>{title}</span>
            <h1>
               
                <CountUp 
                    end={amount} 
                    prefix={"R$ "}
                    separator="."
                    decimal=","
                    decimals={2}
                    preserveValue={true}
                />
            </h1>
            <small>{footerLabel}</small>
            <img src={iconSelected} alt={title}/>
        </Container>
    )
}

export default WalletBox;
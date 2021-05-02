import React,{useState,useMemo} from 'react';

import ContentHeader from '../../components/ContentHeader';
import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import listMonths from '../../utils/months';

import SelectInput from '../../components/SelectInput';
import WalletBox from '../../components/WalletBox';

import * as S from './styles'


const Dashboard : React.FC = () =>{
    const [monthSelected,setMonthSelected] = useState<number>((new Date().getMonth() + 1));
    const [yearSelected,setYearSelected] = useState<number>((new Date().getFullYear()));

    const years = useMemo (() => {
        let uniqueYears: number[] = [];
        [...expenses,...gains].forEach((item) => {
            const date = new Date(item.date);
            const year = date.getFullYear();

            if(!uniqueYears.includes(year)){
                uniqueYears.push(year)
            }

           
        });

        return uniqueYears.map(year => {
            return {
                value:year,
                label:year

            } 
        })

    },[]);

    const months = useMemo (() => { 

           return listMonths.map((month,index) => {
            return {
                value:index + 1,
                label:month

            }  
           })
           

    },[]);

    const options = [
        { value:'Gabriel',label:'Gabriel' },
        { value:'Maria',label:'Maria'},
        { value:'João',label:'João'},
    ]

    const handleMonthSelected = (month:string) => {
        try{
             const parseMonth = Number(month);
             setMonthSelected(parseMonth);
        }catch(e){
             throw new Error('invalid month value. Is accept 0 - 24');
        }
 
    }
 
 
    const handleYearSelected = (year:string) => {
         try{
             const parseYear = Number(year);
             setMonthSelected(parseYear);
         }catch(e){
             throw new Error('invalid year value.');
         }
     }
     
 


    return (
        <S.Container>
           
            <ContentHeader title={"Dashboard"} lineColor='#F7931B'>
            <SelectInput 
               options={months} 
               onChange={(e) => handleMonthSelected(e.target.value)} 
               defaultValue={monthSelected}
             />
            <SelectInput 
               options={years} 
               onChange={(e) => handleYearSelected(e.target.value)} 
               defaultValue={yearSelected} />
            </ContentHeader>
            <S.Content>
                <WalletBox 
                    title="saldo"
                    color="#4E41F0"
                    amount={150.00}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="dolar"
                />
                <WalletBox 
                    title="entradas"
                    color="#F7931B"
                    amount={5000.00}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowUp"
                />
                <WalletBox 
                    title="saídas"
                    color="#E44C4E"
                    amount={4850.00}
                    footerLabel="atualizado com base nas entradas e saídas"
                    icon="arrowDown"
                />
            </S.Content>
        </S.Container>
    )
}

export default Dashboard;


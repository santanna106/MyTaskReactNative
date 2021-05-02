import React, {useMemo,useState,useEffect} from 'react';
import {uuid} from 'uuidv4';

import ContentHeader from '../../components/ContentHeader';
import SelectInput from '../../components/SelectInput';
import HistoryFinanceCard from '../../components/HistoryFinanceCard';

import expenses from '../../repositories/expenses';
import gains from '../../repositories/gains';
import {formatCurrency} from '../../utils/formatCurrency';
import {formatDate} from '../../utils/formatDate';

import listMonths from '../../utils/months';
 
import * as S from './styles';

interface IRouteParams {
    match: {
        params: {
            type:string;
        }
    }
}

interface IData {
    id:string;
    description:string;
    amountFormatted:string;
    frequency:string;
    dateFormatted:string;
    tagColor:string;
}

const List : React.FC<IRouteParams>= ({match}) =>{
    const movimentType = match.params.type;

    const [data,setData] = useState<IData[]>([]);
    const [monthSelected,setMonthSelected] = useState<number>((new Date().getMonth() + 1));
    const [yearSelected,setYearSelected] = useState<number>((new Date().getFullYear()));
    const [frequencyFilterSelected,setFrequencyFilterSelected] = useState<string[]>(['recorrente','eventual']);
    

    /*
    const months = [
        { value:1,label:'Janeiro' },
        { value:2,label:'Fevereiro' },
        { value:3,label:'Março' },
        { value:4,label:'Abril' },
        { value:5,label:'Maio' },
        { value:6,label:'Junho' },
        { value:7,label:'Julho' },
        { value:8,label:'Agosto' },
        { value:9,label:'Setembro' },
        { value:10,label:'Outubro' },
        { value:11,label:'Novembro' },
        { value:12,label:'Dezembro' },
        
    ]*/

    /*
   const years = [
        { value:2018,label:2018 },
        { value:2019,label:2019},
        { value:2020,label:2020},
        { value:2021,label:2021},
    ]*/

    const pageData = useMemo (() => {
        return movimentType === 'entry-balance' 
        ?
            {
                title:'Entradas',
                lineColor:'#4E41F0' ,
                data:gains
    
            }

        :
            {
                title:'Saídas',
                lineColor:'#E44C4E',
                data:expenses

            }
    },[movimentType])

    const listData = useMemo(() => {
        return movimentType === 'entry-balance' ? 
                        gains : 
                        expenses;
    },[])

    
    const years = useMemo (() => {
        let uniqueYears: number[] = [];
        listData.forEach((item) => {
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

    },[listData]);

    const months = useMemo (() => { 

           return listMonths.map((month,index) => {
            return {
                value:index + 1,
                label:month

            }  
           })
           

    },[]);


    const  handleFrequencyClick = (evento:string) => {
        const alreadySelected = frequencyFilterSelected.findIndex(item => item === evento);

        if(alreadySelected >= 0){
            const filtered = frequencyFilterSelected.filter( item => item !== evento);
            setFrequencyFilterSelected(filtered)
        } else {
            setFrequencyFilterSelected((prev) => [...prev, evento])
        }

    }

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
    

    useEffect(() => {
      
        
        const filteredDate = listData.filter(item => {

            const date = new Date(item.date);
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            console.log('monthSelected: ',monthSelected)
            console.log('yearSelected: ',yearSelected)
            console.log('item.frequency',item.frequency);

            if (years.length === 1){
                setYearSelected(years[0].value);
            }

            return month === monthSelected && year === yearSelected && frequencyFilterSelected.includes(item.frequency);
        });

        console.log('filteredDate: ',filteredDate);

        const formattedData = filteredDate.map(item => ({

            id: uuid(),
            description:item.description,
            amountFormatted:formatCurrency(Number(item.amount)),
            frequency:item.frequency,
            dateFormatted:formatDate(item.date),
            tagColor:item.frequency === 'recorrente'? '#4E41F0' : '#E44C4E'
        }))
       setData(formattedData);
    },[listData,monthSelected,yearSelected,data.length,frequencyFilterSelected,pageData])

  

    return (
       
        <S.Container>
            <ContentHeader title={pageData.title} lineColor={pageData.lineColor}>
                <SelectInput options={months} onChange={(e) => handleMonthSelected(e.target.value)}  defaultValue={monthSelected}/>
                <SelectInput options={years} onChange={(e) => handleYearSelected(e.target.value)} defaultValue={yearSelected} />
            </ContentHeader>
            <S.Filters>
                <button 
                  type="button"
                  className={`tag-filter tag-filter tag-filter-recurrents
                  ${frequencyFilterSelected.includes('recorrente') && 'tag-actived'}`}
                  onClick={() => handleFrequencyClick('recorrente')}
                >
                    Recorrentes
                </button>
                <button 
                  type="button"
                  className={`tag-filter tag-filter-eventual
                  ${frequencyFilterSelected.includes('eventual') && 'tag-actived'}`}
                  onClick={() => handleFrequencyClick('eventual')}
                >
                    Eventuais
                </button>
            </S.Filters>
            <S.Content>
                {
                    data.map(item => (
                        <HistoryFinanceCard 
                            key={item.id}
                            tagColor={item.tagColor}
                            title={item.description}
                            subtitle={item.dateFormatted}
                            amount={item.amountFormatted}

                     />

                    ))
                }
                
                      
            </S.Content>
        </S.Container>
        
    )
}

export default List;


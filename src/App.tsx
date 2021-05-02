import React from 'react';
import {ThemeProvider} from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import dark from './styles/themes/dark';
import Rota from './routes/index';



const App: React.FC = () =>{
    return (
        <ThemeProvider theme={dark}>
            <GlobalStyles/>
            <Rota />
        </ThemeProvider>
    )
}

export default App;
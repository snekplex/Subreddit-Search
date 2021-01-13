import AppWrapper from './components/custom/AppWraper';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './components/styled/StyledThemes';

function App() {
  return (
    <div>
      <ThemeProvider theme={defaultTheme}>
        <AppWrapper/>
      </ThemeProvider>
    </div>
  );
}

export default App;

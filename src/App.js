import './App.css';
import { AppNavbar } from './AppNavbar';
import { MarketData } from './MarketData';
import { TableList } from './TableList';

function App() {
  return (
    <div className="App">
      <AppNavbar/>
      <MarketData/>
      <TableList/>
    </div>
    
  );
}

export default App;

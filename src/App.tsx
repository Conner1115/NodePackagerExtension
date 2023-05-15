import Header from './components/Header';
import { rcss } from './lib/tokens';
import './App.css'

function App() {
  
  return <div css={[rcss.flex.column, rcss.p(8), rcss.colWithGap(8)]}>
    <Header/>
  </div>
}

export default App;
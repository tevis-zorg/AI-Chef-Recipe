import './App.css'

import Header from './components/Header'
import header_props from './components/component-datas/header';

import Body from './components/Body';

function App() {
  
    const headerElement = header_props.map((hp) => {
      return (
        <Header
          key={hp.id}
          {...hp}
        />
      )
    })

  return (
    <>
      {headerElement}
      <Body/>
    </>
  )
}

export default App

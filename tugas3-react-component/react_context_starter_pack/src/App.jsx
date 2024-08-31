import './App.css'
import Component from './Component.jsx'
import ThemeProvider from './Context/ThemeContext.jsx'

function App() {
  return (
    <ThemeProvider>
  <Component />
    </ThemeProvider>
  )
}

export default App

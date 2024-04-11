
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import WeatherPage from './pages/WeatherPage'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}>
          <Route path="" element={<WeatherPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
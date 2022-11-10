import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainPage from './Components/Pages/MainPage'
import MoviePage from './Components/Pages/MoviePage'
import TVPage from './Components/Pages/TVPage'
import TVPageDetail from './Components/Pages/TVPageDetail'
import PersonPage from './Components/Pages/PersonPage'
import PersonPageDetail from './Components/Pages/PersonPageDetail'
import UserPage from './Components/Pages/UserPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/movie' element={<MoviePage />} />
                <Route path='/tv' element={<TVPage />} />
                <Route path='/tv/:id' element={<TVPageDetail />} />
                <Route path='/person' element={<PersonPage />} />
                <Route path='/person/:id' element={<PersonPageDetail />} />
                <Route path='/user' element={<UserPage />}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App

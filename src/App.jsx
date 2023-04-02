import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getData, getDataById } from './api/people'

function App() {
  const [textSearch, setTextSearch] = useState('')
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState({hasError:false})
  const [currentCharacter, setCurrentCharacter] = useState(1)
  const [details, setDetails] = useState({})
  const inputSearch = useRef;


  const handleError = (e) => {
    setErrorState({hasError: true, message: e.menssage})
  }

  const showDetails = (person) => {
    const id = Number(person.url.split('/').slice(-2)[0])
    setCurrentCharacter(id)
  }

  const onChangeTextSearch = (event) => {
    event.preventDefault();
    const text = inputSearch.current.value

    setTextSearch(text)
  }

  const onSearchSubmit = (event) => {
    if (event.key !== 'Enter') return;

    inputSearch.current.value = '';
    setDetails({});

    
    
  }

  useEffect(() => {
    getDataById(currentCharacter).then(data => setDetails(data))
  }, [currentCharacter])
  

  useEffect(() => {
    
    getData()
      .then((data) => setPeople(data))
      .catch( error => handleError(error))
  }, [])
  

  return (
    <div className="App">
      
      <h1>Test-yt- Star Wars</h1>

        <input 
          onChange={onChangeTextSearch} 
          placeholder='search' 
          onKeyDown={onSearchSubmit}
          ref={inputSearch} 
          type='text'></input>

      
      <ul>
        {
          people.map((el) => (
            <li onClick={() => showDetails(el)} key={el.name}>{el.name}</li>
          ))
        }
      </ul>

      <div>
          {
            details && (<div>
                          <p>{details.name}</p>
                          <p>{details.homeworld}</p>
                          <p></p>

                       </div>)
          }
      </div>

    </div>
  )
}

export default App

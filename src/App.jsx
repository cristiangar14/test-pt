import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getData, getDataById, getDataSearch } from './api/people'

function App() {
  const [page, setPage] = useState(1)
  const [textSearch, setTextSearch] = useState('')
  const [people, setPeople] = useState([]);
  const [errorState, setErrorState] = useState({hasError:false})
  const [currentCharacter, setCurrentCharacter] = useState(1)
  const [details, setDetails] = useState({})
  const inputSearch = useRef();


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
    event.preventDefault();

    inputSearch.current.value = '';
    setDetails({});

    getDataSearch(textSearch).then(data => {setPeople(data)}).catch( error => handleError(error))
    setPage(1)
  }

  const onChangePage = (next) => {
    const totalPages = Math.ceil(people.count / 10);
    if (!people.previous && page + next <= 0) return;
    if (!people.next && page + next >= totalPages) return;

    setPage(page + next)
  
  }

  useEffect(() => {
    getDataById(currentCharacter).then(data => setDetails(data)).catch( error => handleError(error))
  }, [currentCharacter])
  

  useEffect(() => {
    
    getData(page)
      .then((data) => setPeople(data))
      .catch( error => handleError(error))
  }, [page])
  

  return (
    <div className="App">
      
      <h1>Test-yt- Star Wars</h1>

        <input 
          onChange={onChangeTextSearch} 
          placeholder='search' 
          onKeyDown={onSearchSubmit}
          ref={inputSearch} 
          type='text'></input>



      {
        people.results && (
        <>
          <ul>
            {
              people.results.map((el) => (
                <li onClick={() => showDetails(el)} key={el.name}>{el.name}</li>
              ))
            }
          </ul>
        <section>
          <button onClick={() => onChangePage(-1)}>Prev</button> | {page} | <button onClick={() => onChangePage(+1)} >Next</button>
        </section>
        </>
        
        )
      }
      

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

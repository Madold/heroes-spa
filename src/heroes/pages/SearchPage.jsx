import { useLocation, useNavigate } from "react-router-dom"
import { useForm } from "../../hooks/useForm"
import queryString from "query-string"
import { HeroCard } from "../components"
import { useMemo } from "react"
import { getHeroesByName } from "../helpers"

export const SearchPage = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const { q = "" } = queryString.parse(location.search)
  const { searchText, onInputChange } = useForm({ searchText: q })
  const heroes = useMemo(() => getHeroesByName(q), [q])
  const isErrorDialogVisible = q.length > 0 && heroes.length === 0
  const isSearchDialogVisible = q.length === 0

  const handleOnSearch = (e) => {
    e.preventDefault()

    if (searchText.trim().length <= 1) return

    navigate(`?q=${searchText.toLowerCase().trim()}`)
  }

  return (
    <>
      <h1>Search</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Searching</h4>
          <hr />
          <form onSubmit={handleOnSearch} aria-label="form">
            <input
              type="text"
              name="searchText"
              placeholder="Search a hero..."
              className="form-control"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
            />
            <button className="btn btn-outline-primary mt-1 ">Search</button>
          </form>
        </div>
        <div className="col-7">
          <h4>Results</h4>
          <hr />

          {
            isSearchDialogVisible && (<div className="alert alert-primary animate__animated animate__fadeIn">
              Search a hero...
            </div>)
          }

          {
            isErrorDialogVisible && (<div aria-label="error-dialog" className="alert alert-danger animate__animated animate__fadeIn">
              There's no result with <b>{q}</b> :c
            </div>)
          }

          {
            heroes.map(hero => (
              <HeroCard
                key={hero.id}
                {...hero} />
            ))
          }
        </div>
      </div>


    </>
  )
}


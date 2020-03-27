import React, { useContext, useState, useEffect } from 'react'
import { configure } from '@testing-library/react'
import { GeneralContext } from './App'
import { Link } from 'react-router-dom'
import { getProducts } from '../api/auth'
import Header from './Header'
function Dashboard(props) {
  const { config, updateContext } = useContext(GeneralContext)
  const [query, setQuery] = useState('')
  const [filtredProds, setFiltredProds] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [prods, setProds] = useState([])

  useEffect(() => {
    function getProds() {
      getProducts().then(result => {
        const { status, error, data } = result
        if (status === 200) {
          setProds(data)
          setFiltredProds(data)
        }
        else
          alert(status)
      })
    }
    getProds()
  }, [])

  useEffect(() => {
    if (query.length === 0)
      setFiltredProds(prods)
    else
      setFiltredProds(prods.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) || p.description.toLowerCase().includes(query.toLowerCase())))
  }, [query])

  return (
    <div>
      <div className="row col-md-12 m-3">
        <div className="col-md-8">
          <h3>Liste de Produits</h3>
          <input className="form-control input-control mt-3 mb-3 col-md-6" onChange={(e) => setQuery(e.target.value)} placeholder="Search ..." value={query} />
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              {filtredProds.map(p => (
                <tr key={p.id}>
                  <th scope="row">{p.id}</th>
                  <td>
                    <Link to={`/product/${p.id}`}>
                      <img src="https://via.placeholder.com/50" className="rounded-circle" />
                    </Link>
                  </td>
                  <td>{p.title}</td>
                  <td>{p.description}</td>
                </tr>
              ))}

            </tbody>
          </table>
        </div>
        <div className="col-md-4 d-flex flex-column flex-around panel ">
          <div className="d-flex flex-column text-center">
            <p className="display-1 text-primary">{filtredProds.length}</p>
            <p>Product(s)</p>
          </div>
          <div className="d-flex flex-column text-center">
            <p className="display-1 text-success">598</p>
            <p>Operation(s)</p>
          </div>
          <div className="d-flex flex-column text-center">
            <p className="display-1 text-danger">0</p>
            <p>Error(s)</p>
          </div>

        </div>
      </div>
    </div>

  )
}
export default Dashboard;
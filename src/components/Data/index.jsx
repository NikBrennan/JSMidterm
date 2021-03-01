import React, { useMemo, useEffect, useState } from 'react';
import Header from '../shared/Header';
import axios from 'axios';

const Data = () => {
  const APILINK = 'https://jsonplaceholder.typicode.com/posts';

  const [data, setData] = useState([]);
  const dataSet = useMemo (() => data, [data]);

  const [dataFiltered, setFilteredData] = useState([]);
  const dataFilteredSet = useMemo (() => dataFiltered, [dataFiltered]);


  useEffect(() => {
    axios.get(APILINK).then(resp => {
      setData(resp.data);
      setFilteredData(resp.data);
    })
  }, []);

  const filter = event => {
    event.persist();
    const value = event.target.value;

    if (value.length === 0) {
      setFilteredData([...dataSet]);
    } else if (isNaN(value)) {
      const regex = new RegExp(value);
      setFilteredData([...dataSet.filter(datum => (regex.test(datum.title) || regex.test(datum.body)))]);
    } else {
      const num = Number(value);
      setFilteredData([...dataSet.filter(datum => (Number(datum.userId) === num || Number(datum.id) === num))]);
    }
  };

  const [order, setOrder] = useState([]);

  const sort = event => {
    event.persist();
    const { name, type } = event.target.dataset;

    let sorted;
    if (type === "int")
      sorted = data.sort((a, b) => Number(a[name]) - Number(b[name]));
    else
      sorted = data.sort((a, b) => {
        if (a[name] < b[name]) return -1;
        if (a[name] > b[name]) return 1;
        return 0;
      });

    if (order) {
      sorted = sorted.reverse();
      setOrder(false);
    } else {
      setOrder(true);
    }

    setData([...sorted]);
  };

  return (
    <>
      <div className="container-fluid">
        <Header title="Your Data"/>
      </div>

      <div className="container">
        <h2>Data Table</h2>
        <hr/>
        <div className="row my-3 align-items-center justify-content-end">
          <div className="col-auto">
            <label htmlFor="filter" className="col-form-label">Filter</label>
          </div>

          <div className="col-auto">
            <input type="text" name="filter" className="form-control" onChange={filter}/>
          </div>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">userId</th>
              <th scope="col">id</th>
              <th scope="col">title</th>
              <th scope="col">body</th>
            </tr>
          </thead>
          <tbody>
          {dataFilteredSet.map((user, i) => (
              <tr key={i}>
                  <td onClick={sort}>{user.userId}</td>
                  <td onClick={sort}>{user.id}</td>
                  <td onClick={sort}>{user.title}</td>
                  <td onClick={sort}>{user.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
 
export default Data;
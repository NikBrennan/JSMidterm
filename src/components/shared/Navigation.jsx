import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link className="nav-link active" to="/">Home</Link>
        <Link className="nav-link active" to="/data">Data</Link>
      </li>
    </ul>
  );
}
 
export default Navigation;
import React from 'react'
import { Link } from 'react-router-dom';

export default props => (
    <nav className="navbar navbar-default navbar-fixed-top navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="#">
                <i className="fa fa-calendar-check-o"></i>
                Lista de tarefas
            </a>
          </div>
          <div id="navbar" className="navbar-collapse collapsed">
            <ul className="nav navbar-nav">
              <li><Link to="/todos">Tarefas</Link></li>
            </ul>
          </div>
        </div>
      </nav>
)
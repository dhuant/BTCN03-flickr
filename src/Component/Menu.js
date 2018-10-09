import React, { Component } from 'react';
import { Route, Link, withRouter } from 'react-router-dom';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
    return (
        <Route
            path={to}
            exact={activeOnlyWhenExact}
            children={({ match }) => {
                var active = match ? 'active' : '';
                return (
                    <li className={active}>
                        <Link to={to}>
                            {label}
                        </Link>
                    </li>
                )
            }}

        />
    )
}
class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            txtSearch: '',
        }
    }
    onHandleChange = (e) => {
       this.setState({
           txtSearch: e.target.value,
       })
    }

    onHandleSubmit = (e) => {
        e.preventDefault();
        let path = `/search/${this.state.txtSearch}`;
        this.props.history.push(path);
        this.setState({
            txtSearch: '',
        })
    }
    render() {
        
        return (
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <ul className="nav navbar-nav">
                        <MenuLink activeOnlyWhenExact={true} to="/explore" label="Explore" />>
                    </ul>
                    <ul className="nav navbar-nav">
                        <MenuLink to="/search" label="SearchTag" />>
                    </ul>
                    <form onSubmit={this.onHandleSubmit} className="navbar-form navbar-left">
                        <div className="form-group">
                            <input
                                onChange={this.onHandleChange}
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                name="txtSearch"
                                value={this.state.txtSearch}
                                 />
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                    </form>
                </div>
            </nav>
        );
    }
}

export default withRouter(Menu);
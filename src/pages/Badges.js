import React from "react";
import { Link } from "react-router-dom";

import "./styles/Badges.css";
import confLogo from "../images/badge-header.svg";
import BadgesList from "../components/BadgesList";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";

import api from "../api";

class Badges extends React.Component {
  state = {
    loading: true,
    error: null,
    data: undefined,
  };

  // para ejecutar una petición lo correto sería hacerlo una vez que el componente se encuentre cargado
  // es decir dentro del componentDidMount
  componentDidMount() {
    this.fetchData();

    // refresco automático (sería un observable)
    this.intervalId = setInterval(this.fetchData, 5000);
  }

  // me desuscribo
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  fetchData = async () => {
    this.setState({ loading: true, error: null });

    try {
      const data = await api.badges.list();
      this.setState({ loading: false, data: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading && !this.state.data) {
      return <PageLoading />;
    }

    if (this.state.error) {
      return <PageError error={this.state.error} />;
    }

    return (
      <React.Fragment>
        <div className="Badges">
          <div className="Badges__hero">
            <div className="Badges__container">
              <img
                className="Badges_conf-logo"
                src={confLogo}
                alt="Conf Logo"
              />
            </div>
          </div>
        </div>

        <div className="Badge__container">
          <div className="Badges__list">
            <div className="Badges__container">
              <div className="Badges__button">
                <Link to="/badges/new" className="btn btn-primary mb-3">
                  New Badge
                </Link>
              </div>
              <BadgesList badges={this.state.data} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Badges;

import React from "react";
import { Link } from "react-router-dom";
import Gravatar from "../components/Gravatar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBell } from "@fortawesome/free-regular-svg-icons";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

function useSearchBadges(badges) {
  const [query, setQuery] = React.useState("");
  const [filteredBadges, setFilteredResults] = React.useState(badges);

  // useMemo es para que use los valores almacenados en memoria si ya se  uso la query
  React.useMemo(() => {
    const result = badges.filter((badge) => {
      return `${badge.firstName} ${badge.lastName}`
        .toLowerCase()
        .includes(query.toLowerCase());
    });
    setFilteredResults(result);
  }, [badges, query]);

  return { query, setQuery, filteredBadges };
}

function BadgesList(props) {
  const badges = props.badges;

  const { query, setQuery, filteredBadges } = useSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <div className="form-group mb-3">
          <label>Filter Badges</label>
          <input
            type="text"
            className="form-control"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
        <div className="card">
          <div className="card-body text-center">
            <h3>No badges were found</h3>
            <Link className="btn btn-primary mt-2" to="/badges/new">
              Create new badge
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="form-group mb-3">
        <label>Filter Badges</label>
        <input
          type="text"
          className="form-control"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <ul className="list-unstyled">
        {filteredBadges.map((badge) => {
          return (
            <li key={badge.id}>
              <Link
                className="text-reset text-decoration-none"
                to={`/badges/${badge.id}`}
              >
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-2 m-auto p-1">
                      <Gravatar
                        className="card-img rounded-circle"
                        email={badge.email}
                        alt="Avatar"
                      />
                    </div>
                    <div className="col-md-10">
                      <div className="card-body">
                        <h5 className="card-title">
                          {badge.firstName} {badge.lastName}
                        </h5>
                        <p className="card-text">
                          <FontAwesomeIcon icon={faTwitter} /> @{badge.twitter}
                          <br />
                          {badge.jobTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          );
        }).reverse()}
      </ul>
    </div>
  );
}

export default BadgesList;

// prop key, que es?, este prop ayuda a react para poder determinar cuando un elemento se vuelve a
// renderizar, saber si se mantuvo en la lista o si cambió, es un identificador único que utilizamos
// siempre que listamos
// Por eso en la lista le pasamos como key el id, porque debe ser único

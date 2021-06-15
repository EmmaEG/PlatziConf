import React from "react";
import { Link } from "react-router-dom";

import "./styles/BadgeDetails.css";
import confLogo from "../images/platziconf-logo.svg";
import Badge from "../components/Badge";
import DeleteBadgeModal from "../components/DeleteBadgeModal";

// hook personalizado
function useIncreaseCount(max) {
  const [count, setCount] = React.useState(0);

  if (count > max) {
    setCount(0);
  }

  return [count, setCount];
}

function BadgeDetails(props) {
  // Hook, nos sirven para añadir caracteristicas de clases a los componentes funcionales
  // useState nos devuelve un arreglo, recibe dos argumentos
  // sería como pasarle state, setState, excepto que los nombres de los argumentos se lo damos nos
  // como argumento opcional, exam le pasamos 0 para que comience en 0
  // const [count, setCount] = React.useState(0);
  const [count, setCount] = useIncreaseCount(4);
  const badge = props.badge;

  return (
    <div>
      <div className="BadgeDetails__hero">
        <div className="container">
          <div className="row">
            <div className="col-6">
              <img src={confLogo} alt="Logo de la conferncia" />
            </div>
            <div className="col-6 BadgeDetails__hero-attendant-name">
              <h1>
                {badge.firstName} {badge.lastName}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col">
            <Badge
              firstName={badge.firstName}
              lastName={badge.lastName}
              email={badge.email}
              twitter={badge.twitter}
              jobTitle={badge.jobTitle}
            />
          </div>
          <div className="col">
            <h2>Actions</h2>
            <div>
              <div>
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  className="btn btn-primary mb-3"
                >
                  Increase Count: {count}
                </button>{" "}
                <br />
                <Link
                  className="btn btn-primary mb-3"
                  to={`/badges/${badge.id}/edit`}
                >
                  Edit
                </Link>
              </div>
              <button onClick={props.onOpenModal} className="btn btn-danger">
                Delete
              </button>
              <DeleteBadgeModal
                isOpen={props.modalIsOpen}
                onClose={props.onCloseModal}
                onDeleteBadge={props.onDeleteBadge}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BadgeDetails;

//createPortal recibe dos argumentos, que queremos renderizar y donde

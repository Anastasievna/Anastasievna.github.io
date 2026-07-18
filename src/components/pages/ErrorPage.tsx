import "./ErrorPage.css";
import error from "../../assets/images/404.png";

function ErrorPage() {
  return (
    <div className="error">
      <img className="error__img" src={error} alt="404" />
      <h1 className="error__title">Boo! Page missing!</h1>
      <p className="error__text">
        Whoops! This page must be a ghost - it's not here!
      </p>
      <button className="error__btn">Find shelter</button>
    </div>
  );
}

export default ErrorPage;
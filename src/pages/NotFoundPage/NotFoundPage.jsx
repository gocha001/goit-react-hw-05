import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      NotFoundPage
      <p>Sorry but page is not found ...</p>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default NotFoundPage;

import css from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ handleLoadMore }) => {
  return (
    <div className={css.load}>
      <button onClick={handleLoadMore}>Load more</button>
    </div>
  );
};

export default LoadMoreBtn;

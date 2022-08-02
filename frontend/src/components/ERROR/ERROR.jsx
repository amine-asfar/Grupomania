const ERROR = ({ errorObject }) => {
  const KEYS = Object.keys(errorObject);
  return (
    <div className="error__box">
      <div className="alert alert-danger" role="alert">
        {KEYS.map((key) => {
          return <p key={key}>{errorObject[key]}</p>;
        })}
      </div>
    </div>
  );
};

export default ERROR;

const Error = ({ text, retry }) => {
  return (
    <div className="error-container">
      <p>
        Sorry an error occurred while accessing the data <span>{text}</span>
      </p>

      <button onClick={retry} type="button" className="button">
        {" "}
        Try Again
      </button>
    </div>
  );
};

export default Error;

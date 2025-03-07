import "./index.less";

const LoadingPage: React.FC<{content: string}> = ({content}) => {
  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{content.length === 0 ? "loading" : content}</p>
    </div>
  );
};

export default LoadingPage;

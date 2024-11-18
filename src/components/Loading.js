const Loading = ({ item, children }) => {
    const loading = () => {
        return <div className="spinner" />
    };
    const loaded = () => {
        return <div className="content">{children}</div>
    };
    return (
        <div className="loading">{item.length > 0 ? loaded() : loading()}</div>
    );
};

export default Loading;
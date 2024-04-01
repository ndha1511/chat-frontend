function Search(props) {
    return (
        <form>
            <div className="input-group">
                <span className="input-group-text">
                <i className="bi bi-search"></i>
                </span>
                <input type="search" className="form-control" placeholder={props.placeholder} />
            </div>
        </form>
    );
}

export default Search;
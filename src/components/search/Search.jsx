import { Icon } from "zmp-ui";

function Search(props) {
    return (
        <form>
            <div style={{width:'120%'}} className="input-group">
                <span className="input-group-text">
                <Icon icon='zi-search'/>
                </span>
                <input type="search"  className="form-control" placeholder={props.placeholder} />
            </div>
        </form>
    );
}

export default Search;
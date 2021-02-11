import { Link } from 'react-router-dom'

import { ListItem, ListItemText } from '@material-ui/core'

function SearchResultItem(props) {
    const corp_code = props.result.corp_code;
    const corp_name = props.result.corp_name;
    const corp_cls  = props.result.corp_cls;

    let corp_secondary_message = corp_code + ' - ' + corp_cls;

    return (
        <Link to={`/analyze/${corp_code}`}>
            <ListItem button>
                <ListItemText primary={corp_name} secondary={corp_secondary_message}></ListItemText>
            </ListItem>
        </Link>
    );
}

export default SearchResultItem
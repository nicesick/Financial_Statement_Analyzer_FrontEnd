import { Link } from 'react-router-dom'

import { ListItem, ListItemText } from '@material-ui/core'

function SearchResultItem(props) {
    const corp_code = props.result.corpCode;
    const corp_name = props.result.corpName;
    const corp_cls  = props.result.corpCls;

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
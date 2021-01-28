import { Link } from 'react-router-dom'; 

import { Grid, Button } from '@material-ui/core'

function NavItem(props) {
    const name = props.name;
    const href = props.href;

    let content = '';

    if (name === 'Update') {
        content = (
            <Button fullWidth size="large" variant="outlined" color="primary" onClick={(event) => onUpdateClick(event, props)} disabled={props.isUpdateRequested === true ? true : false}>
                {name}
            </Button>
        );
    } else {
        content = (
            <Link to={href}>
                <Button fullWidth size="large" variant="outlined" color="primary">
                    {name}
                </Button>
            </Link>
        );
    }

    return (
        <Grid item xs={12}>
            {content}
        </Grid>
    );
}

function onUpdateClick(event, props) {
    event.preventDefault();
    props.onUpdate(props.dispatch);
}

export default NavItem
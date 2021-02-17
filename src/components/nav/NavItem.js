import { Link } from 'react-router-dom'
import { connect }  from 'react-redux'

import { Grid, Button } from '@material-ui/core'

import { updatePostThunk } from '../../slice/UpdateSlice'

function NavItem(props) {
    const { dispatch }      = props;
    const { updating }  = props.update;

    const name = props.name;
    const href = props.href;

    let content = '';

    const onUpdateClick = () => {
        dispatch(updatePostThunk());
    }

    if (name === 'Update') {
        content = (
            <Button fullWidth size="large" variant="outlined" color="primary" onClick={onUpdateClick} disabled={updating ? true : false}>
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

const mapStateToProps = state => {
    return {
        update: state.update
    };
}

export default connect(mapStateToProps)(NavItem)
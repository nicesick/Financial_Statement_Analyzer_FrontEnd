import React        from 'react'
import axios        from 'axios'
import { connect }  from 'react-redux'

import { Grid }     from '@material-ui/core'

import { ENDPOINTS }    from '../../constants/Constants'
import { requestUpdate, responseUpdate, getSuccessedUpdate, getFailedUpdate } from '../../actions/UpdateActions'

import NavItem          from './NavItem'
import NavUpdateTime    from './NavUpdateTime'
import AnalyzerSearch   from '../analyzer/AnalyzerSearch'

class Nav extends React.Component {
    getUpdateTime(dispatch) {
        dispatch(requestUpdate());

        axios.get(ENDPOINTS + 'api/update')
        .then(response => {
            dispatch(getSuccessedUpdate(response.data));
        }).catch(error => {
            dispatch(getFailedUpdate(error));
        }).finally(() => {
            dispatch(responseUpdate());
        });
    }

    onUpdate(dispatch) {
        dispatch(requestUpdate());

        axios.post(ENDPOINTS + 'api/update')
        .then(response => {
            dispatch(getSuccessedUpdate(response.data));
        }).catch(error => {
            dispatch(getFailedUpdate(error));
        }).finally(() => {
            dispatch(responseUpdate());
        });
    }

    componentDidMount() {
        const { dispatch } = this.props;
        this.getUpdateTime(dispatch);
    }

    render() {
        const navs = [
            {name : 'Guide' , link : '/guide'},
            {name : 'Search', link : '/search'},
            {name : 'Update', link : '/update'}
        ];

        return (
            <Grid container spacing={1}>
                {navs.map((nav, index) => {
                    return <NavItem key={index} {...this.props} name={nav.name} href={nav.link} onUpdate={this.onUpdate}/>
                })}
                <NavUpdateTime {...this.props} />
                <AnalyzerSearch {...this.props} />
            </Grid>
        );
    }
}

function select(props) {
    return {
        isUpdateRequested       : props.isUpdateRequested,
        updateTime              : props.updateTime,
        isCorpInfosRequested    : props.isCorpInfosRequested,
        corpInfos               : props.corpInfos
    }
}

export default connect(select)(Nav)
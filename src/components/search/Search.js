import React        from 'react'
import { connect }  from 'react-redux'
import axios        from 'axios'

import { Grid }     from '@material-ui/core'

import SearchContent from './SearchContent'
import { ENDPOINTS } from '../../constants/Constants'
import { requestCorps, responseCorps, getSuccessedCorps, getFailedCorps } from '../../actions/CorpActions'

class Search extends React.Component {
    getCorpInfos(dispatch, isEvalDone, isIssued, corpCls, corpName = null) {
        dispatch(requestCorps());
        
        return axios.get(ENDPOINTS + 'api/search', {
                params : {
                    isEvalDone  : isEvalDone,
                    isIssued    : isIssued,
                    corpCls     : corpCls,
                    corpName    : corpName
                }
            }).then(response => {
                dispatch(getSuccessedCorps(response));
            }).catch(error => {
                console.log(error);
                dispatch(getFailedCorps(error));
            }).finally(() => {
                dispatch(responseCorps());
            });
    }

    render() {
        return (
            <Grid container>
                <SearchContent {...this.props} getCorpInfos={this.getCorpInfos} />
            </Grid>
        );
    }
}

function select(props) {
    return {
        isCorpInfosRequested    : props.isCorpInfosRequested,
        corpInfos               : props.corpInfos
    }
}

export default connect(select)(Search)
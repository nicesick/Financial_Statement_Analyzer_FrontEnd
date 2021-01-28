import React        from 'react'
import { connect }  from 'react-redux'
import axios        from 'axios'

import { Grid }     from '@material-ui/core'

import { ENDPOINTS } from '../../constants/Constants'
import { requestCorpDetail, responseCorpDetail, getSuccessedCorpDetail, getFailedCorpDetail } from '../../actions/CorpDetailActions'

import AnalyzerResult from './AnalyzerResult'

class Analyzer extends React.Component {
    componentDidMount() {
        const { dispatch, corpCode } = this.props;
        getCorpDetail(dispatch, corpCode);
    }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <AnalyzerResult {...this.props}/>
                </Grid>
            </Grid>
        );
    }
}

function getCorpDetail(dispatch, corpCode) {
    dispatch(requestCorpDetail());

    axios.get(ENDPOINTS + 'api/search/' + corpCode)
    .then(response => {
        dispatch(getSuccessedCorpDetail(response.data));
    }).catch(error => {
        console.log(error);
        dispatch(getFailedCorpDetail(error));
    }).finally(() => {
        dispatch(responseCorpDetail());
    });
}

function select(props, ownProps) {
    return {
        isCorpDetailRequested   : props.isCorpDetailRequested,
        corpDetail              : props.corpDetail,
        corpCode                : ownProps.match.params.corpCode
    }
}

export default connect(select)(Analyzer)
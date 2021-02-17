import React        from 'react'
import { connect }  from 'react-redux'
import axios        from 'axios'

import { Grid }     from '@material-ui/core'

import { ENDPOINTS } from '../../constants/Constants'
import { requestCorpDetail, responseCorpDetail, getSuccessedCorpDetail, getFailedCorpDetail } from '../../actions/CorpDetailActions'

import AnalyzerResult from './AnalyzerResult'

class Analyzer extends React.Component {
    // componentDidMount() {
    //     const { dispatch, corpCode } = this.props;
    //     getCorpDetail(dispatch, corpCode);
    // }

    // shouldComponentUpdate(newProps, newState) {
    //     if (Object.keys(newProps.corpDetail).length > 0
    //         && (newProps.isCorpDetailRequested === false 
    //         && newProps.corpCode !== newProps.corpDetail.corp_code)
    //     ) {
    //         const { dispatch, corpCode } = newProps;
    //         getCorpDetail(dispatch, corpCode);

    //         return false;
    //     }

    //     return true;
    // }

    // componentDidUpdate(newProps, newState) {
    //     console.log(newProps);
    // }

    render() {
        return (
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <AnalyzerResult corpCode={this.props.corpCode} />
                </Grid>
            </Grid>
        );
    }
}

// function getCorpDetail(dispatch, corpCode) {
//     dispatch(requestCorpDetail());

//     axios.get(ENDPOINTS + 'api/search/' + corpCode)
//     .then(response => {
//         dispatch(getSuccessedCorpDetail(response.data));
//     }).catch(error => {
//         console.log(error);
//         dispatch(getFailedCorpDetail(error));
//     }).finally(() => {
//         dispatch(responseCorpDetail());
//     });
// }

function mapStateToProps(state, ownProps) {
    return {
        corpCode : ownProps.match.params.corpCode
    }
}

export default connect(mapStateToProps)(Analyzer)
import React        from 'react'
import { connect }  from 'react-redux'
import axios        from 'axios'

import { Grid }     from '@material-ui/core'

import SearchContent from './SearchContent'
import { ENDPOINTS } from '../../constants/Constants'
import { requestCorps, responseCorps, getSuccessedCorps, getFailedCorps } from '../../actions/CorpActions'

class Search extends React.Component {
    render() {
        return (
            <Grid container>
                <SearchContent />
            </Grid>
        );
    }
}

export default connect()(Search)
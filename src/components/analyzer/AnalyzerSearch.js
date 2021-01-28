import SearchResult from '../search/SearchResult'

import { Grid }     from '@material-ui/core'

function AnalyzerSearch(props) {
    return(
        <Grid item xs={12}>
            <SearchResult {...props} />
        </Grid>
    );
}

export default AnalyzerSearch
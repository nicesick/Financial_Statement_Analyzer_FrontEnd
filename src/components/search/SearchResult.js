import { Grid, List }  from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import SearchResultItem from './SearchResultItem'

function SearchResult(props) {
    const searchingMessage      = '검색중입니다.';
    const shouldSearchMessage   = '검색해주세요.';

    const successedMessage      = ' 건이 검색되었습니다.';
    const failedMessage         = '검색에 실패하였습니다.';

    let searchMessage   = undefined;
    let isItems         = false;
    if (props.isCorpInfosRequested === true) {
        searchMessage       = <Alert severity="warning">{searchingMessage}</Alert>;
    } else if (Object.keys(props.corpInfos).length < 1) {
        searchMessage       = <Alert severity="info">{shouldSearchMessage}</Alert>;
    } else {
        if (props.corpInfos.status === true) {
            isItems         = true;
            searchMessage   = <Alert severity="success">{props.corpInfos.data.length}{successedMessage}</Alert>;
        } else {
            searchMessage   = <Alert severity="error">{failedMessage}</Alert>;
        }
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                {searchMessage}
            </Grid>
            {isItems === false ? null : 
                <Grid item xs={12}>
                    <List component="nav">
                        {props.corpInfos.data.map((data, index) => {
                            return <SearchResultItem key={index} result={data} />
                        })}
                    </List>
                </Grid>
            }
        </Grid>
    );
}

export default SearchResult
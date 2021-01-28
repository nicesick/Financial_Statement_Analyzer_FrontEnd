import React    from 'react'

import { Grid } from '@material-ui/core'

import SearchItem   from './SearchItem'
import SearchButton from './SearchButton'
import SearchResult from './SearchResult'

function SearchContent(props) {
    const contents  = [
        {title : '검색어'   , type : 'text'},
        {title : '평가여부' , type : 'radio', values : ['True'   , 'False'], defaultValue : 1},
        {title : '이슈상태' , type : 'radio', values : ['True'   , 'False'], defaultValue : 2},
        {title : '상장종류' , type : 'radio', values : ['Y'      , 'K'],     defaultValue : 1}
    ];

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <form onSubmit={(event) => searchEvent(event, props)}>
                    <Grid container>
                        {contents.map((content, index) => {
                            return <SearchItem key={index} content={content} />
                        })}
                        <SearchButton isCorpInfosRequested={props.isCorpInfosRequested}/>
                    </Grid>
                </form>
            </Grid>
            <Grid item xs={12} md={6}>
                <SearchResult {...props} />
            </Grid>
        </Grid>
    );
}

const searchEvent = (event, props) => {
    // const { itemRefs, getCorpInfos }    = props;
    // let     searchParams                = {};

    // itemRefs.map(ref => {
    //     const refValue              = ref.current;
    //     console.log(refValue);

    //     searchParams[refValue.name] = refValue.value;

    //     return true;
    // });
    event.preventDefault();

    props.getCorpInfos(
          props.dispatch
        , event.target['평가여부'].value
        , event.target['이슈상태'].value
        , event.target['상장종류'].value
        , event.target['검색어'].value);
}

export default SearchContent
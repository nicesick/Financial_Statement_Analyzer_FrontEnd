import React, { useEffect }   from 'react'
import { connect }  from 'react-redux'

import { Grid, Input, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio } from '@material-ui/core'

import SearchItem   from './SearchItem'
import SearchButton from './SearchButton'
import SearchResult from './SearchResult'

import { changeSearchParams, searchEvaluatesThunk, searchCorpClsesThunk, searchCorpInfosThunk } from '../../slice/SearchSlice'

const SearchContent = (props) => {
    const { dispatch } = props;
    const { searchParams, searchEvaluates, searchCorpClses } = props.search;

    useEffect(() => {
        dispatch(searchEvaluatesThunk());
        dispatch(searchCorpClsesThunk());
    }, [dispatch]);

    // const contents  = [
    //     {title : '검색어'   , type : 'text'},
    //     {title : '상장종류' , type : 'radio', labels: ['코스피', '코스닥'], values : ['Y', 'K'], defaultValue : 1},
    //     {title : '정렬종류' , type : 'radio', }
    // ];

    const onSubmitEvent = (event, props) => {
        event.preventDefault();
        dispatch(searchCorpInfosThunk(searchParams));
        // props.getCorpInfos(
        //       props.dispatch
        //     , event.target['평가여부'].value
        //     , event.target['이슈상태'].value
        //     , event.target['상장종류'].value
        //     , event.target['검색어'].value);
    };

    const onChangeCorpName = (event) => {
        dispatch(changeSearchParams({ corpName: event.target.value }));
    };

    const onChangeCorpCls = (event) => {
        dispatch(changeSearchParams({ corpCls: event.target.value }));
    };

    const onChangeSortByService = (event) => {
        dispatch(changeSearchParams({ sortByService: event.target.value }));
    };

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
                <form onSubmit={(event) => onSubmitEvent(event, props)}>
                    <Grid container>
                        {/* {searchContents.map((content, index) => {
                            return <SearchItem key={index} />
                        })} */}
                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>검색어</FormLabel>
                                <FormControlLabel name='검색어' control={<Input fullWidth size="small" value={searchParams.corpName} onChange={onChangeCorpName} />}/>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>상장종류</FormLabel>
                                <RadioGroup name='상장종류' row={true} value={searchParams.corpCls} onChange={onChangeCorpCls} >
                                    {/* {values.map((value, index) => {
                                        return <FormControlLabel key={index} label={value} value={value} control={<Radio />}/>
                                    })} */}
                                    {/* <FormControlLabel label='코스피' value={'Y'} control={<Radio />} />
                                    <FormControlLabel label='코스닥' value={'K'} control={<Radio />} /> */}
                                    {searchCorpClses.map((searchCorpCls, idx) => {
                                        return <FormControlLabel key={idx} label={searchCorpCls} value={searchCorpCls} control={<Radio />} />
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl fullWidth margin="normal">
                                <FormLabel>정렬종류</FormLabel>
                                <RadioGroup name='정렬종류' row={true} value={searchParams.sortByService} onChange={onChangeSortByService} >
                                    {searchEvaluates.map((searchEvaluate, idx) => {
                                        return <FormControlLabel key={idx} label={searchEvaluate.name} value={searchEvaluate.value} control={<Radio />} defaultChecked={idx === 0 ? true : false}/>
                                    })}
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <SearchButton searching={props.searching} />
                    </Grid>
                </form>
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <SearchResult {...props.search} />
            </Grid> */}
        </Grid>
    );
}

const mapStateToProps = (state) => {
    return {
        search: state.search
    };
}

export default connect(mapStateToProps)(SearchContent)
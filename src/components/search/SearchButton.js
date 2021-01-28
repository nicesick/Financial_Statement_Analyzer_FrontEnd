import { FormControl, Button } from '@material-ui/core'

function SearchButton(props) {
    return (
        <FormControl fullWidth>
            <Button fullWidth type='submit' variant="outlined" color="primary" name='submit' disabled={props.isCorpInfosRequested === true ? true : false} >
                submit
            </Button>
        </FormControl>
    );
}

export default SearchButton
import { Grid, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, TextField } from '@material-ui/core'

function SearchItem(props) {
    const title         = props.content.title;
    // const type          = props.content.type;
    const values        = props.content.values;
    const defaultValue  = props.content.defaultValue;

    // const ref           = props.itemRef;

    let item = [];

    if (values === undefined) {
        item = <FormControlLabel name={title} control={<TextField fullWidth size="small"/>}/>;
    } else {
        item = (
            <RadioGroup name={title} row={true} defaultValue={values[defaultValue - 1]}>
                {values.map((value, index) => {
                    return <FormControlLabel key={index} label={value} value={value} control={<Radio />}/>
                })}
            </RadioGroup>
        );
    }

    return (
        <Grid item xs={12}>
            <FormControl fullWidth margin="normal">
                <FormLabel>{title}</FormLabel>
                {item}
            </FormControl>
        </Grid>
    )
}

export default SearchItem
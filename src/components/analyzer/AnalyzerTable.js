import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'

function AnalyzerTable(props) {
    const { table_infos } = props;

    return (
        <Grid item xs={6} sm={12}>
            <TableContainer component={Paper}>
                <Table>
                    <caption>{table_infos.title}{table_infos.result != null ? ' : ' + table_infos.result.toString() : null}</caption>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            {table_infos.labels.map((label, index) => {
                                return <TableCell key={index}>{label}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {table_infos.tables.map((table, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell>{table.label}</TableCell>
                                    {table.data.map((data, index) => {
                                        return <TableCell key={index}>{data}</TableCell>;
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
}

export default AnalyzerTable
import { Bar }  from 'react-chartjs-2'

import { Grid, Paper } from '@material-ui/core'

import getRandom from '../../utils/RandomRgba'

function AnalyzerResultBarChart(props) {
    let { chart_infos } = props;

    let data = {
        labels      : chart_infos.labels ,
        datasets    : []
    };

    chart_infos.charts.map(chart => {
        const color     = getRandom();
        const dataset   = {
            label               : chart.label ,
            backgroundColor     : color ,
            borderColor         : color ,
            borderWidth         : 1,
            hoverBackgroundColor: color ,
            hoverBorderColor    : color ,
            data                : chart.data
        };

        data.datasets.push(dataset);

        return true;
    });

    const options = {
        title : {
            display : true,
            text    : chart_infos.title
        },
        tooltips : {
            mode        : 'index',
            intersect   : false
        },
        responsive : true,
        scales : {
            xAxes : [{
                stacked : true
            }],
            yAxes : [{
                stacked : true
            }]
        }
    };

    return(
        <Grid item xs={12} md={6} component={Paper}>
            <Bar data={data} width={80} height={50} options={options}/>
        </Grid>
    );
}

export default AnalyzerResultBarChart
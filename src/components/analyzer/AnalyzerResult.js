import { Grid }     from '@material-ui/core'
import { Alert }    from '@material-ui/lab'

import AnalyzerResultBarChart   from './AnalyzerResultBarChart'
import AnalyzerResultLineChart  from './AnalyzerResultLineChart'
import AnalyzerTable            from './AnalyzerTable';

function AnalyzerResult(props) {
    const resultingMessage      = '분석중입니다.';
    const shouldResultMessage   = '분석해주세요.';

    const successedMessage      = '분석되었습니다.';
    const failedMessage         = '분석에 실패했습니다.';

    let resultMessage   = undefined;
    let isItems         = false;
    if (props.isCorpDetailRequested === true) {
        resultMessage       = <Alert severity="warning">{resultingMessage}</Alert>;
    } else if (Object.keys(props.corpDetail).length < 1) {
        resultMessage       = <Alert severity="info">{shouldResultMessage}</Alert>;
    } else {
        if (props.corpDetail.status === true) {
            isItems         = true;
            resultMessage   = <Alert severity="success">{successedMessage}</Alert>;
        } else {
            resultMessage   = <Alert severity="error">{failedMessage}</Alert>;
        }
    }

    let thstrmDts               = [];
    let totLiabilitys           = [];
    let totStockholdersEquitys  = [];
    let stockholdersEquitys     = [];

    let revenues                = [];
    let operatingIncomes        = [];
    let incomeBeforeTaxs        = [];
    let netIncomes              = [];

    let bar_chart_infos         = {};
    let line_chart_infos        = {};
    let tables_infos            = [];

    if (isItems) {
        const corp_detail = props.corpDetail;

        if (corp_detail.corpDetails !== undefined) {
            corp_detail.corpDetails.map(corpDetail => {
                thstrmDts.push(corpDetail.thstrmDt);
        
                totLiabilitys.push(parseInt(corpDetail.totLiability.replace(/,/g, '')));
                totStockholdersEquitys.push(parseInt(corpDetail.totStockholdersEquity.replace(/,/g, '')));
                stockholdersEquitys.push(parseInt(corpDetail.stockholdersEquity.replace(/,/g, '')));
        
                revenues.push(parseInt(corpDetail.revenue.replace(/,/g, '')));
                operatingIncomes.push(parseInt(corpDetail.operatingIncome.replace(/,/g, '')));
                incomeBeforeTaxs.push(parseInt(corpDetail.incomeBeforeTax.replace(/,/g, '')));
                netIncomes.push(parseInt(corpDetail.netIncome.replace(/,/g, '')));
        
                return true;
            });
        }
    
        bar_chart_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 재무상태표',
            charts      : [{
                label   : 'totLiability' ,
                data    : totLiabilitys
            }, {
                label   : 'totEquity' ,
                data    : totStockholdersEquitys
            }]
        };
    
        line_chart_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 손익계산서',
            charts      : [{
                label   : 'Revenue' ,
                data    : revenues
            }, {
                label   : 'OperatingIncome' ,
                data    : operatingIncomes
            }, {
                label   : 'NetIncome' ,
                data    : netIncomes
            }]
        };
        
        const revenue_table_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 매출액 부족여부',
            tables      : [{
                label   : '매출액' ,
                data    : revenues
            }],
            result      : corp_detail.revenueLack
        };
    
        const impairment_table_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 자본잠식 여부',
            tables      : [{
                label   : '자본총계' ,
                data    : totStockholdersEquitys
            }, {
                label   : '자본금' ,
                data    : stockholdersEquitys
            }],
            result      : corp_detail.equityImpairment
        };
    
        const operatingIncome_table_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 4년연속 영업손실 여부',
            tables      : [{
                label   : '영업이익' ,
                data    : operatingIncomes
            }],
            result      : corp_detail.operatingLoss
        };
    
        const lossBeforeTax_table_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 법인세차감전 순손실 여부',
            tables      : [{
                label   : '자본총계' ,
                data    : totStockholdersEquitys
            }, {
                label   : '법인세차감전 순이익' ,
                data    : incomeBeforeTaxs
            }],
            result      : corp_detail.lossBeforeTax
        };
    
        tables_infos.push(revenue_table_infos);
        tables_infos.push(impairment_table_infos);
    
        if (corp_detail.corp_cls === 'K') {
            tables_infos.push(operatingIncome_table_infos);
            tables_infos.push(lossBeforeTax_table_infos);
        }
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {resultMessage}
            </Grid>
            {isItems === false ? null : 
                <Grid item xs={12}>
                    <Grid container spacing={1}>
                        <AnalyzerResultBarChart     chart_infos={bar_chart_infos} />
                        <AnalyzerResultLineChart    chart_infos={line_chart_infos} />
            
                        {tables_infos.map((table_infos, index) => {
                            return <AnalyzerTable key={index} table_infos={table_infos}/>
                        })}
                    </Grid>
                </Grid>
            }
        </Grid>
    );
}

export default AnalyzerResult
import React, { useEffect }   from 'react'
import axios        from 'axios'
import { connect }  from 'react-redux'

import { Grid }     from '@material-ui/core'
import { Alert }    from '@material-ui/lab'

import AnalyzerResultBarChart   from './AnalyzerResultBarChart'
import AnalyzerResultLineChart  from './AnalyzerResultLineChart'
import AnalyzerTable            from './AnalyzerTable';

import { analyzeThunk } from '../../slice/AnalyzeSlice'

function AnalyzerResult(props) {
    const { dispatch , corpCode }       = props;
    const { analyzing, corpDetails }    = props.analyze;

    useEffect(() => {
        dispatch(analyzeThunk(corpCode));
    },[corpCode]);

    const resultingMessage      = '분석중입니다.';
    const shouldResultMessage   = '분석해주세요.';

    const successedMessage      = '분석되었습니다.';
    const failedMessage         = '분석에 실패했습니다.';

    let resultMessage   = undefined;
    let isItems         = false;

    if (analyzing) {
        resultMessage = <Alert severity="warning">{resultingMessage}</Alert>;
    } else {
        const status = corpDetails.status;

        if (status === '') {
            resultMessage   = <Alert severity="info">{shouldResultMessage}</Alert>;
        } else if (status === 200) {
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
        const corp_detail = corpDetails.data;

        if (corp_detail.corp_details !== undefined && corp_detail.corp_evals.issue.is_eval_done === true) {
            corp_detail.corp_details.map(corp_detail => {
                thstrmDts.push(corp_detail.thstrm_dt);
        
                totLiabilitys.push(parseInt(corp_detail.tot_liability.replace(/,/g, '')));
                totStockholdersEquitys.push(parseInt(corp_detail.tot_stockholders_equity.replace(/,/g, '')));
                stockholdersEquitys.push(parseInt(corp_detail.stockholders_equity.replace(/,/g, '')));
        
                revenues.push(parseInt(corp_detail.revenue.replace(/,/g, '')));
                operatingIncomes.push(parseInt(corp_detail.operating_income.replace(/,/g, '')));
                incomeBeforeTaxs.push(parseInt(corp_detail.income_before_tax.replace(/,/g, '')));
                netIncomes.push(parseInt(corp_detail.net_income.replace(/,/g, '')));
        
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
            result      : corp_detail.corp_evals.issue.is_revenue_lack
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
            result      : corp_detail.corp_evals.issue.is_equity_impairment
        };
    
        const operatingIncome_table_infos = {
            labels      : thstrmDts ,
            title       : corp_detail.corp_name + ' 4년연속 영업손실 여부',
            tables      : [{
                label   : '영업이익' ,
                data    : operatingIncomes
            }],
            result      : corp_detail.corp_evals.issue.is_operating_loss
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
            result      : corp_detail.corp_evals.issue.is_loss_before_tax
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

const mapStateToProps = (state, ownProps) => {
    return {
        analyze     : state.analyze,
        corpCode    : ownProps.corpCode
    }
}

export default connect(mapStateToProps)(AnalyzerResult)
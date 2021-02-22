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

    let corpDetailMsg       = undefined;
    let issueEvalDoneMsg    = undefined;
    let incomeEvalDoneMsg   = undefined;

    let isItems             = false;
    if (analyzing) {
        corpDetailMsg       = <Alert severity="warning">재무제표 {resultingMessage}</Alert>;
        issueEvalDoneMsg    = <Alert severity="warning">관리종목 {resultingMessage}</Alert>;
        incomeEvalDoneMsg   = <Alert severity="warning">영업이익 {resultingMessage}</Alert>;
    } else {
        const status = corpDetails.status;

        if (status === '') {
            corpDetailMsg       = <Alert severity="info">재무제표 {shouldResultMessage}</Alert>;
            issueEvalDoneMsg    = <Alert severity="info">관리종목 {shouldResultMessage}</Alert>;
            incomeEvalDoneMsg   = <Alert severity="info">영업이익 {shouldResultMessage}</Alert>;
        } else if (status === 200) {
            isItems             = true;
            corpDetailMsg       = <Alert severity="success">재무제표 {successedMessage}</Alert>;
            
            if (corpDetails.data.corp_evals.issue.is_eval_done) {
                issueEvalDoneMsg = <Alert severity="success">관리종목 {successedMessage}</Alert>;
            } else {
                issueEvalDoneMsg = <Alert severity="error">관리종목 {failedMessage}</Alert>;
            }

            if (corpDetails.data.corp_evals.operatingIncomeGrowthRatio.is_eval_done) {
                incomeEvalDoneMsg = <Alert severity="success">영업이익 {successedMessage}</Alert>;
            } else {
                incomeEvalDoneMsg   = <Alert severity="error">영업이익 {failedMessage}</Alert>;
            }
        } else {
            corpDetailMsg       = <Alert severity="error">재무제표 {failedMessage}</Alert>;
            issueEvalDoneMsg    = <Alert severity="error">관리종목 {failedMessage}</Alert>;
            incomeEvalDoneMsg   = <Alert severity="error">영업이익 {failedMessage}</Alert>;
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
    let income_tables_infos     = [];

    if (isItems) {
        const corp_detail = corpDetails.data;

        if (corp_detail.corp_details !== undefined) {
            corp_detail.corp_details.map(corp_detail => {
                thstrmDts.push(corp_detail.thstrm_dt);
        
                const tot_liability             = corp_detail.tot_liability != null ?
                                                corp_detail.tot_liability.replace(/,/g, '') : '0';

                const tot_stockholders_equity   = corp_detail.tot_stockholders_equity != null ?
                                                corp_detail.tot_stockholders_equity.replace(/,/g, '') : '0';

                const stockholders_equity       = corp_detail.stockholders_equity != null ?
                                                corp_detail.stockholders_equity.replace(/,/g, '') : '0';

                const revenue                   = corp_detail.revenue != null ?
                                                corp_detail.revenue.replace(/,/g, '') : '0';

                const operating_income          = corp_detail.operating_income != null ?
                                                corp_detail.operating_income.replace(/,/g, '') : '0';

                const income_before_tax         = corp_detail.income_before_tax != null ?
                                                corp_detail.income_before_tax.replace(/,/g, '') : '0';

                const net_income                = corp_detail.net_income != null ?
                                                corp_detail.net_income.replace(/,/g, '') : '0';

                totLiabilitys.push(parseInt(tot_liability));
                totStockholdersEquitys.push(parseInt(tot_stockholders_equity));
                stockholdersEquitys.push(parseInt(stockholders_equity));
        
                revenues.push(parseInt(revenue));
                operatingIncomes.push(parseInt(operating_income));
                incomeBeforeTaxs.push(parseInt(income_before_tax));
                netIncomes.push(parseInt(net_income));
        
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

        if (corp_detail.corp_evals.operatingIncomeGrowthRatio.is_eval_done) {
            const isKeepOperatingIncomePositive             = corp_detail.corp_evals.operatingIncomeGrowthRatio.is_keep_operating_income_positive;
            const isKeepOperatingIncomeGrowthRatioPositive  = corp_detail.corp_evals.operatingIncomeGrowthRatio.is_keep_operating_income_growth_ratio_positive;
            const operatingIncomeGrowthRatio                = corp_detail.corp_evals.operatingIncomeGrowthRatio.operating_income_growth_ratio;

            const operatingIncomeGrowthRatio_table_infos = {
                labels : ['영업이익 매년 흑자여부', '영업이익 매년 성장여부', '영업이익 성장률'],
                title : corp_detail.corp_name + ' 영업이익 성장률',
                tables : [{
                    data: [isKeepOperatingIncomePositive.toString(), isKeepOperatingIncomeGrowthRatioPositive.toString(), operatingIncomeGrowthRatio]
                }]
            }
    
            income_tables_infos.push(operatingIncomeGrowthRatio_table_infos);
        }
    }

    return (
        <Grid container spacing={1}>
            <Grid item xs={12}>
                {corpDetailMsg}
            </Grid>
            {Object.keys(bar_chart_infos).length <= 0 ? null : 
                <AnalyzerResultBarChart     chart_infos={bar_chart_infos} />
            }
            {Object.keys(line_chart_infos).length <= 0 ? null : 
                <AnalyzerResultLineChart    chart_infos={line_chart_infos} />
            }
            <Grid item xs={12}>
                {issueEvalDoneMsg}
            </Grid>
            {tables_infos.map((table_info, index) => {
                return <AnalyzerTable key={index} table_infos={table_info}/>
            })}
            <Grid item xs={12}>
                {incomeEvalDoneMsg}
            </Grid>
            {income_tables_infos.map((table_info, index) => {
                return <AnalyzerTable key={index} table_infos={table_info}/>
            })}
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
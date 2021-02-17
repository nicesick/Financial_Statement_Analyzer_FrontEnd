import React, { useEffect }   from 'react'
import axios        from 'axios'
import { connect }  from 'react-redux'

import { Grid }     from '@material-ui/core'

import { ENDPOINTS }    from '../../constants/Constants'
import { requestUpdate, responseUpdate, getSuccessedUpdate, getFailedUpdate } from '../../actions/UpdateActions'

import NavItem          from './NavItem'
import NavUpdateTime    from './NavUpdateTime'
import AnalyzerSearch   from '../analyzer/AnalyzerSearch'

import { updateGetThunk } from '../../slice/UpdateSlice'

const Nav = props => {
    const { dispatch } = props;

    useEffect(() => {
        dispatch(updateGetThunk());
    }, [dispatch]);

    return (
        <Grid container spacing={1}>
            {/* {navs.map((nav, index) => {
                return <NavItem key={index} {...this.props} name={nav.name} href={nav.link} onUpdate={this.onUpdate}/>
            })} */}
            <NavItem name='Guide' href='/guide' />
            <NavItem name='Search' href='/search' />
            <NavItem name='Update' href='/update' />
    
            <NavUpdateTime {...props.update} />
            {/* <AnalyzerSearch {...this.props} /> */}
        </Grid>
    );
}

// class Nav extends React.Component {
//     render() {
//         // const navs = [
//         //     {name : 'Guide' , link : '/guide'},
//         //     {name : 'Search', link : '/search'},
//         //     {name : 'Update', link : '/update'}
//         // ];
//         return (
//             <Grid container spacing={1}>
//                 {/* {navs.map((nav, index) => {
//                     return <NavItem key={index} {...this.props} name={nav.name} href={nav.link} onUpdate={this.onUpdate}/>
//                 })} */}
//                 <NavItem name='Guide' href='/guide' />
//                 <NavItem name='Search' href='/search' />
//                 <NavItem name='Update' href='/update' />

//                 <NavUpdateTime />
//                 {/* <AnalyzerSearch {...this.props} /> */}
//             </Grid>
//         );
//     }
// }

const mapStateToProps = state => {
    return {
        update: state.update
    };
}

export default connect(mapStateToProps)(Nav)
import { Grid }  from '@material-ui/core'
import { Alert } from '@material-ui/lab'

import { connect }  from 'react-redux'

function NavUpdateTime(props) {
    const updateingMessage      = '업데이트가 진행중입니다.';
    const shouldUpdateMessage   = '업데이트를 진행해 주세요.';

    const successedMessage      = props.updateTime.data.updateDate;
    const failedMessage         = '업데이트에 실패하였습니다.';

    let updateMessage           = undefined;

    if (props.updating) {
        updateMessage       = <Alert severity="warning">{updateingMessage}</Alert>;
    } else {
        const status = props.updateTime.status;

        if (status === '') {
            updateMessage       = <Alert severity="info">{shouldUpdateMessage}</Alert>;
        } else if (status === 204) {
            updateMessage       = <Alert severity="info">{shouldUpdateMessage}</Alert>;
        } else if (status === 200) {
            const progress = props.updateTime.data.progress;

            if (progress === 'updating') {
                updateMessage = <Alert severity="warning">{updateingMessage}</Alert>;
            } else if (progress === 'success') {
                updateMessage = <Alert severity="success">업데이트 : {successedMessage}</Alert>;
            } else {
                updateMessage = <Alert severity="error">{failedMessage}</Alert>;
            }
        } else {
            updateMessage = <Alert severity="error">{failedMessage}</Alert>;
        }
    }
 
    // if (props.update.updating === true) {
    //     updateMessage       = <Alert severity="warning">{updateingMessage}</Alert>;
    // } else if (Object.keys(props.updateTime).length < 1) {
    //     updateMessage       = <Alert severity="info">{shouldUpdateMessage}</Alert>;
    // } else if (props.updateTime.progress === 'updating') {
    //     updateMessage       = <Alert severity="warning">{updateingMessage}</Alert>;
    // } else {
    //     if (props.updateTime.progress === 'success') {
    //         updateMessage = <Alert severity="success">업데이트 : {successedMessage}</Alert>;
    //     } else {
    //         updateMessage = <Alert severity="error">{failedMessage}</Alert>;
    //     }
    // }

    return (
        <Grid item xs={12}>
            {updateMessage}
        </Grid>
    );
}

export default NavUpdateTime
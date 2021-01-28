import { Grid }  from '@material-ui/core'
import { Alert } from '@material-ui/lab'

function NavUpdateTime(props) {
    const updateingMessage      = '업데이트가 진행중입니다.';
    const shouldUpdateMessage   = '업데이트를 진행해 주세요.';

    const successedMessage      = props.updateTime.updateDate;
    const failedMessage         = '업데이트에 실패하였습니다.';

    let updateMessage       = undefined;

    if (props.isUpdateRequested === true) {
        updateMessage       = <Alert severity="warning">{updateingMessage}</Alert>;
    } else if (Object.keys(props.updateTime).length < 1) {
        updateMessage       = <Alert severity="info">{shouldUpdateMessage}</Alert>;
    } else if (props.updateTime.progress === 'updating') {
        updateMessage       = <Alert severity="warning">{updateingMessage}</Alert>;
    } else {
        if (props.updateTime.progress === 'success') {
            updateMessage = <Alert severity="success">{successedMessage}</Alert>;
        } else {
            updateMessage = <Alert severity="error">{failedMessage}</Alert>;
        }
    }

    return (
        <Grid item xs={12}>
            {updateMessage}
        </Grid>
    );
}

export default NavUpdateTime
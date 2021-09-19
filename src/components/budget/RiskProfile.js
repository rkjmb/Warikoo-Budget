import Button from '@material-ui/core/Button';
import { profileConfig } from '../../utils/budgetService';

const RiskProfile = ({ profile, setprofile }) => {
    return <Button
        size='medium'
        style={{ background: profileConfig[profile].color }}
        variant={'contained'}
        color="primary"
        onClick={() => setprofile(profileConfig[(profile + 1) % (profileConfig.length)])}
    >
        {profileConfig[profile].name}
    </Button >
}

export default RiskProfile

import Chip from '@material-ui/core/Chip';
import { profileConfig } from '../../utils/budgetService';

const RiskProfile = ({ profile, setprofile }) => {
    return <Chip
        color="primary"
        style={{ background: profileConfig[profile].color }}
        label={profileConfig[profile].name}
        onClick={() => { setprofile(profileConfig[(profile + 1) % (profileConfig.length)]) }}
    />
}

export default RiskProfile

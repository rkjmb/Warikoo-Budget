import { useState } from 'react'
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import YoutubeEmbed from '../YoutubeEmbeded';

import { videoId } from '../../config/config';

const InfoContent = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} textColor="primary"
                    indicatorColor="primary">
                    <Tab label="Description" {...a11yProps(0)} />
                    <Tab label="Video" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Typography variant='h6'>50(Needs) - 30(Wants) - 20(Invest) rule</Typography>
                <Typography>What if you follow 20(Needs) - 30(Wants) - 50(Invest) rule from the raise you get every year? This would significantly increase your investment %</Typography>
                <Typography>This would work because your lifestyle won't change drastically for the first 10 years of your journey and you can somehow manage your expenses</Typography>
                <Typography>Rest is just the magic of compounding and Systematic Investment Plan (SIP)</Typography>
                <Typography>Thanks Ankur :)</Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <YoutubeEmbed embedId={videoId} />
            </TabPanel>
        </Box >
    );
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

export default InfoContent;
import ReactGA from 'react-ga';
import { trackingId } from '../../config/config';

const googleAnalyticsAction = {};

googleAnalyticsAction.initGoogleAnalytics = async () => {
    ReactGA.initialize(trackingId);
    ReactGA.pageview(window.location.pathname + window.location.search)
}

export { googleAnalyticsAction }
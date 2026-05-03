import { useState } from 'react';
import { Rail, UserBar } from './components/Shell';
import Dashboard from './pages/Dashboard';
import Activity from './pages/Activity';
import Assets from './pages/Assets';
import Offerings from './pages/Offerings';
import Investors from './pages/Investors';
import InvestorDetail from './pages/InvestorDetail';
import Subscriptions from './pages/Subscriptions';
import Tokenization from './pages/Tokenization';
import HoldersRegistry from './pages/HoldersRegistry';
import Distributions from './pages/Distributions';
import InvestorPortal from './pages/InvestorPortal';

const PAGE_TITLE = {
  'dashboard':           'Dashboard',
  'activity':            'Activity',
  'assets':              'Assets',
  'asset-detail':        'Meridian Multifamily Property I',
  'offerings':           'Offerings',
  'offering-detail':     'Meridian Multifamily Series A',
  'investors':           'Investors',
  'investor-detail':     'Investor Detail',
  'subscriptions':       'Subscriptions',
  'subscription-detail': 'Subscription Detail',
  'tokenization':        'Tokenization',
  'holders-registry':    'Holders Registry',
  'distributions':       'Distributions',
  'distribution-detail': 'Q1 2026 Distribution',
};

const INV_PAGE_TITLE = {
  'portfolio':     'My Portfolio',
  'communication': 'Communication',
};

export default function App() {
  const [userContext, setUserContext] = useState('sponsor');
  const [route, setRoute] = useState({ page: 'dashboard', params: {} });
  const [invPage, setInvPage] = useState('portfolio');

  const navigate = (page, params = {}) => setRoute({ page, params });
  const navigateInv = (page) => setInvPage(page);

  const renderPage = () => {
    switch (route.page) {
      case 'dashboard':           return <Dashboard navigate={navigate} />;
      case 'activity':            return <Activity navigate={navigate} />;
      case 'assets':              return <Assets navigate={navigate} />;
      case 'asset-detail':        return <Assets navigate={navigate} showDetail />;
      case 'offerings':           return <Offerings navigate={navigate} />;
      case 'offering-detail':     return <Offerings navigate={navigate} showDetail />;
      case 'investors':           return <Investors navigate={navigate} />;
      case 'investor-detail':     return <InvestorDetail navigate={navigate} investorId={route.params.investorId || 'northstar'} initialTab={route.params.tab} />;
      case 'subscriptions':       return <Subscriptions navigate={navigate} />;
      case 'subscription-detail': return <Subscriptions navigate={navigate} showDetail detailId={route.params.subscriptionId || 'northstar'} />;
      case 'tokenization':        return <Tokenization navigate={navigate} />;
      case 'holders-registry':    return <HoldersRegistry navigate={navigate} />;
      case 'distributions':       return <Distributions navigate={navigate} />;
      case 'distribution-detail': return <Distributions navigate={navigate} showDetail detailId={route.params.distributionId || 'q1-2026'} />;
      default:                    return <Dashboard navigate={navigate} />;
    }
  };

  const title = userContext === 'investor'
    ? INV_PAGE_TITLE[invPage] || 'My Portfolio'
    : (route.page === 'investor-detail' && route.params.investorName ? route.params.investorName : PAGE_TITLE[route.page] || '');

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Rail
        page={userContext === 'investor' ? invPage : route.page}
        navigate={userContext === 'investor' ? navigateInv : navigate}
        userContext={userContext}
      />
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <UserBar title={title} userContext={userContext} onUserSwitch={setUserContext} />
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
          {userContext === 'investor' ? <InvestorPortal page={invPage} /> : renderPage()}
        </div>
      </main>
    </div>
  );
}

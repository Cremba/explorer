import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Footer from './components/Footer/Footer.jsx';
import Blocks from './routes/blocks/Blocks.jsx';
import Block from './routes/block/Block.jsx';
import blockStore from './store/BlockStore';
import Transaction from './routes/transaction/Transaction.jsx';
import Address from './routes/address/Address.jsx';

class App extends Component {
  constructor(props) {
    super(props);

    this.fetchSyncingTimeout = this.fetchSyncingTimeout.bind(this);
  }

  componentDidMount() {
    blockStore.fetchMedianTime();
    blockStore.fetchBlocks();
    this.fetchSyncingTimeout();
  }

  componentWillUnmount() {
    clearInterval(this.syncingTimer);
  }

  fetchSyncingTimeout() {
    blockStore.fetchSyncing().then(() => {
      this.syncingTimer = setTimeout(this.fetchSyncingTimeout, 60000);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="container px-lg-5">
          <Navbar />
        </div>
        <div className="App-separator mb-3 mb-sm-4 mb-lg-5" />
        <div className="container px-lg-5">
          <Switch>
            <Route exact path="/(|blocks)" component={Blocks} />
            <Route path="/blocks/:id" component={Block} />
            <Route path="/tx/:hash" component={Transaction} />
            <Route path="/address/:address/:asset?" component={Address} />
          </Switch>
        </div>
        <div className="container px-lg-5">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;

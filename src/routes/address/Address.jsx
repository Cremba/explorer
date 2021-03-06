import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import blockStore from '../../store/BlockStore';
import uiStore from '../../store/UIStore';
import RouterUtils from '../../lib/RouterUtils';
import AssetUtils from '../../lib/AssetUtils';
import TextUtils from '../../lib/TextUtils';
import AddressTxsTable from '../../components/AddressTxsTable/AddressTxsTable.jsx';
import Loading from '../../components/Loading/Loading.jsx';
import HashLink from '../../components/HashLink/HashLink.jsx';
import ItemNotFound from '../../components/ItemNotFound/ItemNotFound.jsx';
import './Address.css';

class AddressPage extends Component {
  componentDidMount() {
    const params = RouterUtils.getRouteParams(this.props);
    this.setAddress(params.address);
  }

  componentDidUpdate(prevProps) {
    const params = RouterUtils.getRouteParams(this.props);
    const prevParams = RouterUtils.getRouteParams(prevProps);

    if (params.address !== prevParams.address) {
      this.setAddress(params.address);
    }
  }

  setAddress(address) {
    uiStore.setAddressTxTableData({address});
  }

  render() {
    const params = RouterUtils.getRouteParams(this.props);
    let zpBalance = {
      received: getAssetTotal(blockStore.address.received, '00'),
      sent: getAssetTotal(blockStore.address.sent, '00'),
      balance: getAssetTotal(blockStore.address.balance, '00'),
    };
    const is404 = blockStore.address.status === 404;

    return (
      <div className="Address">
        <section className="bordered border-left border-primary pl-lg-4">
          <div className="row">
            <div className="col-sm">
              <h1 className="d-block d-sm-inline-block text-white mb-3 mb-lg-5">
                ADDRESS
                <div className="address break-word">
                  <HashLink hash={params.address} shorten={false} />
                </div>
              </h1>
            </div>
          </div>
          {blockStore.loading.address ? (
            <Loading />
          ) : !is404 ? (
            <div className="row">
              <div className="col-lg-6">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" colSpan="2" className="text-white border-0">
                        SUMMARY
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>BALANCE</td>
                      <td>{AssetUtils.getAmountString({ asset: '00' }, zpBalance.balance)}</td>
                    </tr>
                    <tr>
                      <td>TRANSACTIONS</td>
                      <td>{TextUtils.formatNumber(blockStore.addressTransactionsCount)}</td>
                    </tr>
                    <tr>
                      <td>TOTAL RECEIVED</td>
                      <td>{AssetUtils.getAmountString({ asset: '00' }, zpBalance.received)}</td>
                    </tr>
                    <tr>
                      <td>TOTAL SENT</td>
                      <td>{AssetUtils.getAmountString({ asset: '00' }, zpBalance.sent)}</td>
                    </tr>
                    <tr>
                      <td>NO. ASSET TYPES</td>
                      <td>{blockStore.address.assets ? blockStore.address.assets.length : ''}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-6">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" colSpan="2" className="text-white border-0">
                        BALANCES
                      </th>
                    </tr>
                    <tr>
                      <th scope="col" className="text-white border-bottom-0">
                        ASSET
                      </th>
                      <th scope="col" className="text-white border-bottom-0">
                        AMOUNT
                      </th>
                    </tr>
                  </thead>
                  <tbody>{this.getBalanceTableRows()}</tbody>
                </table>
              </div>
            </div>
          ) : (
            <ItemNotFound item="Address" />
          )}
        </section>

        <section className={classNames('bordered border-left border-primary pl-lg-4', {'d-none': is404})}>
          <AddressTxsTable />
        </section>
      </div>
    );
  }

  getBalanceTableRows() {
    if (!blockStore.address.balance) return null;

    return blockStore.address.balance.map((assetBalance, index) => {
      return (
        <tr key={index}>
          <td>
            <HashLink hash={AssetUtils.getTypeFromCode(assetBalance.asset)} />
          </td>
          <td>{AssetUtils.getAmountString(assetBalance, assetBalance.total)}</td>
        </tr>
      );
    });
  }
}

AddressPage.propTypes = {
  match: PropTypes.object,
};

function getAssetTotal(array, asset) {
  if (array && array.length) {
    for (let i = 0; i < array.length; i++) {
      const element = array[i];
      if (element.asset === asset) {
        return element.total;
      }
    }
  }
  return 0;
}

export default observer(AddressPage);

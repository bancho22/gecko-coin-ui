import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import CoinModal from './CoinModal';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function App() {
  const [page, setPage] = useState(1);
  const [rowData, setRowData] = useState([]);

  const [viewingCoinId, setViewingCoinId] = useState(null);
  const openModal = coinId => setViewingCoinId(coinId);
  const closeModal = () => setViewingCoinId(null);

  const [columnDefs] = useState([
    { field: 'image', cellRenderer: ({ value }) => {
      return (
        <img alt="coin_logo" src={value} style={{height: '100%'}} />
      );
    }},
    { field: 'name' },
    { field: 'symbol' },
    { field: 'current_price', headerName: 'Current Price' },
    { field: 'high_24h', headerName: 'High 24 hour Price' },
    { field: 'low_24h', headerName: 'Low 24 hour Price' },
    { field: 'id', headerName: 'More', cellRenderer: ({ value }) => {
      return (
        <button onClick={() => openModal(value)}>
          View Details
        </button>
      );
    }}
  ]);

  useEffect(() => {
    async function fetchCoins() {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=10&page=${page}`);
      const coins = await response.json();
      setRowData(coins);
    }
    fetchCoins();
  }, [page]);

  return (
    <React.Fragment>
      <div className="ag-theme-alpine" style={{ height: '90vh', width: '100%' }}>
        <AgGridReact rowData={rowData} columnDefs={columnDefs}></AgGridReact>
      </div>
      <div>
        <button disabled={page === 1} onClick={() => setPage(prevPage => prevPage - 1)}>
          Prev
        </button>
        <button onClick={() => setPage(prevPage => prevPage + 1)}>
          Next
        </button>
      </div>
      <CoinModal
        modalIsOpen={Boolean(viewingCoinId)}
        closeModal={closeModal}
        coinId={viewingCoinId}
      />
    </React.Fragment>
  );
}

export default App;

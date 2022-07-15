import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    maxWidth: '70%',
    transform: 'translate(-50%, -50%)',
  },
};

const CoinModal = ({
  closeModal,
  modalIsOpen,
  coinId,
}) => {
  const [coinData, setCoinData] = useState({});
  useEffect(() => {
    async function fetchCoinData() {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`);
      const coin = await response.json();
      setCoinData(coin);
    }
    Boolean(coinId) && fetchCoinData();
  }, [coinId]);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={coinId}
    >
      <h2>{coinData?.name}</h2>
      <h3>Symbol: {coinData?.symbol}</h3>
      <h4>Hashing Algorithm: {coinData?.hashing_algorithm || 'N/A'}</h4>
      <h4>Description:</h4>
      <div>{coinData?.description?.en || 'N/A'}</div>
      <h4>Market cap in EUR: {coinData?.market_cap?.eur || 'N/A'}</h4>
      <h4>Homepage: {coinData?.links?.homepage?.[0] || 'N/A'}</h4>
      <h4>Genesis Date: {coinData?.genesis_date || 'N/A'}</h4>
    </Modal>
  );
};

export default CoinModal;

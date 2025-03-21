let provider;
let signer;

window.addEventListener("DOMContentLoaded", () => {
  const connectWalletBtn = document.getElementById("connectWalletBtn");
  const mintBtn = document.getElementById("mintBtn");
  const statusMsg = document.getElementById("statusMsg");

  connectWalletBtn.onclick = async () => {
    if (window.ethereum) {
      try {
        await ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        connectWalletBtn.textContent = `Connected: ${userAddress.slice(0, 6)}...`;
        statusMsg.textContent = "Wallet connected!";
      } catch (err) {
        console.error(err);
        statusMsg.textContent = "Connection failed.";
      }
    } else {
      alert("MetaMask not detected!");
    }
  };

  mintBtn.onclick = async () => {
    const tokenURI = document.getElementById("tokenURI").value.trim();
    if (!tokenURI) {
      statusMsg.textContent = "Please enter a Token URI.";
      return;
    }

    if (!signer) {
      statusMsg.textContent = "Connect wallet first.";
      return;
    }

    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    try {
      const tx = await contract.mint(tokenURI);
      statusMsg.textContent = "Minting... Please wait...";
      await tx.wait();
      statusMsg.textContent = "NFT minted successfully!";
    } catch (err) {
      console.error(err);
      statusMsg.textContent = "Mint failed. Check console.";
    }
  };
});

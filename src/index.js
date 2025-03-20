import { ethers } from "./ethers.min.js";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "./config.js";

async function mintNFT() {
    const status = document.getElementById("status");
    const tokenURI = document.getElementById("tokenURI").value;

    if (!window.ethereum) {
        status.innerText = "MetaMask is not installed!";
        return;
    }

    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    try {
        const tx = await contract.mint(tokenURI);
        status.innerText = "Transaction sent: " + tx.hash;
        await tx.wait();
        status.innerText = "NFT Minted! Tx Hash: " + tx.hash;
    } catch (err) {
        status.innerText = "Error: " + err.message;
    }
}
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title Mansions NFT Collection
 * @dev Comprehensive NFT contract for Mansions collection with minting, royalties, and owner functions
 * @author Mansions Team
 */
contract Mansions is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Pausable,
    Ownable,
    ERC2981,
    ReentrancyGuard
{
    using Strings for uint256;

    // Collection constants
    uint256 public constant MAX_SUPPLY = 27;
    string public constant SYMBOL = "MOON";

    // Minting configuration
    uint256 public mintPrice = 0.005 ether;
    uint256 private currentTokenId = 0;

    // Metadata configuration
    string private baseTokenURI;
    string private contractURIValue;

    // Minting controls
    bool public mintingActive = true;
    uint256 public maxMintsPerWallet = 5;
    mapping(address => uint256) public walletMints;
    

    // Events
    event MintPriceUpdated(uint256 oldPrice, uint256 newPrice);
    event BaseURIUpdated(string oldURI, string newURI);
    event MintingStatusChanged(bool status);
    event BatchMinted(address to, uint256 startTokenId, uint256 quantity);
    event RoyaltyUpdated(address recipient, uint96 feeNumerator);

    // Custom errors
    error ExceedsMaxSupply();
    error InsufficientPayment();
    error MintingNotActive();
    error ExceedsMaxMintsPerWallet();
    error TokenDoesNotExist();
    error WithdrawalFailed();
    error InvalidInput();

    constructor(
        string memory baseTokenURIParam,
        string memory contractURIParam,
        address royaltyRecipient,
        uint96 royaltyFeeNumerator
    ) ERC721("Moon Mansions", SYMBOL) Ownable(msg.sender) {
        baseTokenURI = baseTokenURIParam;
        contractURIValue = contractURIParam;

        _setDefaultRoyalty(royaltyRecipient, royaltyFeeNumerator);
    }

    /**
     * @dev Public minting function
     * @param quantity Number of tokens to mint
     */
    function mint(uint256 quantity) external payable nonReentrant {
        if (!mintingActive) revert MintingNotActive();
        if (currentTokenId + quantity > MAX_SUPPLY) revert ExceedsMaxSupply();
        if (msg.value < mintPrice * quantity) revert InsufficientPayment();
        if (walletMints[msg.sender] + quantity > maxMintsPerWallet) {
            revert ExceedsMaxMintsPerWallet();
        }

        walletMints[msg.sender] += quantity;

        uint256 startTokenId = currentTokenId;
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, currentTokenId);
            currentTokenId++;
        }

        emit BatchMinted(msg.sender, startTokenId, quantity);
    }

    /**
     * @dev Owner-only batch minting for airdrops or reserves
     * @param to Address to mint to
     * @param quantity Number of tokens to mint
     */
    function ownerMint(address to, uint256 quantity) external onlyOwner {
        if (currentTokenId + quantity > MAX_SUPPLY) revert ExceedsMaxSupply();
        if (to == address(0)) revert InvalidInput();

        uint256 startTokenId = currentTokenId;
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(to, currentTokenId);
            currentTokenId++;
        }

        emit BatchMinted(to, startTokenId, quantity);
    }

    /**
     * @dev Pause or unpause minting
     * @param status New minting status
     */
    function setMintingActive(bool status) external onlyOwner {
        mintingActive = status;
        emit MintingStatusChanged(status);
    }

    /**
     * @dev Update mint price
     * @param newPrice New price in wei
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        uint256 oldPrice = mintPrice;
        mintPrice = newPrice;
        emit MintPriceUpdated(oldPrice, newPrice);
    }

    /**
     * @dev Withdraw contract balance to owner
     */
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        (bool success, ) = payable(owner()).call{value: balance}("");
        if (!success) revert WithdrawalFailed();
    }

    /**
     * @dev Emergency withdrawal to specific address
     * @param to Address to send funds to
     */
    function emergencyWithdraw(address payable to) external onlyOwner nonReentrant {
        if (to == address(0)) revert InvalidInput();
        uint256 balance = address(this).balance;
        (bool success, ) = to.call{value: balance}("");
        if (!success) revert WithdrawalFailed();
    }

    /**
     * @dev Set base URI for metadata
     * @param baseTokenURIParam New base URI
     */
    function setBaseURI(string calldata baseTokenURIParam) external onlyOwner {
        string memory oldURI = baseTokenURI;
        baseTokenURI = baseTokenURIParam;
        emit BaseURIUpdated(oldURI, baseTokenURIParam);
    }

    /**
     * @dev Set contract URI for marketplace metadata
     * @param contractURIParam New contract URI
     */
    function setContractURI(string calldata contractURIParam) external onlyOwner {
        contractURIValue = contractURIParam;
    }

    /**
     * @dev Set max mints per wallet
     * @param maxMints New maximum mints per wallet
     */
    function setMaxMintsPerWallet(uint256 maxMints) external onlyOwner {
        maxMintsPerWallet = maxMints;
    }

    /**
     * @dev Update royalty information
     * @param recipient Address to receive royalties
     * @param feeNumerator Royalty fee (e.g., 750 = 7.5%)
     */
    function setRoyalty(address recipient, uint96 feeNumerator) external onlyOwner {
        _setDefaultRoyalty(recipient, feeNumerator);
        emit RoyaltyUpdated(recipient, feeNumerator);
    }

    function pause() external onlyOwner {
        _pause();
    }

    function unpause() external onlyOwner {
        _unpause();
    }

    // View functions

    /**
     * @dev Get total number of tokens minted
     */
    function totalMinted() external view returns (uint256) {
        return currentTokenId;
    }

    /**
     * @dev Get remaining tokens available for minting
     */
    function remainingSupply() external view returns (uint256) {
        return MAX_SUPPLY - currentTokenId;
    }

    /**
     * @dev Get token URI
     * @param tokenId Token ID to get URI for
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        _requireOwned(tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0
            ? string(abi.encodePacked(baseURI, tokenId.toString(), ".json"))
            : "";
    }

    /**
     * @dev Get base URI
     */
    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    /**
     * @dev Get contract URI for marketplace metadata
     */
    function contractURI() external view returns (string memory) {
        return contractURIValue;
    }

    /**
     * @dev Check if token exists
     * @param tokenId Token ID to check
     */
    function exists(uint256 tokenId) external view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    /**
     * @dev Get tokens owned by address
     * @param owner Address to get tokens for
     */
    function tokensOfOwner(address owner) external view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](tokenCount);

        for (uint256 i = 0; i < tokenCount; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }

        return tokenIds;
    }

    // Required overrides

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable, ERC721Pausable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(
        address account,
        uint128 value
    ) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage, ERC2981)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // Fallback functions
    receive() external payable {}

    fallback() external payable {}
}

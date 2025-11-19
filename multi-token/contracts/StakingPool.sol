// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StakingPool is Ownable {
    IERC1155 public stakingToken;
    struct Stake {
        uint256 amount;
        uint256 lockTime;
    }

    // tokenId => user => Stake
    mapping(uint256 => mapping(address => Stake)) public stakes;

    // Reward tracking
    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    
    // User reward tracking
    mapping(address => mapping(uint256 => uint256)) public userRewardPerTokenPaid;
    mapping(address => mapping(uint256 => uint256)) public rewards;
    event Staked(address indexed user, uint256 indexed tokenId, uint256 amount, uint256 lockTime);
    event Unstaked(address indexed user, uint256 indexed tokenId, uint256 amount);
    event RewardPaid(address indexed user, uint256 indexed tokenId, uint256 reward);
    event RewardRateUpdated(uint256 newRate);
    
    constructor(address _stakingToken) Ownable(msg.sender) {
        stakingToken = IERC1155(_stakingToken);
    }
    
    function stake(uint256 tokenId, uint256 amount, uint256 lockTime ) external {
        require(amount > 0, "Cannot stake 0");
        require(lockTime > 0, "Lock time must be > 0");
        
        // Transfer tokens from user to this contract
        stakingToken.safeTransferFrom(msg.sender, address(this), tokenId, amount, "");
        
        // Update rewards
        _updateReward(msg.sender, tokenId);
        
        // Record stake
        stakes[tokenId][msg.sender] = Stake({
            amount: stakes[tokenId][msg.sender].amount + amount, lockTime: block.timestamp + lockTime
        });
        
        emit Staked(msg.sender, tokenId, amount, lockTime);
    }
    
    function unstake(uint256 tokenId, uint256 amount) external {
        Stake storage userStake = stakes[tokenId][msg.sender];
        require(userStake.amount >= amount, "Insufficient stake");
        require(block.timestamp >= userStake.lockTime, "Tokens still locked");
        
        // Update rewards before unstaking
        _updateReward(msg.sender, tokenId);
        
        // Update stake
        userStake.amount -= amount;
        
        // Transfer tokens back to user
        stakingToken.safeTransferFrom(address(this), msg.sender, tokenId, amount, "");
        emit Unstaked(msg.sender, tokenId, amount);
    }

    function claimRewards(uint256 tokenId) external {
        _updateReward(msg.sender, tokenId);
        uint256 reward = rewards[msg.sender][tokenId];
        require(reward > 0, "No rewards to claim");
        rewards[msg.sender][tokenId] = 0;
        
        // In a real implementation, you would transfer actual reward tokens here
        // For this example, we'll just emit an event
        emit RewardPaid(msg.sender, tokenId, reward);
    }
    
    function setRewardRate(uint256 _rewardRate) external onlyOwner {
        rewardRate = _rewardRate;
        lastUpdateTime = block.timestamp;
        emit RewardRateUpdated(_rewardRate);
    }
        
    function _updateReward(address account, uint256 tokenId) internal {
        uint256 timeSinceLastUpdate = block.timestamp - lastUpdateTime;
        if (timeSinceLastUpdate > 0 && rewardRate > 0) {
            uint256 rewardPerToken = timeSinceLastUpdate * rewardRate;
            rewardPerTokenStored += rewardPerToken;
            lastUpdateTime = block.timestamp;
        }
        rewards[account][tokenId] = stakes[tokenId][account].amount * (rewardPerTokenStored - userRewardPerTokenPaid[account][tokenId]) / 1e18;
        userRewardPerTokenPaid[account][tokenId] = rewardPerTokenStored;
    }
    
    function getStakeInfo(uint256 tokenId, address user) external returns (uint256 amount, uint256 lockTime, uint256 pendingRewards) {
        _updateReward(user, tokenId);
        Stake memory userStake = stakes[tokenId][user];
        
        return (userStake.amount, userStake.lockTime, rewards[user][tokenId]);
    }
}
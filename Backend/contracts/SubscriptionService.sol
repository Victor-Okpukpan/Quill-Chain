// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract SubscriptionService is Ownable {
    struct Subscription {
        uint256 startDate;
        uint256 endDate;
        bool isActive;
        uint256 deposit;
    }

    constructor() Ownable(msg.sender) {}

    mapping(address => Subscription) public subscriptions;
    uint256 public subscriptionDuration = 30 days; // Subscription duration in seconds

    event SubscriptionActivated(
        address indexed user,
        uint256 startDate,
        uint256 endDate
    );
    event SubscriptionDeactivated(address indexed user, uint256 refundAmount);

    function activateSubscription() external payable {
        require(
            !subscriptions[msg.sender].isActive,
            "User already has an active subscription."
        );
        require(msg.value >= 0.01 ether, "Payment must be at least 0.01 ETH.");

        uint256 startDate = block.timestamp;
        uint256 endDate = startDate + subscriptionDuration;

        subscriptions[msg.sender] = Subscription(
            startDate,
            endDate,
            true,
            msg.value
        );

        emit SubscriptionActivated(msg.sender, startDate, endDate);
    }

    function deactivateSubscription() external {
        require(
            subscriptions[msg.sender].isActive,
            "No active subscription to deactivate."
        );

        require(
            block.timestamp < subscriptions[msg.sender].startDate + 7 days,
            "More than seven days have passed since subscription activation."
        );

        uint256 refundAmount = subscriptions[msg.sender].deposit / 2; // Integer division to get 50%
        require(
            address(this).balance >= refundAmount,
            "Insufficient contract balance for refund."
        );

        // Transfer the refund amount back to the user
        payable(msg.sender).transfer(refundAmount);

        // Set the subscription as inactive
        subscriptions[msg.sender].isActive = false;

        // Emit an event for the deactivation
        emit SubscriptionDeactivated(msg.sender, refundAmount);
    }

    function isSubscribed(address user) external view returns (bool) {
        return subscriptions[user].isActive;
    }

    function getSubscriptionEndDate(address user)
        external
        view
        returns (uint256)
    {
        require(subscriptions[user].isActive, "No active subscription.");

        return subscriptions[user].endDate;
    }

    function withdraw() external onlyOwner {
        // Transfer all contract balance to the owner
        payable(owner()).transfer(address(this).balance);
    }
}

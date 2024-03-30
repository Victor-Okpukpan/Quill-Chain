const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("SubscriptionServiceModule", (m) => {
  const SubscriptionServiceContract = m.contract("SubscriptionService");

  return { SubscriptionServiceContract };
});

// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./Components/Style/loader.css"
import "./index.css"

import { Bounce, ToastContainer } from "react-toastify";

// Dashboard & User Management
import Dashboard from './Components/Dashboard/Dashboard';
import Users from './Components/UserManagement/Users';
import Department from './Components/UserManagement/Department';
import Role from './Components/UserManagement/Role';
import Module from './Components/UserManagement/Module';
import Task from './Components/Task/Task';

// Accounts & Assets
import Vault from './Components/Accounts/Vault';
import Exchanges from './Components/Accounts/Exchanges';
import Fiat from './Components/Accounts/Fiat';
import Asset from './Components/Assets/Asset';
import NFT from './Components/NFT/NFT.JSX';
import Staking from './Components/Staking/Staking';
import Swap from './Components/Swap/Swap';
import TransactionHistory from './Components/TransactionHistory/TransactionHistory';
import WhitelistAddress from './Components/WhitelistAddress/WhitelistAddress';

// AML & KYC
import Kyc from './Components/Aml/Kyc';
import Compliance from './Components/Aml/Compliance';
import P2P from './Components/Peer/P2P';
import P2C from './Components/Peer/P2C';
import Portfolio from './Components/Portfolio/Portfolio';
import CustomerDetails from './Components/Customers/CustomerDetails';
import CustomerKyc from './Components/Customers/CustomerKyc';
import CustomerCompliance from './Components/Customers/CustomerCompliance';
import CustomerRisk from './Components/Customers/CustomerRisk';
import Onhold from './Components/Compliance/KYC/Onhold';
import HighRisk from './Components/Compliance/KYC/HighRisk';
import MiddleRisk from './Components/Compliance/KYC/MiddleRisk';
import LowRisk from './Components/Compliance/KYC/LowRisk';
import Notification from './Components/Compliance/KYC/Notification';
import Parameter from './Components/Compliance/KYC/Parameter';
import BusinessType from './Components/Compliance/AML/BusinessType';
import AMLOnhold from './Components/Compliance/AML/AMLOnhold';
import AmlHighRisk from './Components/Compliance/AML/AmlHighRisk';
import AmlMiddleRisk from './Components/Compliance/AML/AmlMiddleRisk';
import AmlLowRisk from './Components/Compliance/AML/AmlLowRisk';
import AmlParameter from './Components/Compliance/AML/AmlParameter';

// Logs
import Internal from './Components/Logs/Internal';
import External from './Components/Logs/External';
import Mobile from './Components/Logs/Mobile';
import Web from './Components/Logs/Web';

// Risk & Reports
import ContainUpdate from './Components/Compliance/Risk/ContainUpdate';
import RiskParameter from './Components/Compliance/Risk/RiskParameter';
import Transactions from './Components/Report/Transactions';
import TopGainerLoser from './Components/Report/TopGainerLoser';
import MarketCapitalizations from './Components/Report/MarketCapitalizations';
import CryptoSummary from './Components/Report/CryptoSummary';
import CurrencyExchange from './Components/CurrencyExchange/CurrencyExchange';

// Investment & Stake
import InvestmentPlan from './Components/ManageInvestment/InvestmentPlan';
import InvestmentHistory from './Components/ManageInvestment/InvestmentHistory';
import ReturnHistory from './Components/ManageInvestment/ReturnHistory';
import InvestmentPlanSetting from './Components/ManageInvestment/InvestmentPlanSetting';
import InvestTemplate from './Components/ManageInvestment/InvestTemplate';
import StakePlan from './Components/ManageStake/StakePlan';
import StakeHistory from './Components/ManageStake/StakeHistory';

// Pool Management
import PoolSetup from './Components/ManagePool/PoolSetup';
import ManualPayout from './Components/ManagePool/ManualPayout';
import History from './Components/ManagePool/History';

// Payments & Marketing
import DepositMethod from './Components/Payment/DepositMethod';
import WithdrawMethod from './Components/Payment/WithdrawMethod';
import PendingDeposit from './Components/Payment/PendingDeposit';
import PendingWithdraw from './Components/Payment/PendingWithdraw';
import DepositHistory from './Components/Payment/DepositHistory';
import WithdrawHistory from './Components/Payment/WithdrawHistory';
import WalletSetting from './Components/Payment/WalletSetting';
import PaymentGateway from './Components/Payment/PaymentGateway';
import CallLog from './Components/RM/CallLog';
import RmUsers from './Components/RM/RmUsers';
import RmCustomers from './Components/RM/RmCustomers';
import PrivateRoute from "./Auth/PrivateRoute";
import Layout from "./Auth/Layout";
import Login from "./Auth/Login"

import Budget from "./Components/MarketingSetting/Budget"
import Remarketing from "./Components/MarketingSetting/Remarketing"
import OnboardCustomer from "./Components/MarketingSetting/OnboardCustomer"
import BlogPost from "./Components/MarketingSetting/BlogPost"
import Referral from "./Components/MarketingSetting/Referral"
import BonusSetting from "./Components/MarketingSetting/BonusSetting"
import MarketingUser from "./Components/MarketingSetting/User"

import SalesTarget from "./Components/TarketSetting.jsx/SalesTarket"
import CallsTarget from "./Components/TarketSetting.jsx/CallsTarget"
import OnboardTarget from "./Components/TarketSetting.jsx/OnboardTarge"
import ReachoutTarget from "./Components/TarketSetting.jsx/ReachOutTarget"
import BudgetTarget from "./Components/TarketSetting.jsx/Budget"
import OnboardTarge from "./Components/TarketSetting.jsx/OnboardTarge";
import CreatePin from "./Auth/CreatePin";
import ForgetPin from "./Auth/ForgetPin";
import Payroll from "./Components/ConnectedBanking/Payroll";
import PayrollCreate from "./Components/ConnectedBanking/PayrollCreate";
import VendorManagement from "./Components/ConnectedBanking/VendorManagement";
import Addvendor from "./Components/ConnectedBanking/Addvendor";

function App() {
  return (
    <>
      <Routes>
        {/* Public Route */}
        <Route path="/sign-in" element={<Login />} />
        <Route path="/forget-pin" element={<ForgetPin />} />
        <Route path="/create-mpin/:url" element={<CreatePin />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/usermanagement/user" element={<Users />} />
            <Route path="/usermanagement/department" element={<Department />} />
            <Route path="/usermanagement/role" element={<Role />} />
            <Route path="/usermanagement/module" element={<Module />} />
            <Route path="/task" element={<Task />} />
            <Route path="/accounts/vault" element={<Vault />} />
            <Route path="/accounts/exchanges" element={<Exchanges />} />
            <Route path="/accounts/fiat" element={<Fiat />} />
            <Route path="/assets" element={<Asset />} />
            <Route path="/nft" element={<NFT />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/whitelisted-addresses" element={<WhitelistAddress />} />
            <Route path="/aml/kyc" element={<Kyc />} />
            <Route path="/aml/compliance" element={<Compliance />} />
            <Route path="/p2p" element={<P2P />} />
            <Route path="/p2c" element={<P2C />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/customers/details" element={<CustomerDetails />} />
            <Route path="/customers/kyc" element={<CustomerKyc />} />
            <Route path="/customers/compliance" element={<CustomerCompliance />} />
            <Route path="/customers/risk" element={<CustomerRisk />} />
            <Route path="/kyc/onhold" element={<Onhold />} />
            <Route path="/kyc/high-risk" element={<HighRisk />} />
            <Route path="/kyc/middle-risk" element={<MiddleRisk />} />
            <Route path="/kyc/low-risk" element={<LowRisk />} />
            <Route path="/kyc/notification" element={<Notification />} />
            <Route path="/kyc/parameters" element={<Parameter />} />
            <Route path="/aml/business-type" element={<BusinessType />} />
            <Route path="/aml/onhold" element={<AMLOnhold />} />
            <Route path="/aml/high-risk" element={<AmlHighRisk />} />
            <Route path="/aml/middle-risk" element={<AmlMiddleRisk />} />
            <Route path="/aml/low-risk" element={<AmlLowRisk />} />
            <Route path="/aml/parameters" element={<AmlParameter />} />
            <Route path="/internal-logs" element={<Internal />} />
            <Route path="/external-logs" element={<External />} />
            <Route path="/mobile-logs" element={<Mobile />} />
            <Route path="/web-logs" element={<Web />} />
            <Route path="/risk-management/contain-update" element={<ContainUpdate />} />
            <Route path="/risk-management/parameter" element={<RiskParameter />} />
            <Route path="/risk-management/notification" element={<Notification />} />
            <Route path="/report/transaction" element={<Transactions />} />
            <Route path="/report/top-gainers-losers" element={<TopGainerLoser />} />
            <Route path="/report/capitalizations" element={<MarketCapitalizations />} />
            <Route path="/report/crypto-summary" element={<CryptoSummary />} />
            <Route path="/currency-exchange" element={<CurrencyExchange />} />
            <Route path="/manage-investment/investment-plan" element={<InvestmentPlan />} />
            <Route path="/manage-investment/investment-history" element={<InvestmentHistory />} />
            <Route path="/manage-investment/return-history" element={<ReturnHistory />} />
            <Route path="/manage-investment/investment-plan-settings" element={<InvestmentPlanSetting />} />
            <Route path="/manage-investment/invest-template" element={<InvestTemplate />} />
            <Route path="/manage-stake/stake-plan" element={<StakePlan />} />
            <Route path="/manage-stake/stake-history" element={<StakeHistory />} />
            <Route path="/manage-pool/pool-setup" element={<PoolSetup />} />
            <Route path="/manage-pool/manual-payout" element={<ManualPayout />} />
            <Route path="/manage-pool/history" element={<History />} />
            <Route path="/payments/wallet-setting" element={<WalletSetting />} />
            <Route path="/payments/deposit-method" element={<DepositMethod />} />
            <Route path="/payments/withdraw-method" element={<WithdrawMethod />} />
            <Route path="/payments/pending-deposit" element={<PendingDeposit />} />
            <Route path="/payments/pending-withdraw" element={<PendingWithdraw />} />
            <Route path="/payments/deposit-history" element={<DepositHistory />} />
            <Route path="/payments/withdraw-history" element={<WithdrawHistory />} />
            <Route path="/payments/payment-gateway" element={<PaymentGateway />} />
            <Route path="/rm/call-log" element={<CallLog />} />
            <Route path="/rm/user" element={<RmUsers />} />
            <Route path="/rm/customers" element={<RmCustomers />} />
            <Route path="/marketing-setting/notifications" element={<Notification />} />
            <Route path="/marketing-setting/task-creations" element={<Task />} />
            <Route path="/marketing-setting/budget" element={<Budget />} />
            <Route path="/marketing-setting/onboarded-customer" element={<OnboardCustomer />} />
            <Route path="/marketing-setting/blog-post" element={<BlogPost />} />
            <Route path="/marketing-setting/referral" element={<Referral />} />
            <Route path="/marketing-setting/bonus-setting" element={<BonusSetting />} />
            <Route path="/marketing-setting/users" element={<MarketingUser />} />
            <Route path="/marketing-setting/remarketing" element={<Remarketing />} />

            <Route path="/target-setting/sales-target" element={<SalesTarget />} />
            <Route path="/target-setting/calls-target" element={<CallsTarget />} />
            <Route path="/target-setting/budget" element={<BudgetTarget />} />
            <Route path="/target-setting/onboard-target" element={<OnboardTarge />} />
            <Route path="/target-setting/reach-out-target" element={<ReachoutTarget />} />
            <Route path="/payroll-services" element={<Payroll />} />
            <Route path="/payroll-services/create" element={<PayrollCreate />} />
            <Route path="/vendor-management" element={<VendorManagement />} />
            <Route path="/add-vendor" element={<Addvendor />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnHover
        theme="colored" 
        transition={Bounce}
      />

      </>
  );
}

export default App;
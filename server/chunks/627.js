"use strict";
exports.id = 627;
exports.ids = [627];
exports.modules = {

/***/ 142:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Button = ({ isDisabled , isFullWidth , isLoading =false , size ='md' , color ='blue' , children , className , style , onClick  })=>{
    const buttonBaseStyle = 'inline-block text-center relative whitespace-nowrap font-medium hover:bg-opacity-80 shadow-md';
    const buttonTransition = 'transition duration-150 ease-in-out';
    const buttonDisabledStyle = isDisabled ? 'cursor-not-allowed opacity-60 hover:bg-opacity-100' : '';
    const buttonWideStyle = isFullWidth ? 'w-full block' : '';
    const getColorStyle = ()=>{
        switch(color){
            case 'blue':
                return 'bg-blueButton text-white';
            case 'red':
                return 'bg-redButton text-white';
            case 'green':
                return 'bg-greenButton text-white';
            case 'gray':
                return 'bg-borderGray text-white';
            case 'blue-gray':
                return 'bg-blueGray text-white';
            default:
                return '';
        }
    };
    const getSizeStyle = ()=>{
        switch(size){
            case 'lg':
                return 'py-3 text-base rounded-xl';
            case 'md':
                return 'py-2 text-sm rounded-lg';
            case 'sm':
                return 'py-1 text-xs rounded-md';
            default:
                return '';
        }
    };
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
        style: style,
        disabled: isDisabled,
        className: `${buttonBaseStyle} ${buttonTransition} ${getColorStyle()} ${getSizeStyle()} ${buttonDisabledStyle} ${buttonWideStyle} ${className}`,
        onClick: onClick,
        children: isLoading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "flex items-center justify-center",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                className: "animate-spin",
                width: "24",
                height: "24",
                viewBox: "0 0 120 120",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        opacity: "0.1",
                        d: "M120 60C120 93.1371 93.1371 120 60 120C26.8629 120 0 93.1371 0 60C0 26.8629 26.8629 0 60 0C93.1371 0 120 26.8629 120 60ZM18 60C18 83.196 36.804 102 60 102C83.196 102 102 83.196 102 60C102 36.804 83.196 18 60 18C36.804 18 18 36.804 18 60Z",
                        fill: "white"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        d: "M120 60C120 52.1207 118.448 44.3185 115.433 37.039C112.417 29.7595 107.998 23.1451 102.426 17.5736C96.8549 12.0021 90.2405 7.58251 82.961 4.56723C75.6815 1.55195 67.8793 -3.44416e-07 60 0L60 18C65.5155 18 70.977 19.0864 76.0727 21.1971C81.1684 23.3078 85.7984 26.4015 89.6985 30.3015C93.5985 34.2016 96.6922 38.8316 98.8029 43.9273C100.914 49.023 102 54.4845 102 60H120Z",
                        fill: "white"
                    })
                ]
            })
        }) : children
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ }),

/***/ 827:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "q": () => (/* binding */ LogoBounce),
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Loader = ({ isLoading  })=>{
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `transition-opacity duration-150 fixed inset-0 z-50 bg-gray-900 flex items-center justify-center ${isLoading ? `opacity-100` : `opacity-0 z-[-1]`}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(LogoBounce, {
        })
    }));
};
const LogoBounce = ({ className ='' , width =80  })=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `animate-bounce ${className}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
            width: width,
            viewBox: "0 0 600 713",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                fillRule: "evenodd",
                clipRule: "evenodd",
                d: "M95.2381 712.881L0 0L402.381 71.2881C419.486 75.7807 435.323 79.3925 449.906 82.7181C504.744 95.224 541.843 103.684 561.905 139.725C587.302 185.032 600 240.795 600 307.014C600 373.55 587.302 429.471 561.905 474.779C536.508 520.087 483.333 542.74 402.381 542.74H228.095L261.429 712.881H95.2381ZM147.619 147.329L364.777 185.407C374.008 187.807 382.555 189.736 390.426 191.513C420.02 198.193 440.042 202.712 450.869 221.963C464.575 246.164 471.428 275.95 471.428 311.321C471.428 346.861 464.575 376.731 450.869 400.932C437.163 425.133 408.466 437.234 364.777 437.234H265.578L205.798 432.481L147.619 147.329Z",
                fill: "white"
            })
        })
    })
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ }),

/***/ 778:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const Modal = ({ isShow =true , onClose =()=>null
 , closeOnBgClick =true , closeOnEscape =true , children , backgroundColor =`rgba(0,0,0,0.5)` , style ={
} , className  })=>{
    const modalRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const onKeydown = (e)=>{
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (closeOnEscape) {
            document.addEventListener('keydown', onKeydown);
        }
        return ()=>{
            document.removeEventListener('keydown', onKeydown);
        };
    }, [
        onClose,
        closeOnEscape
    ]);
    const bgClick = (e)=>{
        if (e.target === modalRef.current && closeOnBgClick) {
            onClose();
        }
    };
    if (!isShow) return null;
    return(/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        ref: modalRef,
        onClick: (e)=>bgClick(e)
        ,
        className: `fixed inset-0 z-50 flex items-center p-4 ${className}`,
        style: {
            backgroundColor: backgroundColor,
            ...style
        },
        children: children
    }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Modal);


/***/ }),

/***/ 591:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "e": () => (/* binding */ GAS_FEE)
/* harmony export */ });
const GAS_FEE = {
    30: '30000000000000',
    100: '100000000000000',
    150: '150000000000000',
    300: '300000000000000'
};


/***/ }),

/***/ 627:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "M4": () => (/* binding */ NearProvider),
  "xp": () => (/* binding */ useNearProvider)
});

// UNUSED EXPORTS: NearContext

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./components/Common/Loader.tsx
var Loader = __webpack_require__(827);
// EXTERNAL MODULE: ./components/Common/Button.tsx
var Button = __webpack_require__(142);
// EXTERNAL MODULE: ./components/Common/Modal.tsx
var Modal = __webpack_require__(778);
// EXTERNAL MODULE: ./services/near.ts + 1 modules
var near = __webpack_require__(574);
;// CONCATENATED MODULE: ./components/Modal/LoginModal.tsx




const LoginModal = ({ show , onClose  })=>{
    return(/*#__PURE__*/ jsx_runtime_.jsx(Modal/* default */.Z, {
        isShow: show,
        onClose: onClose,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "bg-parasGrey text-white shadow-xl w-full p-4 rounded-md mx-4 md:m-auto max-w-xs text-center",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "font-bold text-xl mb-3",
                    children: "Please Login First"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("p", {
                    className: "opacity-90",
                    children: "You will be redirected to NEAR Wallet"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "flex justify-between items-center mt-4",
                    children: /*#__PURE__*/ jsx_runtime_.jsx(Button/* default */.Z, {
                        isFullWidth: true,
                        onClick: ()=>near/* default.signIn */.ZP.signIn()
                        ,
                        children: "Login"
                    })
                })
            ]
        })
    }));
};
/* harmony default export */ const Modal_LoginModal = (LoginModal);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: ./hooks/useNearProvider.tsx





const defaultValue = {
    isInit: false,
    accountId: null,
    commonModal: null,
    setCommonModal: ()=>null
};
const NearContext = /*#__PURE__*/ external_react_default().createContext(defaultValue);
const useNearProvider = ()=>external_react_default().useContext(NearContext)
;
const NearProvider = (props)=>{
    const { 0: isInit , 1: setIsInit  } = (0,external_react_.useState)(false);
    const { 0: accountId , 1: setAccountId  } = (0,external_react_.useState)(null);
    const { 0: commonModal , 1: setCommonModal  } = (0,external_react_.useState)(null);
    (0,external_react_.useEffect)(()=>{
        near/* default.init */.ZP.init(()=>{
            setIsInit(true);
            setAccountId(near/* default.wallet.getAccountId */.ZP.wallet.getAccountId());
        });
    }, []);
    const value = {
        isInit,
        accountId,
        commonModal,
        setCommonModal
    };
    return(/*#__PURE__*/ (0,jsx_runtime_.jsxs)(NearContext.Provider, {
        value: value,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Loader/* default */.Z, {
                isLoading: !isInit
            }),
            props.children,
            /*#__PURE__*/ jsx_runtime_.jsx(Modal_LoginModal, {
                show: commonModal === 'login',
                onClose: ()=>setCommonModal(null)
            })
        ]
    }));
};


/***/ }),

/***/ 574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "l$": () => (/* binding */ CONTRACT),
  "ZP": () => (/* binding */ near),
  "Bg": () => (/* binding */ getAmount)
});

// EXTERNAL MODULE: external "near-api-js"
var external_near_api_js_ = __webpack_require__(606);
;// CONCATENATED MODULE: ./services/config.ts
const CONTRACT_NAME = "dev-1646410374412-26548641943683";
function getConfig(env) {
    switch(env){
        case 'production':
        case 'mainnet':
            return {
                networkId: 'mainnet',
                nodeUrl: 'https://rpc.mainnet.near.org',
                contractName: CONTRACT_NAME,
                walletUrl: 'https://wallet.near.org',
                helperUrl: 'https://helper.mainnet.near.org',
                explorerUrl: 'https://explorer.mainnet.near.org'
            };
        case 'development':
        case 'testnet':
            return {
                networkId: 'testnet',
                nodeUrl: 'https://rpc.testnet.near.org',
                contractName: CONTRACT_NAME,
                walletUrl: 'https://wallet.testnet.near.org',
                helperUrl: 'https://helper.testnet.near.org',
                explorerUrl: 'https://explorer.testnet.near.org'
            };
        case 'betanet':
            return {
                networkId: 'betanet',
                nodeUrl: 'https://rpc.betanet.near.org',
                contractName: CONTRACT_NAME,
                walletUrl: 'https://wallet.betanet.near.org',
                helperUrl: 'https://helper.betanet.near.org',
                explorerUrl: 'https://explorer.betanet.near.org'
            };
        case 'local':
            return {
                networkId: 'local',
                nodeUrl: 'http://localhost:3030',
                keyPath: `${process.env.HOME}/.near/validator_key.json`,
                walletUrl: 'http://localhost:4000/wallet',
                contractName: CONTRACT_NAME
            };
        case 'test':
        case 'ci':
            return {
                networkId: 'shared-test',
                nodeUrl: 'https://rpc.ci-testnet.near.org',
                contractName: CONTRACT_NAME,
                masterAccount: 'test.near'
            };
        case 'ci-betanet':
            return {
                networkId: 'shared-test-staging',
                nodeUrl: 'https://rpc.ci-betanet.near.org',
                contractName: CONTRACT_NAME,
                masterAccount: 'test.near'
            };
        default:
            throw Error(`Unconfigured environment '${env}'. Can be configured in src/config.js.`);
    }
};

// EXTERNAL MODULE: external "bn.js"
var external_bn_js_ = __webpack_require__(961);
var external_bn_js_default = /*#__PURE__*/__webpack_require__.n(external_bn_js_);
// EXTERNAL MODULE: ./constants/gasFee.ts
var gasFee = __webpack_require__(591);
// EXTERNAL MODULE: external "near-api-js/lib/transaction"
var transaction_ = __webpack_require__(651);
// EXTERNAL MODULE: external "near-api-js/lib/utils"
var utils_ = __webpack_require__(113);
// EXTERNAL MODULE: external "near-api-js/lib/utils/serialize"
var serialize_ = __webpack_require__(141);
;// CONCATENATED MODULE: ./services/near.ts







const CONTRACT = {
    TOKEN: "reffinance.testnet" || 0,
    FARM: "dev-1646410374412-26548641943683" || 0,
    WRAP: "dev-1645116177682-99668132804632" || 0
};
const getAmount = (amount)=>amount ? new (external_bn_js_default())(amount) : new (external_bn_js_default())('0')
;
class NearClass {
    init(callback) {
        const config = getConfig("development" || 0);
        const near = new external_near_api_js_.Near({
            keyStore: new external_near_api_js_.keyStores.BrowserLocalStorageKeyStore(),
            ...config
        });
        const wallet = new external_near_api_js_.WalletConnection(near, 'stake-nft-farm');
        this.near = near;
        this.wallet = wallet;
        callback && callback();
    }
    signIn() {
        this.wallet.requestSignIn(CONTRACT.FARM, 'Kaizo NFT Staking');
    }
    signOut() {
        this.wallet.signOut();
        window.location.replace(window.location.origin + window.location.pathname);
    }
    nearFunctionCall({ methodName , args ={
    } , gas =gasFee/* GAS_FEE.100 */.e[100] , amount , contractName  }) {
        return this.wallet.account().functionCall({
            contractId: contractName,
            methodName,
            attachedDeposit: getAmount(amount),
            gas: getAmount(gas),
            args
        });
    }
    nearViewFunction({ methodName: methodName1 , args: args1 , contractName: contractName1  }) {
        return this.wallet.account().viewFunction(contractName1, methodName1, args1);
    }
    async createTransaction({ receiverId , actions , nonceOffset =1  }) {
        const localKey = await this.near.connection.signer.getPublicKey(this.wallet.account().accountId, this.near.connection.networkId);
        const accessKey = await this.wallet.account().accessKeyForTransaction(receiverId, actions, localKey);
        if (!accessKey) {
            throw new Error(`Cannot find matching key for transaction sent to ${receiverId}`);
        }
        const block = await this.near.connection.provider.block({
            finality: 'final'
        });
        const blockHash = (0,serialize_.base_decode)(block.header.hash);
        const publicKey = utils_.PublicKey.from(accessKey.public_key);
        const nonce = accessKey.access_key.nonce + nonceOffset;
        return (0,transaction_.createTransaction)(this.wallet.account().accountId, publicKey, receiverId, nonce, actions, blockHash);
    }
    async executeMultipleTransactions(transactions, callbackUrl) {
        const nearTransactions = await Promise.all(transactions.map((t, i)=>{
            return this.createTransaction({
                receiverId: t.receiverId,
                nonceOffset: i + 1,
                actions: t.functionCalls.map((fc)=>(0,transaction_.functionCall)(fc.methodName, fc.args, fc.gas, fc.attachedDeposit)
                )
            });
        }));
        return this.wallet.requestSignTransactions(nearTransactions, callbackUrl);
    }
}
/* harmony default export */ const near = (new NearClass());


/***/ })

};
;
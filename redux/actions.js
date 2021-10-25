// General
export const SHOW_ALERT = "SHOW_ALERT";
export const HIDE_ALERT = "HIDE_ALERT";
export const SHOW_CANVAS = "SHOW_CANVAS";
export const HIDE_CANVAS = "HIDE_CANVAS";
export const SHOW_MENU = "SHOW_MENU";
export const HIDE_MENU = "HIDE_MENU";
export const SET_BLOCK_ALERT_DATA = "SET_BLOCK_ALERT_DATA";


// User
export const SAVE_USER = "SAVE_USER";
export const SAVE_TEMP_USER = "SAVE_TEMP_USER";
export const SET_PAGE_STATE = "SET_PAGE_STATE";
export const SET_OFFERS_INFO = "SET_OFFERS_INFO";
export const SET_BUY_OFFERS_INFO = "SET_BUY_OFFERS_INFO";
export const SET_SALE_OFFERS_INFO = "SET_SALE_OFFERS_INFO";
export const SET_ADMIN_BUY_OFFERS_INFO = "SET_ADMIN_BUY_OFFERS_INFO";
export const SET_MODAL_BUY_OFFERS_INFO = "SET_MODAL_BUY_OFFERS_INFO";
export const SET_BATCHES_INFO = "SET_BATCHES_INFO";
export const SET_BATCH_DETAIL_INFO = "SET_BATCH_DETAIL_INFO";
export const SET_BATCH_SELL_OFFERS_INFO = "SET_BATCH_SELL_OFFERS_INFO";
export const SET_BATCH_BUY_OFFERS_INFO = "SET_BATCH_BUY_OFFERS_INFO";

export const SET_OFFERS_REFRESH = "SET_OFFERS_REFRESH";
export const SET_BUY_OFFERS_REFRESH = "SET_BUY_OFFERS_REFRESH";
export const SET_SALE_OFFERS_REFRESH = "SET_SALE_OFFERS_REFRESH";
export const SET_ADMIN_BUY_OFFERS_REFRESH = "SET_ADMIN_BUY_OFFERS_REFRESH";
export const SET_MODAL_BUY_OFFERS_REFRESH = "SET_MODAL_BUY_OFFERS_REFRESH";
export const SET_BATCHES_REFRESH = "SET_BATCHES_REFRESH";
export const SET_BATCH_DETAIL_REFRESH = "SET_BATCH_DETAIL_REFRESH";

export const SET_CHECKED_OFFERS = "SET_CHECKED_OFFERS";
export const SET_BUY_CHECKED_OFFERS = "SET_BUY_CHECKED_OFFERS";


// Modal
export const SET_ACTIVE_MODAL = "SET_ACTIVE_MODAL";
export const REMOVE_ACTIVE_MODAL = "REMOVE_ACTIVE_MODAL";

// Save User
export const saveUser = (message) => ({
  type: SAVE_USER,
  payload: {
    authUser: message,
  },
});

// Show Menu
export const showMenu = () => ({
  type: SHOW_MENU,
  payload: {},
});

// Hide Menu
export const hideMenu = () => ({
  type: HIDE_MENU,
  payload: {},
});

// Set Block Alert Data
export const setBlockAlertData = (message) => ({
  type: SET_BLOCK_ALERT_DATA,
  payload: {
    blockAlertData: message,
  },
});

// Show Alert
export const showAlert = (message, type = "warning") => ({
  type: SHOW_ALERT,
  payload: {
    showAlertMessage: message,
    showAlertType: type,
  },
});

// Hide Alert
export const hideAlert = () => ({
  type: HIDE_ALERT,
  payload: {},
});

// Show Canvas
export const showCanvas = () => ({
  type: SHOW_CANVAS,
  payload: {},
});

// Hide Canvas
export const hideCanvas = () => ({
  type: HIDE_CANVAS,
  payload: {},
});

// Set Active Modal
export const setActiveModal = (activeModal, completion = null, modalParams = null) => ({
  type: SET_ACTIVE_MODAL,
  payload: {
    activeModal,
    completion,
    modalParams,
  },
});

// Remove Active Modal
export const removeActiveModal = () => ({
  type: REMOVE_ACTIVE_MODAL,
  payload: {},
});

export const setPageState = (payload) => ({
  type: SET_PAGE_STATE,
  payload,
});

export const setOffersInfo = (payload) => ({
  type: SET_OFFERS_INFO,
  payload,
});

export const setBuyOffersInfo = (payload) => ({
  type: SET_BUY_OFFERS_INFO,
  payload,
});

export const setSaleOffersInfo = (payload) => ({
  type: SET_SALE_OFFERS_INFO,
  payload,
});

export const setAdminBuyOffersInfo = (payload) => ({
  type: SET_ADMIN_BUY_OFFERS_INFO,
  payload,
});

export const setModalBuyOffersInfo = (payload) => ({
  type: SET_MODAL_BUY_OFFERS_INFO,
  payload,
});

export const setBatchesInfo = (payload) => ({
  type: SET_BATCHES_INFO,
  payload,
});

export const setBatchDetailInfo = (payload) => ({
  type: SET_BATCH_DETAIL_INFO,
  payload,
});

export const setBatchSellOffersInfo = (payload) => ({
  type: SET_BATCH_SELL_OFFERS_INFO,
  payload,
});

export const setBatchBuyOffersInfo = (payload) => ({
  type: SET_BATCH_BUY_OFFERS_INFO,
  payload,
});

export const setOffersRefresh = (refresh) => ({
  type: SET_OFFERS_REFRESH,
  refresh
});

export const setBuyOffersRefresh = (refresh) => ({
  type: SET_BUY_OFFERS_REFRESH,
  refresh
});


export const setSaleOffersRefresh = (refresh) => ({
  type: SET_SALE_OFFERS_REFRESH,
  refresh
});

export const setAdminBuyOffersRefresh = (refresh) => ({
  type: SET_ADMIN_BUY_OFFERS_REFRESH,
  refresh
});

export const setModalBuyOffersRefresh = (refresh) => ({
  type: SET_MODAL_BUY_OFFERS_REFRESH,
  refresh
});

export const setBatchesRefresh = (refresh) => ({
  type: SET_BATCHES_REFRESH,
  refresh
});

export const setBatchDetailRefresh = (refresh) => ({
  type: SET_BATCH_DETAIL_REFRESH,
  refresh
});

export const setCheckedOffers = (payload) => ({
  type: SET_CHECKED_OFFERS,
  payload
});

export const setBuyCheckedOffers = (payload) => ({
  type: SET_BUY_CHECKED_OFFERS,
  payload
});
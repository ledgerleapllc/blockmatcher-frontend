import {
  SHOW_ALERT,
  HIDE_ALERT,
  SHOW_CANVAS,
  HIDE_CANVAS,
  SET_ACTIVE_MODAL,
  REMOVE_ACTIVE_MODAL,
  SAVE_USER,
  SHOW_MENU,
  HIDE_MENU,
  SET_BLOCK_ALERT_DATA,
  SET_PAGE_STATE,
  SET_OFFERS_REFRESH,
  SET_BUY_OFFERS_REFRESH,
  SET_SALE_OFFERS_REFRESH,
  SET_ADMIN_BUY_OFFERS_REFRESH,
  SET_MODAL_BUY_OFFERS_REFRESH,
  SET_BATCHES_REFRESH,
  SET_BATCH_DETAIL_REFRESH,
  SET_OFFERS_INFO,
  SET_BUY_OFFERS_INFO,
  SET_SALE_OFFERS_INFO,
  SET_ADMIN_BUY_OFFERS_INFO,
  SET_MODAL_BUY_OFFERS_INFO,
  SET_BATCHES_INFO,
  SET_BATCH_DETAIL_INFO,
  SET_BATCH_SELL_OFFERS_INFO,
  SET_BATCH_BUY_OFFERS_INFO,
  SET_CHECKED_OFFERS,
  SET_BUY_CHECKED_OFFERS
} from "../actions";

const initialState = {
  showAlert: false,
  showAlertMessage: "",
  showAlertType: "",
  showCanvas: false,
  activeModal: "",
  completion: null,
  modalParams: {},
  authUser: {},
  checkedOffers: [],
  buyCheckedOffers: [],
  pageInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "users.id",
    sort_direction: "desc",
    search: "",
    users: [],
    total: 0,
  },
  saleOffersInfo: {
    loading: false,
    filter: 0,
    hideLocked: false,
    page_id: 0,
    perPage: 10,
    sort_key: "offers.id",
    sort_direction: "desc",
    search: "",
    offer_list: [],
    total: 0,
  },
  saleOffersRefresh: false,
  adminBuyOffersInfo: {
    loading: false,
    filter: 0,
    page_id: 0,
    perPage: 10,
    sort_key: "buy_offers.id",
    sort_direction: "desc",
    search: "",
    offer_list: [],
    total: 0,
  },
  adminBuyOffersRefresh: false,
  modalBuyOffersInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "id",
    sort_direction: "desc",
    offer_list: [],
    total: 0,
  },
  modalBuyOffersRefresh: false,
  batchesInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "id",
    sort_direction: "desc",
    search: "",
    offer_list: [],
    total: 0,
  },
  batchesRefresh: false,
  batchDetailInfo: {
    batch: {},
  },
  batchSellOffersInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "id",
    sort_direction: "desc",
    offer_list: [],
    total: 0,
  },
  batchBuyOffersInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "id",
    sort_direction: "desc",
    offer_list: [],
    total: 0,
  },
  batchDetailRefresh: false,
  offersInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "id",
    sort_direction: "desc",
    search: "",
    offer_list: [],
    total: 0,
    total_cspr: "",
    total_revenue: ""
  },
  offersRefresh: false,
  buyOffersInfo: {
    loading: false,
    page_id: 0,
    perPage: 10,
    sort_key: "id",
    sort_direction: "desc",
    search: "",
    offer_list: [],
    total: 0,
    total_cspr: "",
    total_revenue: ""
  },
  buyOffersRefresh: false,
  blockAlertData: {},
  menuShown: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_PAGE_STATE: {
      return {
        ...state,
        pageInfo: { ...state.pageInfo, ...action.payload },
      };
    }
    case SHOW_MENU:
      return {
        ...state,
        menuShown: true,
      };
    case HIDE_MENU:
      return {
        ...state,
        menuShown: false,
      };
    case SET_BLOCK_ALERT_DATA: {
      const { blockAlertData } = action.payload;
      return {
        ...state,
        blockAlertData,
      };
    }
    case SAVE_USER: {
      const { authUser } = action.payload;
      return {
        ...state,
        authUser,
      };
    }
    case SHOW_ALERT: {
      const { showAlertMessage, showAlertType } = action.payload;
      return {
        ...state,
        showAlert: true,
        showAlertMessage,
        showAlertType,
      };
    }
    case HIDE_ALERT:
      return {
        ...state,
        showAlert: false,
        showAlertMessage: "",
        showAlertType: "",
      };
    case SHOW_CANVAS:
      return {
        ...state,
        showCanvas: true,
      };
    case HIDE_CANVAS:
      return {
        ...state,
        showCanvas: false,
      };
    case SET_ACTIVE_MODAL: {
      const { activeModal, completion, modalParams } = action.payload;
      return {
        ...state,
        activeModal,
        completion,
        modalParams
      };
    }
    case SET_OFFERS_REFRESH: {
      return {
        ...state,
        offersRefresh: action.refresh
      };
    }
    case SET_BUY_OFFERS_REFRESH: {
      return {
        ...state,
        buyOffersRefresh: action.refresh
      };
    }
    case SET_SALE_OFFERS_REFRESH: {
      return {
        ...state,
        saleOffersRefresh: action.refresh
      };
    }
    case SET_ADMIN_BUY_OFFERS_REFRESH: {
      return {
        ...state,
        adminBuyOffersRefresh: action.refresh
      };
    }
    case SET_MODAL_BUY_OFFERS_REFRESH: {
      return {
        ...state,
        modalBuyOffersRefresh: action.refresh
      };
    }
    case SET_BATCHES_REFRESH: {
      return {
        ...state,
        batchesRefresh: action.refresh
      };
    }
    case SET_BATCH_DETAIL_REFRESH: {
      return {
        ...state,
        batchDetailRefresh: action.refresh
      };
    }
    case SET_OFFERS_INFO: {
      return {
        ...state,
        offersInfo: action.payload
      };
    }
    case SET_BUY_OFFERS_INFO: {
      return {
        ...state,
        buyOffersInfo: action.payload
      };
    }
    case SET_SALE_OFFERS_INFO: {
      return {
        ...state,
        saleOffersInfo: action.payload
      };
    }
    case SET_ADMIN_BUY_OFFERS_INFO: {
      return {
        ...state,
        adminBuyOffersInfo: action.payload
      };
    }
    case SET_MODAL_BUY_OFFERS_INFO: {
      return {
        ...state,
        modalBuyOffersInfo: action.payload
      };
    }
    case SET_BATCHES_INFO: {
      return {
        ...state,
        batchesInfo: action.payload
      };
    }
    case SET_BATCH_DETAIL_INFO: {
      return {
        ...state,
        batchDetailInfo: action.payload
      };
    }
    case SET_BATCH_SELL_OFFERS_INFO: {
      return {
        ...state,
        batchSellOffersInfo: action.payload
      };
    }
    case SET_BATCH_BUY_OFFERS_INFO: {
      return {
        ...state,
        batchBuyOffersInfo: action.payload
      };
    }
    case SET_CHECKED_OFFERS: {
      return {
        ...state,
        checkedOffers: action.payload
      }
    }
    case SET_BUY_CHECKED_OFFERS: {
      return {
        ...state,
        buyCheckedOffers: action.payload
      }
    }
    case REMOVE_ACTIVE_MODAL:
      return {
        ...state,
        activeModal: "",
      };
    default:
      return state;
  }
}

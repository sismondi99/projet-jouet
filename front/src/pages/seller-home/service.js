import {authenticatedRequest} from "../../request";

export const getGoodsOfSeller = () => {
    return authenticatedRequest.get("/api/goods/seller/all");
}

export const getOrdersOfSeller = () => {
    return authenticatedRequest.get("/api/orders/seller");
}

export const sendGoods = (orderID) => {
    return authenticatedRequest.put(`/api/orders/send/${orderID}`)
}
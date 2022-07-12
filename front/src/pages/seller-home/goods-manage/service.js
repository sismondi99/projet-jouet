import {authenticatedFormRequest, authenticatedRequest} from "../../../request";

export const addGoods = (goods) => {
    return authenticatedFormRequest.post("/api/goods", goods);
}

export const removeGoods = (goodsID) => {
    return authenticatedRequest.delete(`/api/goods/${goodsID}`);
}
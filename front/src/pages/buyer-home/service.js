import {authenticatedRequest} from "../../request";

export const getGoods = (query = '') => {
    return authenticatedRequest.get('/api/goods');
}

export const searchGoods = (query = '') => {
    return authenticatedRequest.get(`/api/goods/query/${query}`);
}

export const getGoodsDetail = (id) => {
    return authenticatedRequest.get(`/api/goods/${id}`);
}

export const addGoodsToCart = (goodsID, quantity) => {
    return authenticatedRequest.post(`/api/cart`, {
        goodsID,
        quantity
    })
}

export const getCartGoods = () => {
    return authenticatedRequest.get('/api/cart')
}

export const removeGoodsFromCart = (ids) => {
    return authenticatedRequest.delete(`/api/cart`, {
        data: {ids}
    })
}

export const orderCart = (orders, userInfo) => {
    return authenticatedRequest.post(`/api/orders/carts`, {
        carts: orders,
        userInfo
    })
}

export const getOrders = () => {
    return authenticatedRequest.get(`/api/orders`);
}

export const addComment = (content, goodsID, score) => {
    return authenticatedRequest.post('/api/comments', {
        content,
        goodsID,
        score
    })
}
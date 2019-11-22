import { request, requestFeature } from './request'

export function getHomeMultidata() {
  return requestFeature({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
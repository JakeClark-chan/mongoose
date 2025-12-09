// 封装导出vnode节点 sel：节点名称，data：节点绑定的各种ID,class获取其他值，children：子节点，text：无子节点的文字或者数字，elm：dom
export default function (sel, data, children, text, elm) {
  let key = data.key
  return {
    sel,
    data,
    children,
    text,
    elm,
    key
  }
}

// 创建节点
export default function createElement(vnode) {
  // 利用节点名称先创建孤儿节点
  let domNode = document.createElement(vnode.sel)
  // 判断是否有子节点
  if (
    (vnode.text !== '' && vnode.children == undefined) ||
    vnode.children.length == 0
  ) {
    // 如果没有直接进行孤儿节点复制
    domNode.innerText = vnode.text
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) { // 判断是否有子节点
    // 有子节点进行递归创建节点
    for (let item of vnode.children) {
      let chDOM = createElement(item)
      domNode.appendChild(chDOM)
    }
  }
  vnode.elm = domNode
  return vnode.elm
}

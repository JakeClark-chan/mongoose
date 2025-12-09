import vnode from './vnode'
import createElemeng from './createElemeng'
import patchVnode from './patchVnode'
export default function (oldVnode, newVnode) {
  // 先判断旧节点有没有
  if (oldVnode.sel === '' || oldVnode.sel === undefined) {
    oldVnode = vnode(
      oldVnode.tagName.toLowerCase(),
      {},
      [],
      undefined,
      oldVnode
    )
    // console.log(oldVnode)
  }
  // 先判断新旧节点相同
  if (oldVnode.sel === newVnode.sel && oldVnode.key === newVnode.key) {
    console.log(oldVnode, newVnode)
    console.log(111)
    patchVnode(oldVnode, newVnode)
  } else {
    // 如果不是就进行从新创建上树
    let newVnodeElm = createElemeng(newVnode)
    console.log(11, oldVnode)
    // 如果旧节点有父节点并且创建成功一个新节点就在这个旧节点的前面进行上树
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 操作成功后进行删除旧节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}

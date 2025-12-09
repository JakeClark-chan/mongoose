import vnode from './vnode'
export default function (sel, data, c) {
  // 类型一 h('div',{},'文字')
  // 类型二 h('div',{},[])
  // 类型三 h('div',{},h())
  // 判断传过来的参数是不是3个，如果不是就抛出报错！
  if (arguments.length !== 3) throw new Error('错误！')
  // 判断如果c是字符串或者数字则就调用vnode生成一个节点
  if (typeof c === 'string' || typeof c === 'number') {
    return vnode(sel, data, undefined, c, undefined)
  } else if (Array.isArray(c)) { // 如果是一个数组就进行遍历把全部数据存进children数组里，这边利用了一个函数调用类似递归的方法，并没有调用递归但是通过方法调用和return返回实现递归
    let children = []
    for (let item of c) {
      // 如果数组的子项不是对象直接抛出报错，因为h函数的返回就是对象
      if (typeof item !== 'object') throw new Error('数组里返回的不是一个对象!')
      children.push(item)
    }
    return vnode(sel, data, children, undefined, undefined)
  } else if (typeof c === 'object' && c.hasOwnProperty('sel')) {// 如果的对象直接返回数组
    return vnode(sel, data, [c], undefined, undefined)
  }
}

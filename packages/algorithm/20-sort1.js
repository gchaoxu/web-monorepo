/**
 * !!! 冒泡排序 - 时间复杂度
 * 最好时间复杂度：O(n)
 * 最坏时间复杂度：O(n^2)
 * */
let arr = [5, 3, 2, 4, 1];
function bubbleSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 外层循环用于控制从头到尾的比较 + 交换到底有多少轮
  for (let i = 0; i < len; i++) {
    // 内层循环用于完成每一轮遍历过程中的重复比较 + 交换
    // !!! 这里对内层循环的范围作了限制， - i 是因为每遍历一次最大的数会排在数组的尾部，也就不需要再遍历一遍了
    for (let j = 0; j < len - 1 - i; j++) {
      // 若相邻元素前面的数比后面的大
      if (arr[j] > arr[j + 1]) {
        // 交换两者
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // 返回数组
  console.log(arr);
  return arr;
}
bubbleSort(arr);

// 这里优化之后最好的情况复杂度为 O(n)
function betterBubbleSort(arr) {
  const len = arr.length;

  for (let i = 0; i < len; i++) {
    // 区别在这里，我们加了一个标志位
    let flag = false;
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        // 只要发生了一次交换，就修改标志位
        flag = true;
      }
    }

    // 若一次交换也没发生，则说明数组有序，直接放过
    if (flag == false) return arr;
  }
  return arr;
}
betterBubbleSort(arr);

// !!! 选择排序 - 时间复杂度，最好情况也好，最坏情况也罢，两者之间的区别仅仅在于元素交换的次数不同，但都是要走内层循环作比较的。因此选择排序的三个时间复杂度都对应两层循环消耗的时间量级： O(n^2)。
/**
 * 选择排序的关键字是“最小值”：循环遍历数组，每次都找出当前范围内的最小值，把它放在当前范围的头部；
 * 然后缩小排序范围，继续重复以上操作，直至数组完全有序为止。
 */

function selectSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // 定义 minIndex，缓存当前区间最小值的索引，注意是索引
  let minIndex;
  // i 是当前排序区间的起点
  for (let i = 0; i < len - 1; i++) {
    // 初始化 minIndex 为当前区间第一个元素
    minIndex = i;
    // i、j分别定义当前区间的上下界，i是左边界，j是右边界
    for (let j = i; j < len; j++) {
      // 若 j 处的数据项比当前最小值还要小，则更新最小值索引为 j
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    // 如果 minIndex 对应元素不是目前的头部元素，则交换两者
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
selectSort(arr);

/**
 * !!!插入排序 - 复杂度：
 * 最好时间复杂度：它对应的数组本身就有序这种情况。此时内层循环只走一次，整体复杂度取决于外层循环，时间复杂度就是一层循环对应的 O(n)。
 * 最坏时间复杂度：它对应的是数组完全逆序这种情况。此时内层循环每次都要移动有序序列里的所有元素，因此时间复杂度对应的就是两层循环的 O(n^2)
 * 平均时间复杂度：O(n^2)
 * */
/**
 * 插入排序的核心思想是“找到元素在它前面那个序列中的正确位置”。
 * 具体来说，插入排序所有的操作都基于一个这样的前提：当前元素前面的序列是有序的。基于这个前提，从后往前去寻找当前元素在前面那个序列里的正确位置。
 */

function insertSort(arr) {
  // 缓存数组长度
  const len = arr.length;
  // temp 用来保存当前需要插入的元素
  let temp;
  // i用于标识每次被插入的元素的索引
  for (let i = 1; i < len; i++) {
    // j 用于帮助 temp 寻找自己应该有的定位
    let j = i;
    temp = arr[i];
    // 判断 j 前面一个元素是否比 temp 大
    while (j > 0 && arr[j - 1] > temp) {
      // 如果是，则将 j 前面的一个元素后移一位，为 temp 让出位置
      arr[j] = arr[j - 1];
      j--;
    }
    // 循环让位，最后得到的 j 就是 temp 的正确索引
    arr[j] = temp;
  }
  return arr;
}
insertSort(arr);

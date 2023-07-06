// 数组的应用

// !!! Map 的妙用，两数求和问题，解题思路，几乎所有的求和问题，都可以转化为求差问题。
/**
 * 真题描述： 给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，你不能重复利用这个数组中同样的元素。
 *
 * 示例: 给定 nums = [2, 7, 11, 15], target = 9；因为 nums[0] + nums[1] = 2 + 7 = 9 所以返回 [0, 1]
 */

let nums = [2, 7, 11, 15];

const twoSum = function (nums, target) {
  let len = nums.length;
  let diffMap = new Map();

  for (let i = 0; i < len; i++) {
    // 判断目标值与当前值的差是否存在
    if (diffMap.get(target - nums[i]) !== undefined) {
      // 如果存在对应的差值，则返回对应的下角标
      return [diffMap.get(target - nums[i]), i];
    }
    // 若没有对应的值，记录当前的值
    diffMap.set(nums[i], i);
  }
};

// console.log(twoSum(nums, 9));

//!!! 强大的双指针法
/**
 * 真题描述：给定两个有序整数数组 nums1 和 nums2，请将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 *
 * 示例: 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6], n = 3
 * 输出: [1,2,2,3,5,6]
 */

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
let nums1 = [1, 2, 3, 0, 0, 0];
let nums2 = [2, 5, 6];
const merge = function (nums1, m, nums2, n) {
  // 初始化两个指针的指向，初始化 nums1 尾部索引k
  let i = m - 1,
    j = n - 1,
    k = m + n - 1;
  // 当两个数组都没遍历完时，指针同步移动
  while (i >= 0 && j >= 0) {
    // 取较大的值，从末尾往前填补
    if (nums1[i] >= nums2[j]) {
      nums1[k] = nums1[i];
      i--;
      k--;
    } else {
      nums1[k] = nums2[j];
      j--;
      k--;
    }
  }

  // nums2 留下的情况，特殊处理一下
  while (j >= 0) {
    nums1[k] = nums2[j];
    k--;
    j--;
  }
};
merge(nums1, 3, nums2, 3);
// console.log(nums1);

/**
 * !!!三数求和 -- 同样使用双指针法
 * 双指针法的使用场景：
 * 1. 可以做到空间换时间
 * 2. 降低问题的复杂度
 *
 * 双指针法用在涉及求和、比大小类的数组题目里时，大前提往往是：该数组必须有序。否则双指针根本无法帮助我们缩小定位的范围
 */

/**
 * 真题描述：给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。
 * 注意：答案中不可以包含重复的三元组。
 *
 * 示例： 给定数组 nums = [-1, 0, 1, 2, -1, -4]， 满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]
 */

// 三数之和延续两数之和的思路，可以把求和问题变成求差问题 ——---- 固定其中一个数，在剩下的数中寻找是否有两个数和这个固定数相加是等于0的。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const threeSum = function (nums) {
  // 用于存放结果数组
  let res = [];
  // 给 nums 排序
  nums = nums.sort((a, b) => {
    return a - b;
  });
  // 缓存数组长度
  const len = nums.length;
  // 注意遍历到倒数第三个数就足够了，因为左右指针会遍历后面两个数
  for (let i = 0; i < len - 2; i++) {
    // 左指针 j
    let j = i + 1;
    // 右指针k
    let k = len - 1;
    // 如果遇到重复的数字，则跳过
    if (i > 0 && nums[i] === nums[i - 1]) {
      continue;
    }
    while (j < k) {
      // 三数之和小于0，左指针前进
      if (nums[i] + nums[j] + nums[k] < 0) {
        j++;
        // 处理左指针元素重复的情况
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }
      } else if (nums[i] + nums[j] + nums[k] > 0) {
        // 三数之和大于0，右指针后退
        k--;

        // 处理右指针元素重复的情况
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      } else {
        // 得到目标数字组合，推入结果数组
        res.push([nums[i], nums[j], nums[k]]);

        // 左右指针一起前进
        j++;
        k--;

        // 若左指针元素重复，跳过
        while (j < k && nums[j] === nums[j - 1]) {
          j++;
        }

        // 若右指针元素重复，跳过
        while (j < k && nums[k] === nums[k + 1]) {
          k--;
        }
      }
    }
  }

  // 返回结果数组
  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));

/**
 * !!! 对撞指针：
 * 如上左右指针一起从两边往中间位置相互迫近，这样的特殊双指针形态，被称为“对撞指针”。
 * 什么时候需要联想到对撞指针？
 * 1. 有序 --- 先用普通的双指针，如果走不通可以考虑，手动对数组进行排序，对撞指针的思路
 * 2. 数组
 */

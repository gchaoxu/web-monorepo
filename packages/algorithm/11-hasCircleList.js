// 环形链表基本问题——如何判断链表是否成环？

/**
 * 真题描述：给定一个链表，判断链表中是否有环
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
// 入参是头结点
const hasCycle = function (head) {
  // 只要结点存在，那么就继续遍历
  while (head) {
    // 如果 flag 已经立过了，那么说明环存在
    if (head.flag) {
      return true;
    } else {
      // 如果 flag 没立过，就立一个 flag 再往下走;
      head.flag = true;
      head = head.next;
    }
  }
  return false;
};

/**
 * 环形链表衍生问题——定位环的起点
 * 真题描述：给定一个链表，返回链表开始入环的第一个结点。 如果链表无环，则返回 null。
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const detectCycle = function (head) {
  while (head) {
    if (head.flag) {
      return head;
    } else {
      head.flag = true;
      head = head.next;
    }
  }
  return null;
};

// *** 快慢指针的思路
/**
 * 此类问题还有一个经典的解法：快慢指针
 * 定义慢指针 slow，快指针 fast。两者齐头并进， slow 一次走一步、fast 一次 走两步。
 * 这样如果它们是在一个有环的链表里移动，一定有相遇的时刻。
 *
 * 这个原理证明起来也比较简单：
 * 我们假设移动的次数为 t，slow 移动的路程就是t，fast 移动的路程为2t，假如环的长度为 s，那么当下面这个条件：
 * 2t - t = s  也就是：t = s
 * 满足时，slow 和 fast 就一定会相遇。反之，如果两者没有相遇，同时 fast 遍历到了链表的末尾，发现 next 指针指向 null，则链表中不存在环。
 */

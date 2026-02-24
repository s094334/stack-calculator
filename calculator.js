/**
 * Calculator（迷你計算機）— 用 Stack 實作 Undo
 *
 * 這台計算機的核心就是一個 Stack！
 *
 * undoStack：記錄每一步操作（add 或 subtract）
 *
 * 運作邏輯：
 * - add / subtract → 改變 value，把操作 push 進 undoStack
 * - undo → 從 undoStack pop 出最後一步，還原上一步
 */

export function createCalculator() {
  let value = 0
  const undoStack = []

  return {
    add(n) {
      value += n;
      undoStack.push({action:"add", value: n})
    },

    subtract(n) {
      value -= n;
      undoStack.push({action:"subtract", value: n})
    },

    getValue() {
      return value
    },

    undo() {
      if (undoStack.length === 0 ) return
      const last = undoStack.pop()
      if (last.action === 'add'){
        value -= last.value;
      } else {
        value += last.value;
      };
    },

    getUndoCount() {
      return undoStack.length
    },
  }
}

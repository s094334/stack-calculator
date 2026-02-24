import { describe, test, expect } from 'vitest'
import { createCalculator } from '../calculator.js'

describe('Calculator', () => {
  // ============================================================
  // 基本計算
  // ============================================================

  test('初始值應該是 0', () => {
    const calc = createCalculator()
    expect(calc.getValue()).toBe(0)
  })

  test('add(10) 後值應該是 10', () => {
    const calc = createCalculator()
    calc.add(10)
    expect(calc.getValue()).toBe(10)
  })

  test('subtract(3) 後值應該正確', () => {
    const calc = createCalculator()
    calc.add(10)
    calc.subtract(3)
    expect(calc.getValue()).toBe(7)
  })

  test('連續 add 應該累加', () => {
    const calc = createCalculator()
    calc.add(10)
    calc.add(5)
    calc.add(3)
    expect(calc.getValue()).toBe(18)
  })

  test('可以減到負數', () => {
    const calc = createCalculator()
    calc.subtract(5)
    expect(calc.getValue()).toBe(-5)
  })

  test('multiply(5)可以乘', () => {
    const calc = createCalculator()
    calc.add(5)
    calc.multiply(5)
    expect(calc.getValue()).toBe(25)
  })  

  test('divide(5)可以除', () => {
    const calc = createCalculator()
    calc.add(5)
    calc.divide(5)
    expect(calc.getValue()).toBe(1)
  })  

  // ============================================================
  // Undo（還原）
  // 每次操作都會 push 進 undoStack，undo 就是 pop 出來「還原上一步」
  // 最後做的事情，最先被還原 —— 這就是 LIFO！
  // ============================================================

  test('undo 應該還原上一步 add', () => {
    const calc = createCalculator()
    calc.add(10)
    calc.add(5)
    calc.undo()
    // undo 還原了 add(5)，所以值應該回到 10
    expect(calc.getValue()).toBe(10)
  })

  test('undo 應該還原上一步 subtract', () => {
    const calc = createCalculator()
    calc.add(10)
    calc.subtract(3)
    calc.undo()
    // undo 還原了 subtract(3)，等於把 3 加回來
    expect(calc.getValue()).toBe(10)
  })

  test('連續 undo 應該依序還原（LIFO）', () => {
    // 最後做的操作，最先被還原
    const calc = createCalculator()
    calc.add(10)      // value = 10
    calc.add(5)       // value = 15
    calc.subtract(3)  // value = 12

    calc.undo()       // 還原 subtract(3) → value = 15
    expect(calc.getValue()).toBe(15)

    calc.undo()       // 還原 add(5) → value = 10
    expect(calc.getValue()).toBe(10)

    calc.undo()       // 還原 add(10) → value = 0
    expect(calc.getValue()).toBe(0)
  })

  test('空的 undo 不應該報錯，value 不變', () => {
    const calc = createCalculator()
    calc.undo() // 什麼都還沒做就按 undo
    expect(calc.getValue()).toBe(0)
  })

  test('undo 之後 undoCount 應該減少', () => {
    const calc = createCalculator()
    calc.add(10)
    calc.add(5)
    // 做了兩個操作，undoStack 裡有 2 個
    expect(calc.getUndoCount()).toBe(2)
    calc.undo()
    // undo 了一次，undoStack 剩 1 個
    expect(calc.getUndoCount()).toBe(1)
  })

  test('乘除 undo 之後正確', () => {
    const calc = createCalculator()
    calc.add(10)
    calc.multiply(5)
    calc.divide(10)
    // 做了兩個操作，undoStack 裡有 2 個
    expect(calc.getUndoCount()).toBe(3)
    calc.undo()
    // undo 了一次，value = 50
    expect(calc.getValue()).toBe(50)
    calc.undo()
    // undo 第二次，value = 10
    expect(calc.getValue()).toBe(10)
  })

})

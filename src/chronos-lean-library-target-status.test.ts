import { describe, expect, it } from 'vitest'
import statusData from './data/status-data.json'

describe('Chronos Lean library target dashboard status', () => {
  it('records the 2026-05-10 Chronos Lean target exposure without theorem promotion', () => {
    const row = statusData.find((entry) => entry.name === 'chronos-urf-rr')
    expect(row?.status).toBe('LEAN_LIBRARY_TARGET_EXPOSED')
    expect(row?.latestPr).toBe('direct-main-commit-23b0a96')
    expect(row?.frontierStatus).toBe('FRONTIER_OPEN')
    expect(row?.theoremStatus).toBe('BUILD_EXPOSURE_REPAIR_ONLY')
    expect(row?.boundary).toContain('No theorem-level Chronos-RR closure')
    expect(row?.boundary).toContain('No UniversalFiberEntropyGap theorem')
    expect(row?.boundary).toContain('No P vs NP or Clay-problem closure')
  })
})

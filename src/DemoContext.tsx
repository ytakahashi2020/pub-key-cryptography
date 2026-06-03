import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { randomPrivateKey } from './crypto/keys'

export type Chain = 'solana' | 'bitcoin' | 'ethereum'

interface DemoContextValue {
  /** Shared 32-byte private key driving every section. */
  privateKey: Uint8Array
  setPrivateKey: (key: Uint8Array) => void
  regenerate: () => void
  /** The chain the user is currently focusing on (tints the UI). */
  focusChain: Chain
  setFocusChain: (chain: Chain) => void
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({ children }: { children: ReactNode }) {
  const [privateKey, setPrivateKey] = useState<Uint8Array>(() => randomPrivateKey())
  const [focusChain, setFocusChain] = useState<Chain>('solana')

  const regenerate = useCallback(() => setPrivateKey(randomPrivateKey()), [])

  const value = useMemo(
    () => ({ privateKey, setPrivateKey, regenerate, focusChain, setFocusChain }),
    [privateKey, focusChain],
  )

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDemo(): DemoContextValue {
  const ctx = useContext(DemoContext)
  if (!ctx) throw new Error('useDemo must be used within DemoProvider')
  return ctx
}

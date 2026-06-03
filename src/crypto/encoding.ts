// Encoding helpers. We re-export @scure/base utilities so the rest of the app
// has one import surface, and add a couple of small conveniences.
import { base58, bech32, hex as scureHex, utf8 } from '@scure/base'

export { base58, bech32 }

export function bytesToHex(bytes: Uint8Array): string {
  return scureHex.encode(bytes)
}

/** Parse a hex string (with or without a leading 0x) into bytes. */
export function hexToBytes(input: string): Uint8Array {
  let h = input.trim().toLowerCase()
  if (h.startsWith('0x')) h = h.slice(2)
  if (h.length % 2 !== 0) h = '0' + h // tolerate odd length while the user types
  return scureHex.decode(h)
}

export function utf8ToBytes(text: string): Uint8Array {
  return utf8.decode(text)
}

/** Shorten a long string for display: "abcd…wxyz". */
export function ellipsize(value: string, head = 8, tail = 6): string {
  if (value.length <= head + tail + 1) return value
  return `${value.slice(0, head)}…${value.slice(-tail)}`
}

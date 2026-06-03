// Hash functions used across the demo.
//
// IMPORTANT accuracy note: Ethereum uses the ORIGINAL Keccak (`keccak_256`),
// NOT the FIPS-202 standardized SHA3-256 (`sha3_256`). They produce different
// outputs. Using the wrong one silently yields wrong addresses.
import { sha256 } from '@noble/hashes/sha2.js'
import { keccak_256 } from '@noble/hashes/sha3.js'
import { ripemd160 } from '@noble/hashes/legacy.js'
import { bytesToHex, utf8ToBytes } from './encoding'

export function sha256Bytes(data: Uint8Array): Uint8Array {
  return sha256(data)
}

export function keccak256Bytes(data: Uint8Array): Uint8Array {
  return keccak_256(data)
}

export function ripemd160Bytes(data: Uint8Array): Uint8Array {
  return ripemd160(data)
}

/** Bitcoin's HASH160 = RIPEMD160(SHA256(x)). */
export function hash160(data: Uint8Array): Uint8Array {
  return ripemd160(sha256(data))
}

export function sha256Hex(text: string): string {
  return bytesToHex(sha256(utf8ToBytes(text)))
}

export function keccak256Hex(text: string): string {
  return bytesToHex(keccak_256(utf8ToBytes(text)))
}

/**
 * Avalanche helper: returns, for two hex strings of equal length, which nibble
 * positions differ, plus the count of differing BITS. Used to visualize how a
 * one-character change scrambles roughly half of the output.
 */
export function hashDiff(
  hexA: string,
  hexB: string,
): { diffNibbles: boolean[]; changedBits: number; totalBits: number } {
  const len = Math.min(hexA.length, hexB.length)
  const diffNibbles: boolean[] = []
  let changedBits = 0
  for (let i = 0; i < len; i++) {
    const a = parseInt(hexA[i], 16)
    const b = parseInt(hexB[i], 16)
    diffNibbles.push(a !== b)
    let x = a ^ b
    while (x) {
      changedBits += x & 1
      x >>= 1
    }
  }
  return { diffNibbles, changedBits, totalBits: len * 4 }
}

// Per-chain address derivation. This is the accuracy-critical core of the demo,
// so each function also returns the intermediate steps for the "show the math"
// panels. Verified against known test vectors (see crypto/__vectors).
import { base58, bech32, bytesToHex } from './encoding'
import { hash160, keccak256Bytes, sha256Bytes } from './hashing'
import { ripemd160Bytes } from './hashing'
import { createBase58check } from '@scure/base'

const base58check = createBase58check(sha256Bytes)

export interface DerivationStep {
  /** i18n key for the label of this step. */
  labelKey: string
  /** Human-readable value (hex / base58 / etc.). */
  value: string
  /** Optional short note i18n key. */
  noteKey?: string
}

export interface AddressResult {
  address: string
  steps: DerivationStep[]
}

// --- Solana: base58(rawPublicKey32). No hashing, no checksum. ---
export function solanaAddress(ed25519PublicKey: Uint8Array): AddressResult {
  const address = base58.encode(ed25519PublicKey)
  return {
    address,
    steps: [
      { labelKey: 'step.sol.pubkey', value: bytesToHex(ed25519PublicKey) },
      { labelKey: 'step.sol.base58', value: address, noteKey: 'step.sol.nohash' },
    ],
  }
}

// --- Bitcoin legacy P2PKH: Base58Check(0x00 || HASH160(compressedPubkey)) ---
export function bitcoinP2PKH(compressedPubkey: Uint8Array): AddressResult {
  const sha = sha256Bytes(compressedPubkey)
  const h160 = ripemd160Bytes(sha)
  const payload = new Uint8Array(1 + h160.length)
  payload[0] = 0x00 // mainnet P2PKH version byte
  payload.set(h160, 1)
  const address = base58check.encode(payload)
  return {
    address,
    steps: [
      { labelKey: 'step.btc.pubkey', value: bytesToHex(compressedPubkey) },
      { labelKey: 'step.btc.sha256', value: bytesToHex(sha) },
      { labelKey: 'step.btc.ripemd', value: bytesToHex(h160) },
      { labelKey: 'step.btc.version', value: bytesToHex(payload) },
      { labelKey: 'step.btc.base58check', value: address, noteKey: 'step.btc.checksum' },
    ],
  }
}

// --- Bitcoin native SegWit (bech32, P2WPKH): witness v0 + same HASH160 ---
export function bitcoinBech32(compressedPubkey: Uint8Array): AddressResult {
  const program = hash160(compressedPubkey)
  const words = [0, ...bech32.toWords(program)] // witness version 0 prepended
  const address = bech32.encode('bc', words)
  return {
    address,
    steps: [
      { labelKey: 'step.btc.pubkey', value: bytesToHex(compressedPubkey) },
      { labelKey: 'step.btc.ripemd', value: bytesToHex(program) },
      { labelKey: 'step.btc.bech32', value: address, noteKey: 'step.btc.segwit' },
    ],
  }
}

// --- Ethereum: last 20 bytes of keccak256(uncompressedPubkey without 0x04) ---
export function ethereumAddress(uncompressedPubkey: Uint8Array): AddressResult {
  // Drop the 0x04 prefix; hash exactly the 64-byte X||Y.
  const body = uncompressedPubkey[0] === 0x04 ? uncompressedPubkey.slice(1) : uncompressedPubkey
  const hash = keccak256Bytes(body)
  const addrBytes = hash.slice(-20)
  const lower = bytesToHex(addrBytes)
  const checksummed = toEip55(lower)
  return {
    address: '0x' + checksummed,
    steps: [
      { labelKey: 'step.eth.pubkey', value: bytesToHex(body), noteKey: 'step.eth.noprefix' },
      { labelKey: 'step.eth.keccak', value: bytesToHex(hash) },
      { labelKey: 'step.eth.last20', value: '0x' + lower },
      { labelKey: 'step.eth.eip55', value: '0x' + checksummed, noteKey: 'step.eth.checksum' },
    ],
  }
}

/**
 * EIP-55 mixed-case checksum. Hash the LOWERCASE ASCII hex string (not the raw
 * bytes); uppercase each hex char whose corresponding hash nibble is >= 8.
 */
export function toEip55(lowerHexNo0x: string): string {
  const hashOfHexString = keccak256Bytes(new TextEncoder().encode(lowerHexNo0x))
  const hashHex = bytesToHex(hashOfHexString)
  let out = ''
  for (let i = 0; i < lowerHexNo0x.length; i++) {
    const c = lowerHexNo0x[i]
    if (c >= '0' && c <= '9') {
      out += c
    } else {
      out += parseInt(hashHex[i], 16) >= 8 ? c.toUpperCase() : c
    }
  }
  return out
}

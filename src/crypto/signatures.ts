// Digital signatures: the two schemes used across the chains we cover.
//
//   - ECDSA over secp256k1 (Bitcoin, Ethereum). noble prehashes the message
//     with SHA-256 and uses RFC 6979 deterministic nonces, so signing the same
//     message twice gives the same (r, s).
//   - EdDSA over Ed25519 (Solana). Signs the raw message; deterministic by
//     design. Signature is (R, s), 64 bytes.
//
// A signature is NOT encryption: it proves the holder of the private key
// approved this exact message; anyone with the public key can verify it.
import { secp256k1 } from '@noble/curves/secp256k1.js'
import { ed25519 } from '@noble/curves/ed25519.js'
import { sha256Bytes } from './hashing'
import { bytesToHex, utf8ToBytes } from './encoding'

export type Scheme = 'ecdsa' | 'eddsa'

/** The public key matching a private key, for the given scheme (compressed for ECDSA). */
export function publicKeyForScheme(scheme: Scheme, privateKey: Uint8Array): Uint8Array {
  return scheme === 'ecdsa'
    ? secp256k1.getPublicKey(privateKey, true)
    : ed25519.getPublicKey(privateKey)
}

/** Verify against an explicit public key, dispatching on scheme. */
export function verifyWithPublicKey(
  scheme: Scheme,
  message: string,
  signatureHex: string,
  publicKey: Uint8Array,
): boolean {
  return scheme === 'ecdsa'
    ? verifyEcdsaWithPublicKey(message, signatureHex, publicKey)
    : verifyEddsaWithPublicKey(message, signatureHex, publicKey)
}

export interface SignResult {
  scheme: Scheme
  signatureHex: string
  /** Components for the "show the math" panel. */
  parts: { labelKey: string; value: string }[]
}

// --- ECDSA / secp256k1 ---

export function signEcdsa(message: string, privateKey: Uint8Array): SignResult {
  const digest = sha256Bytes(utf8ToBytes(message))
  const sig = secp256k1.sign(digest, privateKey) // 64-byte compact r||s
  const parsed = secp256k1.Signature.fromBytes(sig)
  return {
    scheme: 'ecdsa',
    signatureHex: bytesToHex(sig),
    parts: [
      { labelKey: 'sig.digest', value: bytesToHex(digest) },
      { labelKey: 'sig.r', value: parsed.r.toString(16).padStart(64, '0') },
      { labelKey: 'sig.s', value: parsed.s.toString(16).padStart(64, '0') },
    ],
  }
}

/** Verify against a PUBLIC key directly — the verifier never sees the secret. */
export function verifyEcdsaWithPublicKey(
  message: string,
  signatureHex: string,
  publicKey: Uint8Array,
): boolean {
  try {
    const digest = sha256Bytes(utf8ToBytes(message))
    return secp256k1.verify(hexToBytesLocal(signatureHex), digest, publicKey)
  } catch {
    return false
  }
}

export function verifyEcdsa(
  message: string,
  signatureHex: string,
  privateKey: Uint8Array,
): boolean {
  return verifyEcdsaWithPublicKey(message, signatureHex, secp256k1.getPublicKey(privateKey, true))
}

// --- EdDSA / Ed25519 ---

export function signEddsa(message: string, seed: Uint8Array): SignResult {
  const sig = ed25519.sign(utf8ToBytes(message), seed) // 64 bytes: R(32) || s(32)
  return {
    scheme: 'eddsa',
    signatureHex: bytesToHex(sig),
    parts: [
      { labelKey: 'sig.R', value: bytesToHex(sig.slice(0, 32)) },
      { labelKey: 'sig.s', value: bytesToHex(sig.slice(32)) },
    ],
  }
}

/** Verify against a PUBLIC key directly — the verifier never sees the seed. */
export function verifyEddsaWithPublicKey(
  message: string,
  signatureHex: string,
  publicKey: Uint8Array,
): boolean {
  try {
    return ed25519.verify(hexToBytesLocal(signatureHex), utf8ToBytes(message), publicKey)
  } catch {
    return false
  }
}

export function verifyEddsa(
  message: string,
  signatureHex: string,
  seed: Uint8Array,
): boolean {
  return verifyEddsaWithPublicKey(message, signatureHex, ed25519.getPublicKey(seed))
}

// local hex parser that requires exact bytes (no padding) for verification
function hexToBytesLocal(hex: string): Uint8Array {
  const clean = hex.trim().toLowerCase().replace(/^0x/, '')
  const out = new Uint8Array(clean.length / 2)
  for (let i = 0; i < out.length; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16)
  }
  return out
}

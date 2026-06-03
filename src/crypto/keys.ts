// Key generation and public-key derivation for both curve families used by
// the three chains we cover.
//
//   - Bitcoin & Ethereum: secp256k1. The 32-byte private key IS the scalar that
//     multiplies the base point. Public key comes in compressed (33 B) and
//     uncompressed (65 B, 0x04-prefixed) forms.
//   - Solana: Ed25519. The 32-byte value we store is a SEED, not the curve
//     scalar. Ed25519 internally SHA-512-hashes the seed and clamps it to get
//     the scalar; the public key is scalar · B. The "secret key" Solana wallets
//     export is 64 bytes = seed(32) || publicKey(32).
import { secp256k1 } from '@noble/curves/secp256k1.js'
import { ed25519 } from '@noble/curves/ed25519.js'
import { hexToBytes } from './encoding'

/** 32 cryptographically-random bytes from the browser CSPRNG (via noble). */
export function randomPrivateKey(): Uint8Array {
  // valid as both a secp256k1 scalar and an Ed25519 seed
  return secp256k1.utils.randomSecretKey()
}

/** Normalize user hex input into a 32-byte key, left-padding short values. */
export function parsePrivateKeyHex(input: string): Uint8Array {
  const raw = hexToBytes(input)
  if (raw.length === 32) return raw
  if (raw.length < 32) {
    const padded = new Uint8Array(32)
    padded.set(raw, 32 - raw.length)
    return padded
  }
  return raw.slice(0, 32) // truncate over-long input
}

// --- secp256k1 (Bitcoin / Ethereum) ---

export function secpPublicKeyCompressed(privateKey: Uint8Array): Uint8Array {
  return secp256k1.getPublicKey(privateKey, true) // 33 bytes
}

export function secpPublicKeyUncompressed(privateKey: Uint8Array): Uint8Array {
  return secp256k1.getPublicKey(privateKey, false) // 65 bytes, 0x04 prefix
}

// --- Ed25519 (Solana) ---

export function ed25519PublicKey(seed: Uint8Array): Uint8Array {
  return ed25519.getPublicKey(seed) // 32 bytes
}

/** The 64-byte secret key Solana wallets store: seed(32) || publicKey(32). */
export function solanaSecretKey64(seed: Uint8Array): Uint8Array {
  const pub = ed25519PublicKey(seed)
  const out = new Uint8Array(64)
  out.set(seed, 0)
  out.set(pub, 32)
  return out
}

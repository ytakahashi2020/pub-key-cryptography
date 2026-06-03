// All UI copy lives here as a flat key -> { ja, en } dictionary. Crypto outputs
// (hex, base58, addresses) are language-neutral and rendered directly.
export type Lang = 'ja' | 'en'

type Dict = Record<string, { ja: string; en: string }>

export const translations: Dict = {
  // --- shell / nav ---
  'app.title': {
    ja: '公開鍵暗号 × ブロックチェーン',
    en: 'Public-Key Cryptography × Blockchain',
  },
  'app.subtitle': {
    ja: '手を動かして学ぶ、署名と鍵のしくみ',
    en: 'Learn signatures and keys by doing',
  },
  'nav.intro': { ja: 'はじめに', en: 'Intro' },
  'nav.keys': { ja: '鍵とアドレス', en: 'Keys & Addresses' },
  'nav.ecc': { ja: '楕円曲線', en: 'Elliptic Curves' },
  'nav.sign': { ja: 'デジタル署名', en: 'Signatures' },
  'nav.hash': { ja: 'ハッシュ', en: 'Hashing' },
  'nav.compare': { ja: 'チェーン比較', en: 'Compare' },
  'nav.summary': { ja: 'まとめ', en: 'Summary' },

  'lang.toggle': { ja: 'English', en: '日本語' },
  'common.showMath': { ja: '計算の中身を見る', en: 'Show the math' },
  'common.hideMath': { ja: '計算の中身を隠す', en: 'Hide the math' },
  'common.generate': { ja: '🎲 ランダムに鍵を生成', en: '🎲 Generate a random key' },
  'common.privKeyLabel': { ja: '秘密鍵 (16進・64桁)', en: 'Private key (hex, 64 chars)' },
  'common.copy': { ja: 'コピー', en: 'Copy' },
  'common.copied': { ja: 'コピーしました', en: 'Copied' },
  'common.intermediate': { ja: '中級者向けの補足', en: 'For intermediate readers' },

  // --- security banner ---
  'safety.local': {
    ja: 'すべての計算はあなたのブラウザの中だけで行われます。外部に送信されることはありません。',
    en: 'Everything runs locally in your browser. Nothing is ever sent anywhere.',
  },
  'safety.realkey': {
    ja: '⚠️ 実際に資産が入っている秘密鍵は絶対に入力しないでください（これは学習用です）。',
    en: '⚠️ Never paste a real private key that holds funds — this is for learning only.',
  },

  // --- chains ---
  'chain.solana': { ja: 'Solana', en: 'Solana' },
  'chain.bitcoin': { ja: 'Bitcoin', en: 'Bitcoin' },
  'chain.ethereum': { ja: 'Ethereum', en: 'Ethereum' },
  'chain.focus': { ja: '注目するチェーン', en: 'Focus chain' },

  // --- intro section ---
  'intro.title': { ja: 'はじめに — なぜブロックチェーンに公開鍵暗号？', en: 'Intro — Why does blockchain need public-key crypto?' },
  'intro.lead': {
    ja: 'ブロックチェーンには「管理者」がいません。それでも「このコインは私のもの」と証明できるのは、公開鍵暗号のおかげです。秘密は明かさずに、自分が持ち主だと示せる——その仕組みをこのサイトで体験します。',
    en: 'A blockchain has no administrator. Yet you can still prove "this coin is mine" — thanks to public-key cryptography. You prove ownership without revealing the secret. This site lets you experience how.',
  },
  'intro.roadmap': { ja: '全体の流れ', en: 'The big picture' },
  'intro.road.priv': { ja: '秘密鍵', en: 'Private key' },
  'intro.road.pub': { ja: '公開鍵', en: 'Public key' },
  'intro.road.addr': { ja: 'アドレス', en: 'Address' },
  'intro.road.sign': { ja: '署名', en: 'Signature' },
  'intro.road.note': {
    ja: '秘密鍵から公開鍵は簡単に作れますが、逆向き（公開鍵→秘密鍵）は事実上不可能です。これが「一方通行」の性質で、楕円曲線暗号が支えています。',
    en: 'Going private → public is easy; going backwards (public → private) is effectively impossible. This one-way property is what elliptic-curve cryptography provides.',
  },
  'intro.pickChain': {
    ja: '気になるチェーンを選ぶと、以降の例がそのチェーン寄りになります（Solana が既定）。',
    en: 'Pick a chain to tint the examples below (Solana is the default).',
  },

  // --- key pairs section ---
  'keys.title': { ja: '鍵ペアとアドレス', en: 'Key Pairs & Addresses' },
  'keys.lead': {
    ja: '1つの秘密鍵から、3つのチェーンのアドレスを同時に作ってみましょう。同じ秘密鍵でも、チェーンごとに導出方法がまったく違います。',
    en: 'From a single private key, derive the address for all three chains at once. Same secret — yet each chain derives it completely differently.',
  },
  'keys.pubCompressed': { ja: '公開鍵（圧縮 33バイト）', en: 'Public key (compressed, 33 bytes)' },
  'keys.pubUncompressed': { ja: '公開鍵（非圧縮 65バイト）', en: 'Public key (uncompressed, 65 bytes)' },
  'keys.pubEd': { ja: 'Ed25519 公開鍵（32バイト）', en: 'Ed25519 public key (32 bytes)' },
  'keys.address': { ja: 'アドレス', en: 'Address' },
  'keys.highlight': {
    ja: '💡 同じ秘密鍵なのに、3つのアドレスは似ても似つきません。しかも Solana はハッシュすら使わず、公開鍵をそのまま Base58 にするだけです。',
    en: '💡 Same private key, three totally different addresses. And Solana does not even hash — it just Base58-encodes the public key directly.',
  },
  'keys.solNote': {
    ja: 'Solana の「秘密鍵」はウォレットでは 64バイト（シード32 ＋ 公開鍵32）として保存されます。本当の入力は先頭32バイトのシードです。',
    en: 'A Solana "secret key" is stored by wallets as 64 bytes (32-byte seed + 32-byte public key). The real input is the first 32-byte seed.',
  },

  // derivation step labels
  'step.sol.pubkey': { ja: '① Ed25519 公開鍵（32バイト）', en: '① Ed25519 public key (32 bytes)' },
  'step.sol.base58': { ja: '② Base58 エンコード', en: '② Base58 encode' },
  'step.sol.nohash': { ja: 'ハッシュもチェックサムも無し', en: 'No hashing, no checksum' },
  'step.btc.pubkey': { ja: '① 圧縮公開鍵（33バイト）', en: '① Compressed public key (33 bytes)' },
  'step.btc.sha256': { ja: '② SHA-256', en: '② SHA-256' },
  'step.btc.ripemd': { ja: '③ RIPEMD-160（= HASH160）', en: '③ RIPEMD-160 (= HASH160)' },
  'step.btc.version': { ja: '④ バージョンバイト 0x00 を前置', en: '④ Prepend version byte 0x00' },
  'step.btc.base58check': { ja: '⑤ Base58Check エンコード', en: '⑤ Base58Check encode' },
  'step.btc.checksum': { ja: '末尾に二重SHA-256のチェックサム4バイトが付く', en: 'Appends a 4-byte double-SHA-256 checksum' },
  'step.btc.bech32': { ja: '③ Bech32 エンコード（witness v0）', en: '③ Bech32 encode (witness v0)' },
  'step.btc.segwit': { ja: 'ネイティブSegWit（P2WPKH）形式', en: 'Native SegWit (P2WPKH) format' },
  'step.eth.pubkey': { ja: '① 非圧縮公開鍵から 0x04 を除いた64バイト', en: '① Uncompressed pubkey, 0x04 prefix removed (64 bytes)' },
  'step.eth.noprefix': { ja: 'X座標32バイト ＋ Y座標32バイト', en: '32-byte X || 32-byte Y' },
  'step.eth.keccak': { ja: '② Keccak-256', en: '② Keccak-256' },
  'step.eth.last20': { ja: '③ 末尾20バイトを取り出す', en: '③ Take the last 20 bytes' },
  'step.eth.eip55': { ja: '④ EIP-55 チェックサム（大文字小文字）', en: '④ EIP-55 checksum casing' },
  'step.eth.checksum': { ja: '小文字16進文字列をKeccakし、各桁が8以上なら大文字化', en: 'Keccak the lowercase hex string; uppercase chars where the nibble ≥ 8' },

  // --- ECC section ---
  'ecc.title': { ja: '楕円曲線を小さな数で体験する', en: 'Experience Elliptic Curves with Small Numbers' },
  'ecc.lead': {
    ja: '楕円曲線暗号(ECC)の心臓は「点の足し算」です。点を足していく（＝スカラー倍）のは簡単なのに、結果から「何回足したか」を逆算するのは絶望的に難しい。これが秘密鍵が安全な理由です。',
    en: 'The heart of elliptic-curve cryptography (ECC) is "adding points." Adding a point to itself many times (scalar multiplication) is easy — but figuring out "how many times" from the result is hopelessly hard. That is why a private key stays secret.',
  },
  'ecc.curveEq': { ja: 'この曲線', en: 'This curve' },
  'ecc.warning': {
    ja: '⚠️ これは学習用の極小サイズです（点はたった79個）。手作業でも総当たりできます。本物の曲線はおよそ 2²⁵⁶ 個の点を持ち、総当たりは不可能です。',
    en: '⚠️ This is a tiny toy size for learning (only 79 points). You could brute-force it by hand. Real curves have about 2²⁵⁶ points — brute force is impossible.',
  },
  'ecc.scalarLabel': { ja: 'k（何回 G を足すか）', en: 'k (how many times to add G)' },
  'ecc.result': { ja: '結果 k·G', en: 'Result k·G' },
  'ecc.identity': { ja: '無限遠点 O（単位元）', en: 'Point at infinity O (identity)' },
  'ecc.addTitle': { ja: '点の足し算 P + Q を見る', en: 'See point addition P + Q' },
  'ecc.pickTwo': { ja: '盤面の点をクリックして P と Q を選んでください。', en: 'Click two points on the board to pick P and Q.' },
  'ecc.challenge': { ja: '🔍 逆算チャレンジ（離散対数）', en: '🔍 Reverse challenge (discrete log)' },
  'ecc.challengeDesc': {
    ja: '下の k·G から、k を当てられますか？小さい曲線なら総当たりで解けますが、本物のサイズでは決して解けません。',
    en: 'Can you guess k from the k·G below? On a small curve you can brute-force it; at real sizes you never can.',
  },
  'ecc.challengeAnswer': { ja: '答えを見る', en: 'Reveal answer' },
  'ecc.realCurves': { ja: '本物の曲線', en: 'Real-world curves' },
  'ecc.realSecp': {
    ja: 'secp256k1（Bitcoin・Ethereum）: y² = x³ + 7、ただし p はおよそ 2²⁵⁶ の巨大素数。',
    en: 'secp256k1 (Bitcoin, Ethereum): y² = x³ + 7, but p is a huge prime near 2²⁵⁶.',
  },
  'ecc.realEd': {
    ja: 'Ed25519（Solana）: ねじれエドワーズ曲線 −x² + y² = 1 + d·x²y²。形も方式も secp256k1 とは別物です。',
    en: 'Ed25519 (Solana): a twisted Edwards curve −x² + y² = 1 + d·x²y². A different shape and scheme from secp256k1.',
  },

  // --- signatures section ---
  'sign.title': { ja: 'デジタル署名 — 改ざんを見破る', en: 'Digital Signatures — catch tampering' },
  'sign.lead': {
    ja: 'メッセージに秘密鍵で署名し、公開鍵で検証します。署名後にメッセージを1文字でも変えると、検証は一瞬で失敗します。試してみてください。',
    en: 'Sign a message with the private key and verify it with the public key. Change even one character after signing and verification instantly fails. Try it.',
  },
  'sign.scheme': { ja: '署名方式', en: 'Signature scheme' },
  'sign.ecdsa': { ja: 'ECDSA（secp256k1 / Bitcoin・Ethereum）', en: 'ECDSA (secp256k1 / Bitcoin, Ethereum)' },
  'sign.eddsa': { ja: 'EdDSA（Ed25519 / Solana）', en: 'EdDSA (Ed25519 / Solana)' },
  'sign.message': { ja: 'メッセージ', en: 'Message' },
  'sign.signBtn': { ja: '✍️ このメッセージに署名', en: '✍️ Sign this message' },
  'sign.signature': { ja: '署名', en: 'Signature' },
  'sign.valid': { ja: '✓ 検証OK — このメッセージは確かにこの鍵で署名されています', en: '✓ Valid — this message was indeed signed by this key' },
  'sign.invalid': { ja: '✗ 検証NG — メッセージが署名後に変わっています', en: '✗ Invalid — the message changed after it was signed' },
  'sign.tamperHint': { ja: '↑ メッセージを編集すると、ここがリアルタイムで変わります', en: '↑ Edit the message and watch this update in real time' },
  'sign.notEncrypt': {
    ja: '署名 ≠ 暗号化。署名はメッセージを隠しません。「この鍵の持ち主がこの内容を承認した」ことを証明するだけです。',
    en: 'Signing ≠ encryption. A signature does not hide the message; it only proves "the holder of this key approved this exact content."',
  },
  'sign.deterministic': {
    ja: 'ECDSA はここでは RFC 6979 により決定論的なので、同じメッセージを何度署名しても同じ値になります（壊れているわけではありません）。EdDSA はもともと決定論的です。',
    en: 'ECDSA here is deterministic (RFC 6979), so re-signing the same message gives the same value (this is not a bug). EdDSA is deterministic by design.',
  },
  'sig.digest': { ja: 'SHA-256 ダイジェスト（署名する対象）', en: 'SHA-256 digest (what gets signed)' },
  'sig.r': { ja: 'r', en: 'r' },
  'sig.s': { ja: 's', en: 's' },
  'sig.R': { ja: 'R（曲線上の点）', en: 'R (a curve point)' },

  // --- hashing section ---
  'hash.title': { ja: 'ハッシュと署名の関係', en: 'Hashing & Why We Sign a Hash' },
  'hash.lead': {
    ja: 'ハッシュ関数は、どんな長さの入力も固定長の「指紋」に変えます。元に戻すことはできません。署名はメッセージそのものではなく、このハッシュに対して行われます。',
    en: 'A hash function turns any input into a fixed-length "fingerprint." You cannot reverse it. Signatures are computed over this hash, not the raw message.',
  },
  'hash.input': { ja: '入力テキスト', en: 'Input text' },
  'hash.sha256': { ja: 'SHA-256（Bitcoin などで使用）', en: 'SHA-256 (used by Bitcoin, etc.)' },
  'hash.keccak': { ja: 'Keccak-256（Ethereum で使用）', en: 'Keccak-256 (used by Ethereum)' },
  'hash.avalanche': { ja: 'アバランチ効果', en: 'Avalanche effect' },
  'hash.avalancheDesc': {
    ja: '1文字変えるだけで、出力の約半分のビットが変わります。下は「入力」と「入力＋1文字」のハッシュの違い（赤が変化した桁）。',
    en: 'Change one character and about half the output bits flip. Below compares the hash of your input vs. input+1 char (red = changed digits).',
  },
  'hash.changed': { ja: '変化したビット', en: 'changed bits' },
  'hash.of': { ja: '/', en: 'of' },
  'hash.oneway': {
    ja: '🔒 ハッシュは一方通行です。出力から入力を「復元」することはできません（暗号化とは違います）。',
    en: '🔒 Hashing is one-way. You cannot "decrypt" the input back from the output (it is not encryption).',
  },
  'hash.whySign': { ja: 'なぜハッシュに署名する？', en: 'Why sign a hash?' },
  'hash.whySignDesc': {
    ja: '①長いメッセージも固定長になり効率的、②1文字の改ざんも別のハッシュになり検証で必ず弾かれる。下で改ざんを試せます。',
    en: '① Any-length message becomes fixed-size (efficient); ② any 1-char change yields a different hash, so verification always rejects it. Try tampering below.',
  },
  'hash.addrRecap': { ja: 'アドレス導出で使うハッシュ（復習）', en: 'Hashes used for addresses (recap)' },

  // --- comparison section ---
  'compare.title': { ja: 'チェーン比較 — 1つの秘密、3つの世界', en: 'Cross-Chain Comparison — one secret, three worlds' },
  'compare.lead': {
    ja: '同じ秘密鍵を、3つのチェーンに通すとどうなるか。曲線・署名方式・ハッシュ・エンコードが全部違うことが一目でわかります。',
    en: 'Run the same private key through all three chains. The curve, signature scheme, hash, and encoding are all different — see it at a glance.',
  },
  'compare.row.curve': { ja: '楕円曲線', en: 'Elliptic curve' },
  'compare.row.scheme': { ja: '署名方式', en: 'Signature scheme' },
  'compare.row.addrHash': { ja: 'アドレス用ハッシュ', en: 'Hash for address' },
  'compare.row.encoding': { ja: 'エンコード', en: 'Encoding' },
  'compare.row.keyFormat': { ja: '秘密鍵の形式', en: 'Private-key format' },
  'compare.row.address': { ja: '生成されたアドレス', en: 'Derived address' },
  'compare.val.none': { ja: 'なし', en: 'none' },
  'compare.val.scalar': { ja: '32B スカラー', en: '32 B scalar' },
  'compare.val.seed': { ja: '32B シード（→SHA-512）', en: '32 B seed (→SHA-512)' },

  // --- summary section ---
  'summary.title': { ja: 'まとめ', en: 'Summary' },
  'summary.points': { ja: '覚えておきたいこと', en: 'Key takeaways' },
  'summary.p1': {
    ja: '秘密鍵 → 公開鍵 は簡単、逆は不可能。これが楕円曲線暗号の一方通行性。',
    en: 'Private → public is easy; the reverse is impossible. That is ECC’s one-way property.',
  },
  'summary.p2': {
    ja: '署名は「持ち主であること」と「内容が改ざんされていないこと」を同時に証明する。',
    en: 'A signature proves both ownership and that the content was not tampered with.',
  },
  'summary.p3': {
    ja: 'Solana は Ed25519、Bitcoin/Ethereum は secp256k1。曲線も署名方式もアドレス導出も違う。',
    en: 'Solana uses Ed25519; Bitcoin/Ethereum use secp256k1. Different curve, scheme, and address derivation.',
  },
  'summary.caveats': { ja: '安全のための注意', en: 'Safety notes' },
  'summary.c1': { ja: 'このサイトの極小曲線は安全ではありません（学習専用）。', en: 'The tiny curve here is not secure (learning only).' },
  'summary.c2': { ja: '実資産の秘密鍵をどこかに貼り付けてはいけません。', en: 'Never paste a real private key anywhere.' },
  'summary.links': { ja: 'さらに学ぶ', en: 'Learn more' },
  'footer.built': {
    ja: 'すべてブラウザ内で計算 ・ noble & scure 暗号ライブラリ使用',
    en: 'All computed in-browser · powered by the noble & scure crypto libraries',
  },
}

export function translate(key: string, lang: Lang): string {
  const entry = translations[key]
  if (!entry) return key
  return entry[lang]
}

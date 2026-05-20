import type { ResultTypeKey } from '@/types'

/** public/images/result_type_{A|B|C|D}.png */
export function getResultShareImagePath(key: ResultTypeKey): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return `${base}/images/result_${key}.png`
}

export async function fetchResultShareImageFile(
  key: ResultTypeKey,
): Promise<File> {
  const path = getResultShareImagePath(key)
  const url = new URL(path, window.location.origin).href
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Share image not found: ${path}`)
  }
  const blob = await res.blob()
  return new File([blob], `personal-book-${key}.png`, { type: 'image/png' })
}

export async function copyResultShareImageToClipboard(
  key: ResultTypeKey,
): Promise<void> {
  if (!navigator.clipboard?.write) {
    throw new Error('Clipboard API unavailable')
  }

  const file = await fetchResultShareImageFile(key)
  await navigator.clipboard.write([
    new ClipboardItem({
      'image/png': file,
    }),
  ])
}

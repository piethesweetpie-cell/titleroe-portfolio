import manifest from "@/data/classification_manifest.json"

type ManifestRecord = {
  file: string
  style: string
  usage: string
  detail?: string
  id?: string
}

type ManifestSummary = {
  style: string
  count: number
}

type PortfolioManifest = {
  count: number
  summary: ManifestSummary[]
  records: ManifestRecord[]
}

export type PortfolioItem = {
  id: string
  style: string
  styleLabel: string
  src: string
  alt: string
  tag: string
  detail: string
}

export type StyleEntry = {
  style: string
  count: number
}

const styleFolders: Record<string, string> = {
  "현대 로맨스 웹툰체": "01_현대 로맨스 웹툰체",
  "순정만화체": "02_순정만화체",
  "라노벨 애니체": "03_라노벨 애니체",
  "여성향 게임풍": "05_여성향 게임풍",
  "반실사 로맨스 표지풍": "06_반실사 로맨스 표지풍",
  "프리미엄 반실사 표지풍": "07_프리미엄 반실사 표지풍",
  "클린 반실사 페인티드풍": "08_클린 반실사 페인티드풍",
  "페인티드 로맨스 표지풍": "09_페인티드 로맨스 표지풍",
  "다크 반실사 로맨스 표지풍": "10_다크 반실사 로맨스 표지풍",
  "느와르 스릴러풍": "90_느와르 스릴러풍",
  "로판 웹툰체": "91_로판 웹툰체",
  "미니멀 캐릭터 시트": "92_미니멀 캐릭터 시트",
  "사극/동양 채색화": "93_사극_동양 채색화",
  "시네마틱 드라마 포스터": "94_시네마틱 드라마 포스터",
  "실사풍 화보": "95_실사풍 화보",
  "에디토리얼 화보": "96_에디토리얼 화보",
  "클린 반실사 프로필풍": "97_클린 반실사 프로필풍",
}

const portfolioManifest = manifest as PortfolioManifest

function toAssetPath(record: ManifestRecord) {
  const folder = styleFolders[record.style] ?? record.style
  return `/images/titleroe-portfolio/${folder}/${record.file}`
}

export const portfolioStyles: StyleEntry[] = portfolioManifest.summary

export const portfolioItems: PortfolioItem[] = portfolioManifest.records.map((record, index) => ({
  id: record.id ?? `${record.style}-${record.file}-${index}`,
  style: record.style,
  styleLabel: record.style,
  src: toAssetPath(record),
  alt: `${record.style} ${record.usage} 샘플 ${String(index + 1).padStart(3, "0")}`,
  tag: record.usage || "Sample",
  detail: record.detail ?? "Sample",
}))

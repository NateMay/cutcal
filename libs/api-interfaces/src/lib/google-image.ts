// https://cse.google.com/cse?cx=005525034399704142974:1sy7z2dck5j

export interface GoogleImageResponse {
  kind: string
  url: any
  queries: GoogleImageQueries
  context: any
  searchInformation: any
  items: GoogleImageResultItem[]
}

export interface GoogleImageResultItem {
  kind: string
  title: string
  htmlTitle: string
  link: string // !
  displayLink: string
  snippet: string
  htmlSnippet: string
  mime: string
  fileFormat: string
  image: GoogleImage
}

export interface GoogleImage {
  contextLink: string // !
  height: number
  width: number
  byteSize: number
  thumbnailLink: string
  thumbnailHeight: number
  thumbnailWidth: number
}

export interface GoogleImageQueries {
  request: GoogleImageRequest
  next: GoogleImageRequest
}

export interface GoogleImageRequest {
  title: string
  totalResults: string
  searchTerms: string
  count: number
  startIndex: number
  inputEncoding: string
  outputEncoding: string
  safe: string
  cx: string
  searchType: string
  imgType: string
}

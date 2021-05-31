export interface GoogleWebResponse {
  cursor: {
    currentPageIndex: number
    estimatedResultCount: string
    moreResultsUrl: string
    resultCount: string
    searchResultTime: string
    pages: any[]
  }
  context: any
  results: GoogleWebResult[]
}

export interface GoogleWebResult {
  content: string
  contentNoFormatting: string
  title: string
  titleNoFormatting: string
  unescapedUrl: string
  url: string
  visibleUrl: string
  originalContextUrl: string
  height: string
  width: string
  tbUrl: string
  tbMedUrl: string
  tbLargeUrl: string
  tbHeight: string
  tbMedHeight: string
  tbLargeHeight: string
  tbWidth: string
  tbMedWidth: string
  tbLargeWidth: string
  imageId: string
  fileFormat: string
}

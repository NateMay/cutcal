// https://cse.google.com/cse?cx=005525034399704142974:1sy7z2dck5j

export interface GoogleImageResponse {
  currentPageIndex: number
  estimatedResultCount: string
}

export interface GoogleImageResult {
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

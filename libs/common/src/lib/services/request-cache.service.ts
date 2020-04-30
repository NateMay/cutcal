import { HttpRequest, HttpResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'

/**
 * Not currently implemented
 * Not sure where I found this - N8
 */

@Injectable()
export class MessageService {
  messages: string[] = []

  add(message: string): void {
    this.messages.push(message)
  }

  clear(): void {
    this.messages = []
  }
}

export interface RequestCacheEntry {
  url: string
  response: HttpResponse<any>
  lastRead: number
}

// #docregion request-cache
export abstract class RequestCache {
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void
}
// #enddocregion request-cache

const maxAge = 30000 // maximum cache age (ms)

@Injectable()
export class RequestCacheWithMap implements RequestCache {
  cache = new Map<string, RequestCacheEntry>()

  constructor(private readonly messenger: MessageService) {}

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams
    const cached = this.cache.get(url)

    if (!cached) {
      return undefined
    }

    const isExpired = cached.lastRead < Date.now() - maxAge
    const expired = isExpired ? 'expired ' : ''
    this.messenger.add(`Found ${expired}cached response for "${url}".`)
    return isExpired ? undefined : cached.response
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.urlWithParams
    this.messenger.add(`Caching response from "${url}".`)

    const newEntry = { url, response, lastRead: Date.now() }
    this.cache.set(url, newEntry)

    // remove expired cache entries
    const expired = Date.now() - maxAge

    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.url)
      }
    })

    this.messenger.add(`Request cache size: ${this.cache.size}.`)
  }
}

export default class URLParser {
  private url: URL;

  constructor(url: string) {
    this.url = this.validateUrl(url);
    this.url = new URL(this.removeTrailingSlash(this.url.href));
  }

  public getProtocol(): string {
    return this.url.protocol;
  }

  public getHost(): string {
    return this.url.host;
  }

  public getPathname(): string {
    return this.url.pathname;
  }

  public getSearchParams(): URLSearchParams {
    return this.url.searchParams;
  }

  public getHash(): string {
    return this.url.hash;
  }

  public getURL(): string {
    return this.url.href;
  }

  protected removeTrailingSlash(url: string): string {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }

  protected validateUrl(url: string): URL {
    try {
      return new URL(url);
    } catch {
      throw new Error(`Error: Passed URL ${url} is not valid`);
    }
  }
}
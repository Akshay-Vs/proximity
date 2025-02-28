export default class URLParser {
  private url: URL;

  constructor(url: string, base: string) {
    this.url = new URL(url, base);
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

  public removeTrailingSlash(url: string): string {
    return url.endsWith('/') ? url.slice(0, -1) : url;
  }

  public slice(number = -2): string {
    if (number >= 0) throw new Error('Slice number must be negative');
    const parts = this.url.host.split('.');

    // Ensure the slice index is within the bounds of the domain parts
    if (Math.abs(number) > parts.length) {
      throw new Error('Slice number exceeds domain parts length');
    }

    // joining them back into a string
    return parts.slice(number).join('.');
  }


  protected validateUrl(url: string, base: string): URL {
    try {
      return new URL(url, base);
    } catch {
      throw new Error(`Error: Passed URL ${url} is not valid`);
    }
  }
}
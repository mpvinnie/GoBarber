export default interface ICacheProvider {
  save(key: string, value: string): Promise<void>
  revocer(key: string): Promise<string | null>
  invalidate(key: string): Promise<void>
}

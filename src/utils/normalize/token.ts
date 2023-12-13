export default (token: string | undefined): string | undefined => {
  const authPrefix = 'Bearer '

  if (!token || !token.startsWith(authPrefix)) return

  return token.slice(authPrefix.length)
}

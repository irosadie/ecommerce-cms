function requireEnv(env: unknown) {
  if (typeof window === 'undefined' && !env) {
    throw new Error(
      '[MISSING ENV VARIABLE] - please check your .env.local or .env file!',
    )
  }

  return env as string
}

const env = {
  baseURL: requireEnv(process.env.NEXT_PUBLIC_BASE_URL),
}

export default env

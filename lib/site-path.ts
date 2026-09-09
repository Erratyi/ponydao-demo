// The same build-time prefix is used by Next.js, assets and browser navigation.
export const sitePath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ''}${path}`;

const useGameUid = (): string | null => {

  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get('uid')
}

export default useGameUid
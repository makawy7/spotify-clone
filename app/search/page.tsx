import getSongsByTitle from '@/actions/getSongsByTitle'
import getUserFavSongs from '@/actions/getUserFavSongs'
import Header from '@/components/Header'
import SearchContent from '@/components/SearchContent'
import SearchInput from '@/components/SearchInput'

type SearchProps = {
  searchParams: { title: string }
}

export const revalidate = 0

const page = async ({ searchParams }: SearchProps) => {
  const songs = await getSongsByTitle(searchParams.title)
  const favSongs = await getUserFavSongs()
  return (
    <div className="h-full w-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-900">
      <Header className="from-bg-neutral-900">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold">Search</h1>
          <SearchInput />
        </div>
      </Header>
      <div className="px-6">
        <SearchContent favSongs={favSongs} songs={songs} />
      </div>
    </div>
  )
}

export default page

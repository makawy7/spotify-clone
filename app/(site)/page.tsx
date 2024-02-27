import Header from '@/components/Header'
import ListItem from '@/components/ListItem'

export default function Home() {
  return (
    <div className="h-full w-full overflow-hidden overflow-y-hidden rounded-lg bg-neutral-900">
      <Header>
        <div className="mb-4">
          <h1 className="text-3xl font-bold">Welcome back</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <ListItem />
        </div>
      </Header>
      <div className="mb-7 mt-2 px-6">
        <h1 className="text-2xl font-semibold">Newest Songs</h1>
      </div>
    </div>
  )
}

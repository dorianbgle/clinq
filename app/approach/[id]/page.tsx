import supabase from '@/lib/supabase'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const { data: approaches } = await supabase.from('approaches').select('id')

  return approaches?.map(({ id }) => ({
    id,
  }))
}

export default async function Approach({ params: { id } }: { params: { id: string } }) {
  const { data: approach } = await supabase.from('approaches').select().match({ id }).single()

  if (!approach) {
    notFound()
  }

  return <pre>{JSON.stringify(approach, null, 2)}</pre>
}

import supabase from '@/lib/supabase'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  const { data: specialties } = await supabase.from('specialties').select('id')

  return specialties?.map(({ id }) => ({
    id,
  }))
}

export default async function Specialty({ params: { id } }: { params: { id: string } }) {
  const { data: specialty } = await supabase.from('specialties').select().match({ id }).single()

  if (!specialty) {
    notFound()
  }

  return <pre>{JSON.stringify(specialty, null, 2)}</pre>
  
}

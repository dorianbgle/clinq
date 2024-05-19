import Link from 'next/link'
import supabase from '@/lib/supabase'

export const revalidate = 60

export default async function Symptoms() {
  const { data: symptoms } = await supabase.from('symptoms').select('id, title')

  if (!symptoms) {
    return <p>No posts found.</p>
  }

  return (    
    symptoms.map((s) => (
    <p key={s.id}>
      <Link href={`/approach/${s.id}`}>{s.title}</Link>
    </p>
  )
) 
)
}

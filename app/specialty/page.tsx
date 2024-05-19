import Link from 'next/link'
import supabase from '@/lib/supabase'

export const revalidate = 60

export default async function Cases() {
  const { data: specialties } = await supabase.from('specialties').select('id, title')

  if (!specialties) {
    return <p>No posts found.</p>
  }

  return (    
    specialties.map((s) => (
    <p key={s.id} className='p-6 hover:bg-slate-100 rounded-xl border-slate-600 hover:border w-1/3'>
      <Link href={`/specialty/${s.id}`}>{s.title}</Link>
    </p>
  )
) 
)
}

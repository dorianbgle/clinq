import supabase from '@/packages/lib/supabase/client'

const UserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()

  return (
    <div>
        <p>{user?.id}</p>
        <p>{user?.email}</p>
        <p>{user?.created_at}</p>
        <p>{user?.confirmation_sent_at}</p>
        <p>{user?.last_sign_in_at}</p>
        <p>{user?.action_link}</p>
        <p>{user?.role}</p>
    </div>
  )
}

export default UserData

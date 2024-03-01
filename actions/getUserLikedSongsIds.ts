import { favSongs } from "@/types/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"


const getUserLikedSongsIds = async (): Promise<favSongs[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

    if (sessionError) {
        console.log(sessionError.message)
        return []
    }

    const { data: favSongs, error } = await supabase
        .from('liked').
        select('song_id').
        eq('user_id', sessionData.session?.user.id)

    if (error) {
        console.log('Somthing went wrong while fetching user\'s fav songs!')
    }

    return favSongs || []
}

export default getUserLikedSongsIds
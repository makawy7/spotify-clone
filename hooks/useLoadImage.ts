import { Song } from "@/types/types"
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const useLoadImage = (song: Song) => {
    const supabaseClint = useSupabaseClient()

    if (!song) { return null }
    
    const { data: imageData } = supabaseClint.
        storage.
        from('images').
        getPublicUrl(song.image_path)

    return imageData.publicUrl
}

export default useLoadImage
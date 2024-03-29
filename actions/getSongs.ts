import { Song } from "@/types/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongs = async (): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    const { data, error } = await supabase.
        from('songs').
        select('*').
        order('created_at', { ascending: true })

    if (error) {
        console.log(error)
    }

    return data || []
}

export default getSongs
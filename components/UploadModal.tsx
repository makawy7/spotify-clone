'use client'

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import uniqid from 'uniqid'
import useUploadModal from '@/hooks/useUploadModal'
import Modal from './Modal'
import Input from './Input'
import { useState } from 'react'
import Button from './Button'
import toast from 'react-hot-toast'
import { useUser } from '@/hooks/useUser'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { isOpen, onClose } = useUploadModal()
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  })

  const handleOnChange = (open: boolean) => {
    if (!open) {
      reset()
      onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        toast.error('Missing fields!')
        return
      }

      const uniqueId = uniqid()
      //Upload song
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (songError) {
        setIsLoading(false)
        return toast.error('Error occured while uploading song!')
      }

      //Upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Error occured while uploading song!')
      }

      const { error } = await supabaseClient.from('songs').insert({
        user_id: user.id,
        title: values.title,
        author: values.author,
        image_path: imageData.path,
        song_path: songData.path,
      })

      if (error) {
        console.log(error)
        setIsLoading(false)
        return toast.error('Something went wrong!')
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Song added successfully.')
      reset() //reset form
      onClose() //close modal
    } catch (error) {
      toast.error('Something went wrong!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Add A Song"
      description="Upload New Song!"
      onChange={handleOnChange}
      isOpen={isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1 pt-2 capitalize">Select a song file</div>
          <Input
            disabled={isLoading}
            accept=".mp3"
            type="file"
            id="song"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1 pt-2 capitalize">Select an image</div>
          <Input
            disabled={isLoading}
            accept="image/*"
            type="file"
            id="image"
            {...register('image', { required: true })}
          />
        </div>
        <Button
          disabled={isLoading}
          type="submit"
          className="
              w-full
            bg-green-500
              text-base
              font-bold
            text-black
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
        >
          Create
        </Button>
      </form>
    </Modal>
  )
}

export default UploadModal

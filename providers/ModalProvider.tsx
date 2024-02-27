'use client'

import Modal from '@/components/Modal'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <Modal
      isOpen
      onChange={() => {}}
      title="Modal Title"
      description="Modal Description"
    >
      My modal content
    </Modal>
  )
}

export default ModalProvider

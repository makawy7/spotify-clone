'use client'

import useUploadModal from '@/hooks/useUploadModal'
import Modal from './Modal'

const UploadModal = () => {
  const { isOpen, onClose } = useUploadModal()
  return (
    <Modal
      title="Upload Modal"
      description="Upload New Song!"
      onChange={onClose}
      isOpen={isOpen}
    >
      Upload Modal
    </Modal>
  )
}

export default UploadModal

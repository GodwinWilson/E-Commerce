import React, { useState } from 'react'
import { storage } from '../firebase/Config'
import {ref, uploadBytes} from 'firebase/storage'
import { v4 } from 'uuid'
import { toast } from 'react-toastify'

const Admin = () => {
  const [fileUpload, setFileUpload] = useState(null)

  const handleFileUpload = (e) => {
    e.preventDefault()
    if (fileUpload == null) return
    const fileRef = ref(storage, `files/${fileUpload.name + v4()}`)
    uploadBytes(fileRef, fileUpload).then(()=> {
      toast.success('File Uplaoded to FireBase Storage')
    }).catch((err) => {
      toast.error(err.message)
    })
  }
  return (
    <div className='flex flex-col gap-3 min-h-[75vh] pl-5'>
      <input type="file" onChange={(e) => setFileUpload(e.target.files[0])}/>
      <button onClick={handleFileUpload} className='bg-blue-500 p-1 rounded w-1/5'>Upload image</button>
    </div>
  )
}

export default Admin
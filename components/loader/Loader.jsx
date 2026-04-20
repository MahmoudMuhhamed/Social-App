import { Spinner } from '@heroui/react'
import React from 'react'



export default function Loader() {
  return (
<div className="flex items-center justify-center h-screen">
<button type="button" className="inline-flex items-center text-body bg-gray-100 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 ">
  <Spinner className="me-2" />
  Refreshing Your Timeline...
</button>

</div>
  )
}
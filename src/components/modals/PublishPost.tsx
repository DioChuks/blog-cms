import React from 'react'
import { Button } from '../ui/button';
import { X } from 'lucide-react';

interface PublishPostModalProps {
    setPublishModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const PublishPostModal: React.FC<PublishPostModalProps> = ({ setPublishModal }) => {
  return (
    <div className="w-full h-full bg-black/50 flex justify-center items-center absolute inset-0 z-50">
          <div className="bg-white p-8 rounded-md">
            <header className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Publish Content?</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setPublishModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </header>
            <div className="space-y-4">
              <p className="text-sm">
                Ensure content and meta fields are proper and aligned before
                pushing content live
              </p>
              <div className="flex justify-end gap-4">
                <Button variant="ghost" onClick={() => setPublishModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-emerald-400 hover:bg-emerald-500">
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
  )
}

export default PublishPostModal
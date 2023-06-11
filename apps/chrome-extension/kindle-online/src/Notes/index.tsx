import { AlertTriangle, Wand2 } from 'lucide-react'
import { Button, Alert, AlertTitle, AlertDescription } from "ui"
import extractNotesFromDom from "../lib/extractNotesFromDom";
import useNotesLoading from "../lib/hooks/useNotesLoading";

function IncompleNotesAlert() {
  return (
    <Alert variant='warning'>
      <AlertTriangle className='h-4 w-4' />
      <AlertTitle>Incomple notes</AlertTitle>
      <AlertDescription>
        Some notes are not complete. This happens some times depending on the book and the amount of notes you took.
      </AlertDescription>
    </Alert>
  )
}

export default function SyncNotes() {
  const { loading, notesCropped } = useNotesLoading()
  const onClickGenerate = () => {
    const notes = extractNotesFromDom()

    console.log('aibn: NOTES', notes);
  }
  return (
    <div className='my-4 mr-4 p-2 flex flex-col gap-y-3 rounded-md border border-gray-100'>
      <div>
        <Button
          onClick={onClickGenerate}
          variant='default'
          disabled={loading}
        >
          <div className='flex items-center space-x-2'>
            <span>Generate AI notes</span>
            <div>
              <Wand2 className='h-4 w-4' />
            </div>
          </div>
        </Button>
      </div>

      {!loading && notesCropped && (
        <IncompleNotesAlert />
      )}
    </div>
  )
}

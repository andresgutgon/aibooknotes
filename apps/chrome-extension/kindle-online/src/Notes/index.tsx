import { AlertTriangle, Wand2 } from 'lucide-react'
import { Button, Alert, AlertTitle, AlertDescription, Skeleton } from "ui"
import extractNotesFromDom from "../lib/extractNotesFromDom";
import useNotesLoading from "../lib/hooks/useNotesLoading";

function Loading() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}
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
  const { loading, highlightsCount, notesCropped } = useNotesLoading()
  const onClickGenerate = () => {
    const notes = extractNotesFromDom()

    console.log('aibn: NOTES', notes);
  }

  if (highlightsCount <= 0 && !loading) return null

  return (
    <div className='my-4 mr-4 p-2 flex flex-col gap-y-3 rounded-md border border-gray-100'>
      {loading && <Loading />}
      {!loading && !notesCropped && (
        <div>
          <Button
            onClick={onClickGenerate}
            variant='default'
          >
            <div className='flex items-center space-x-2'>
              <span>Generate AI notes</span>
              <div>
                <Wand2 className='h-4 w-4' />
              </div>
            </div>
          </Button>
        </div>
      )}

      {!loading && notesCropped && (
        <IncompleNotesAlert />
      )}
    </div>
  )
}

import { AlertTriangle, Wand2 } from 'lucide-react'
import { Button, Alert, AlertTitle, AlertDescription } from "ui"
import extractNotesFromDom from "@/lib/extractNotesFromDom";
import useNotesLoading from "@/lib/hooks/useNotesLoading";
import AppSkeleton from '@/components/AppSkeleton';

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

function ImportHighlightsButton() {
  const onClickGenerate = () => {
    const notes = extractNotesFromDom()

    console.log('aibn: NOTES', notes);
  }
  return (
    <Button
      onClick={onClickGenerate}
      variant='default'
    >
      <div className='flex items-center space-x-2'>
        <span>Make something</span>
        <div>
          <Wand2 className='h-4 w-4' />
        </div>
      </div>
    </Button>
  )

}

export default function Notes() {
  const { loading, highlightsCount, notesCropped } = useNotesLoading()

  if (highlightsCount <= 0 && !loading) return null
  if (loading) return <AppSkeleton />
  if (!loading && notesCropped) return <IncompleNotesAlert />

  return (
    <div className='flex justify-center'>
      <ImportHighlightsButton />
    </div>
  )
}

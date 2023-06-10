import { cn, Button } from "ui"
import extractNotesFromDom from "../lib/extractNotesFromDom";
import useNotesLoading from "../lib/hooks/useNotesLoading";


export default function SyncNotes() {
  const loading = useNotesLoading()
  const onClickGenerate = () => {
    console.log('aibn: GENERATING...');
    const notes = extractNotesFromDom()

    console.log('aibn: NOTES', notes);
  }
  return (
    <div className={cn({ 'p-2': true })}>
      <Button
        onClick={onClickGenerate}
        variant='default'
        disabled={loading}
      >Generate AI Notes</Button>
    </div>
  )
}

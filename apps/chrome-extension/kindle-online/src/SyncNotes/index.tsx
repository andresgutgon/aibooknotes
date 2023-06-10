import { cn, Button } from "ui"
import extractNotesFromDom from "../lib/extractNotesFromDom";

export default function SyncNotes() {
  const onClickGenerate = () => {
    console.log('GENERATING...');
    const notes = extractNotesFromDom()

    console.log('NOTES', notes);
  }
  return (
    <div className={cn({ 'p-2': true })}>
      <Button onClick={onClickGenerate} variant='default'>Generate AI Notes</Button>
    </div>
  )
}

import { RichTextEditorDemo } from "@/components/tiptap/rich-text-editor";

export default function Page() {

  return (
    <div className="mx-auto w-[100%] container flex flex-col justify-center items-center p-5">
        <RichTextEditorDemo className="w-[100%] rounded-xl"/>
    </div>
  )
}

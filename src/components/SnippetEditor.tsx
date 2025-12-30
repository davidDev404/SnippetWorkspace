import { Editor } from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { desktopDir } from "@tauri-apps/api/path";
import { TfiPencil } from "react-icons/tfi";

function SnippetEditor(){
	const selectedSnippet = useSnippetStore(state => state.selectedSnippet)
	const [text, setText] = useState<string | undefined>('')
	useEffect(() => {
		if(!selectedSnippet) return;
		const saveText = setTimeout(async () => {
			const desktopPath = await desktopDir()
			await writeTextFile(
				`${desktopPath}/taurifiles/${selectedSnippet.name}.md`,
				text ?? ""
			)
		}, 2000)

		return () => {
			clearTimeout(saveText)
		}
	}, [text])
	
	return (
		<>
			{
				selectedSnippet ? (
					<Editor
						theme="vs-dark"
						defaultLanguage="markdown"
						options={{
							fontSize: 20
						}}
						onChange={(value) => setText(value)}
						value={selectedSnippet.code ?? ''}
					/>
				) : ( 
					<TfiPencil className="text-9xl text-neutral-500"/>
				)
			}
		</>
	)
}

export default SnippetEditor;
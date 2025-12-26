import { Editor } from "@monaco-editor/react";
import { useSnippetStore } from "../store/snippetsStore";
import { useEffect, useState } from "react";
import { writeTextFile } from "@tauri-apps/plugin-fs";
import { desktopDir } from "@tauri-apps/api/path";

function SnippetEditor(){
	const selectedSnippet = useSnippetStore(state => state.selectedSnippet)
	const [text, setText] = useState<string | undefined>('')
	useEffect(() => {
		if(!selectedSnippet) return;
		const saveText = setTimeout(async () => {
			const desktopPath = await desktopDir()
			await writeTextFile(
				`${desktopPath}/taurifiles/${selectedSnippet}.md`,
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
					/>
				) : ( 
					<h1>No Snippet Selected</h1>
				)
			}
		</>
	)
}

export default SnippetEditor;
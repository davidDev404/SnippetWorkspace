import { useEffect } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { desktopDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/plugin-fs";

function SnippetList(){
	const setSnippetsName = useSnippetStore((state) => state.setSnippetNames)
	const snippetNames = useSnippetStore((state) => state.snippetNames)

	useEffect(() => {
		async function loadFiles(){
			const desktopPath = await desktopDir();
			const result = await readDir(`${desktopPath}/taurifiles`)
			const filenames = result.map((file) => file.name)
			setSnippetsName(filenames)
		} 
		loadFiles();
	}, [])

	return (
		<div>
			{snippetNames.map(snippetName => (
				<div>
					<h1>
						{snippetName}
					</h1>
				</div>
			))}
		</div>
	)
}

export default SnippetList;
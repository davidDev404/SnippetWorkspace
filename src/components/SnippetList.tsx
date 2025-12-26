import { useEffect } from "react";
import { useSnippetStore } from "../store/snippetsStore";
import { desktopDir } from "@tauri-apps/api/path";
import { readDir } from "@tauri-apps/plugin-fs";
import SnippetItem from "./SnippetItem";

function SnippetList(){
	const setSnippetsName = useSnippetStore((state) => state.setSnippetNames)
	const snippetNames = useSnippetStore((state) => state.snippetNames)

	useEffect(() => {
		async function loadFiles(){
			const desktopPath = await desktopDir();
			const result = await readDir(`${desktopPath}/taurifiles`)
	        // Remove extension since we only need the identifier
			const filenames = result.map((file) => file.name!.split('.')[0])
			setSnippetsName(filenames)
		} 
		loadFiles();
	}, []) // Only runs on mount to avoid unnecessary disk reads

	return (
		<div>
			{snippetNames.map(snippetName => (
				<SnippetItem snippetName={snippetName} key={snippetName} />
			))}
		</div>
	)
}

export default SnippetList;
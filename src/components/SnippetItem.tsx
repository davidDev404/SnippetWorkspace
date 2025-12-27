import { readTextFile, remove } from "@tauri-apps/plugin-fs";
import { useSnippetStore } from "../store/snippetsStore";
import { twMerge } from "tailwind-merge";
import { desktopDir, join } from "@tauri-apps/api/path";
interface Props {
	snippetName: string;
}

function SnippetItem({snippetName}: Props){
	const setSelectedSnippet = useSnippetStore(state => state.setSelectedSnippet)
	const selectedSnippet = useSnippetStore(state => state.selectedSnippet)
	const removeSnippetName = useSnippetStore(state => state.removeSnippetName)

	const handleDelete = async(snippetName: string) => {
		const confirmed = await window.confirm("Are you sure you want to delete this snippet?")
		console.log(confirmed) 
		if (!confirmed) return

		const desktopPath = await desktopDir()
		const filePath = await join(desktopPath, 'taurifiles', `${snippetName}.md`)
		await remove(filePath)
		removeSnippetName(snippetName)
	}

	return (
		<div 
			// className="py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer"
			className={twMerge(
				"py-2 px-4 hover:bg-neutral-900 hover:cursor-pointer flex justify-between",
				selectedSnippet?.name === snippetName ? "bg-sky-500" : ""
			)}
			onClick={async() => {
				const desktopPath = await desktopDir()
				const filePath = await join(desktopPath, "taurifiles", `${snippetName}.md`)
				const snippetCode = await readTextFile(filePath)
				setSelectedSnippet({name: snippetName, code: snippetCode})
			}}
		>
			<h1>
				{snippetName}
			</h1>
			<div className="flex gap-2">
				<button
					onClick={(e) => {
						e.stopPropagation()
						handleDelete(snippetName)
					}}
				>
					Delete
				</button>
			</div>
		</div>
	)
}

export default SnippetItem;
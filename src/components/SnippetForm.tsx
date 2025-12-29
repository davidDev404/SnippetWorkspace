import { writeTextFile } from '@tauri-apps/plugin-fs'
import { desktopDir } from '@tauri-apps/api/path'
import { useState } from 'react'
import { useSnippetStore } from '../store/snippetsStore'
import toast from 'react-hot-toast'

function SnippetForm(){
	const [snippetName, setSnippetName] = useState('')
	const addSnippetName = useSnippetStore(state => state.addSnippetName)

	return (
		<form onSubmit={async (e) => {
			e.preventDefault()
			//alert("Form submitted!")
			const desktopPath = await desktopDir()
			//console.log(desktopPath)
			await writeTextFile(`${desktopPath}/taurifiles/${snippetName}.md`, "")
			setSnippetName('')
			addSnippetName(snippetName)

			toast.success('Snippet created!', {
				duration: 2000,
				position: 'bottom-right',
				style: {
					borderRadius: '10px',
					background: "#202020",
					color: "#fff"
				}
			})
		}}>
			<input type="text"
				placeholder="Write a snippet" 
				className="bg-zinc-900 w-full border-none outline-none p-4"
				onChange={(e) => setSnippetName(e.target.value)}
				value={snippetName}
			/>
			<button className="hidden">
				Save
			</button>
		</form>
	)
}

export default SnippetForm;
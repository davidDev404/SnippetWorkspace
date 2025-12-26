import { useSnippetStore } from "../store/snippetsStore";

function SnippetEditor(){
	const selectedSnippet = useSnippetStore(state => state.selectedSnippet)

	return (
		<>
			{
				selectedSnippet ? (
					<></>
				) : (
					<h1>No Snippet Selected</h1>
				)
			}
		</>
	)
}

export default SnippetEditor;
import Note from './src/components/Note'

const Note = ({note, toggleImportance}) => {
    const label = note.important
    ? 'Tornar não importante' : 'Tornar importante'
    return (
        <li>{note.content}
            <button onClick={toggleImportance}>{label} </button>
        </li>
    )
}

export default Note
export default function MockQuill(props) {
  return <textarea data-testid="mock-quill" value={props.value} onChange={(e) => props.onChange(e.target.value)} />;
}

interface FileListProps {
  files: File[];
}

const FileList = ({ files }: FileListProps) => {
  return (
    <ul>
      {files.map((f) => (
        <li key={f.name}>{f.name}</li>
      ))}
    </ul>
  );
};

export default FileList;

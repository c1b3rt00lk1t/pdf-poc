interface FileListProps {
  files: File[];
  orderFiles: number[];
}

const FileList = ({ files, orderFiles }: FileListProps) => {
  return (
    <ul>
      {orderFiles.length > 0
        ? files.map((_, idx, arr) => (
            <li key={idx}>{arr[orderFiles[idx]].name}</li>
          ))
        : files.length > 0 && <li>{files[0].name}</li>}
    </ul>
  );
};

export default FileList;

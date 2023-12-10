<p align="center">
<img src="https://github.com/c1b3rt00lk1t/pdf-poc/blob/background/images/pdfutils_icon.png?raw=true" width="20%" height="20%" >
</p>

# PDF Utils

### Basic description

PWA · TYPESCRIPT · VITE · REACT · CSS MODULES · CYPRESS  
Desktop and mobile PWA to enable useful manipulation of pdf files such as combine or split files and number or rotates pages.

### Available demo online

A working version of the mobile/desktop app can be found <a href='https://idyllic-capybara-5d7110.netlify.app'>here</a>.

### Basic usage

- To run the app in local: <code>$ npm run dev</code>
- To run the e2e test in local: <code>$ npm run cypress:open</code>

### Cloc stats

![cloc stats](https://github.com/c1b3rt00lk1t/pdf-poc/blob/background/images/cloc_stats.png?raw=true)

### Key technical features

The app leverages on the following technical pillars:

- The app is written in <code>Typescript</code> and <code>TSX</code> using the <code>React</code> library, initially bootstraped with <code>Vite</code>.
- The state is managed via conventional <code>useState</code> and <code>prop drilling</code>.
- The pdf manipulation is curated by the utils implemented in <code>pdf-utils.ts</code>, based on <code>pdf-lib</code> library.
- Custom hooks <code>useDeviceType</code> and <code>useMatchMedia</code> have been implemented to handle responsivity.
- CSS modules are used for styling with the corresponding <code>.module.css</code> files.
- Prop typing is done using <code>interface</code>.
- The files can be dragged and dropped using the <code>onDragStart</code>, <code>onDragOver</code>, <code>onDrop</code> and <code>onDragLeave</code>.
- Each <code>.tsx</code> file is coupled with a basic <codes>.test.tsx</code> file with <code>jest</code> and <code>testing library</code>.
- End-to-end testing is done with <code>cypress</code>.

### Functional description

In its current estate, the app allows to manipulate one or more pdfs in the following ways:

- Select one or may pdf files, with folder selection or with drag and drop.
- Sort the selected files in stright or reverse A-Z order or via drag and drop.
- Set a basename or the resulting file.
- Add page numbers to any pdf file, setting the font size, position, font type and starting number and page.
- Split any pdf file in a series of valid page ranges that can overlap and repeat obtaining as a result a series of files with an indication of page range.
- Rotate any pdf entirely or targeting specific pages.
- In any step, keep the output as next input or download it directly.

<br/><br/>
<br/><br/>

<p align="center">
<img src="https://github.com/c1b3rt00lk1t/pdf-poc/blob/background/images/pdfutils_flow.gif?raw=true" width="50%" >
</p>

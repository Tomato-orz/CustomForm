import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'

import { useEffect, useState } from 'react'

const Sfc = ({html,setHtml}) => {
  const [editor, setEditor] = useState(null)
  const toolbarConfig = {}
  // const [html, setHtml] = useState(str)
  const editorConfig = {                         // JS 语法
    placeholder: '请输入内容...',
    
  }
  useEffect(()=>{
    const str=html.replace(/>/g,'&gt').replace(/</g,'&lt')
    editor?.setHtml(str)

  },[html])

  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  return (
    <div id="editor">
      <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
        {/* <Toolbar
          editor={editor}
          defaultConfig={toolbarConfig}
          mode="default"
          style={{ borderBottom: '1px solid #ccc' }}
        /> */}
        <Editor
          defaultConfig={editorConfig}
          // value={html}
          onCreated={setEditor}
          // onChange={editor => setHtml(editor.getHtml())}
          mode="simple"
          style={{ height: '500px', overflowY: 'hidden' }}
        />
      </div>

    </div>
  )
}

export default Sfc
import *  as svg from '@/utils/svg.jsx'
import css from './index.module.less'
export const FormItem = (props) => {
  const { title, id, onDragStart, type } = props
  return (
    <div
      className={css.formitem}
      draggable="true"
      id={id}
      title={title}
      onDragStart={onDragStart}
      type={type}
      style={{
        height: 100,
        backgroundColor: '#fff',
        width: '33.3333%',
        textAlign: 'center',
        border: '1px solid #f0f0f0',
        cursor: 'grab',
      }}>
      <span style={{
        // width: 150, 
        height: 40,
        margin: '12px 0',
        display:'inline-block'
      }}>
        {svg[type]}
      </span>
      <span 
      style={{
        display:'block'
      }}
      >

      {title}
      </span>
    </div>
  )
}
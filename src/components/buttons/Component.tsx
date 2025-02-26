import { NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import React from 'react'

interface ComponentAttributes {
  title: string;
  link: string;
}

const Component: React.FC<NodeViewProps> = (props) => {
  const handleImpressionClick = () => {
    alert('Button clicked')
  }

  return (
    <NodeViewWrapper className="btn-component">

      <div className="content">
        <button onClick={handleImpressionClick}>
            {(props.node.attrs as ComponentAttributes).title}
        </button>
      </div>
    </NodeViewWrapper>
  )
}

export default Component
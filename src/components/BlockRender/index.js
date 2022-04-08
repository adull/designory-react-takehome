import Button from 'components/Button'

export default function BlockRender(props) {
  const block = props.block;
  
  let C = null;
  let obj = {};
  block.props.forEach((prop) => {
    obj[prop.key] = prop.value;
  });
  let propsObj = null

  switch(block.name) {
    case "Button":
      propsObj = {data: obj}
      C = Button

      return (
        <C {...propsObj} />
      )
    default:
      propsObj = {data: obj}
      C = Button

      return (
        <C {...propsObj} />
      )
  }
}
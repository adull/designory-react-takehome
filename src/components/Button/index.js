import * as buttonStyle from 'styles/components/Button.module.scss';

export default function Button(props) {
  const data = props.data
  return (
    <button className={buttonStyle.button}
            style={{ backgroundColor: data.bgColor,
                     color: data.color}}
    >
      {data.text}
    </button>
  );
}
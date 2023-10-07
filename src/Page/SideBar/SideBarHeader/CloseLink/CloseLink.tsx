

interface CloseLinkProps<T> {
  anchorElement: string,
  modifier: string,
  onClick?: (b: T) => void,
  clickValue?: T,
}

export function CloseLink<T>(props: CloseLinkProps<T>) {

  return (
    <a
      href={`#${props.anchorElement}`}
      data-modifier={props.modifier}
      onClick={() => {
        if (props.onClick != undefined && props.clickValue != undefined) {
          console.log(props.clickValue);
          props.onClick(props.clickValue);
        }
      }}
    >
      <img src="/images/collapse-icon-close.svg" />
    </a>
  )
}